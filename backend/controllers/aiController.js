import { pool } from '../config/db.js';

export async function askAssistant(req, res, next) {
  try {
    const { prompt } = req.body;
    const inquiry = prompt?.toLowerCase() || '';
    const metrics = await buildMetrics();
    const response = generateAiResponse(inquiry, metrics);
    res.json({ prompt, response, metrics });
  } catch (error) {
    next(error);
  }
}

async function buildMetrics() {
  const revenueResult = await pool.query('SELECT SUM(total) AS total_revenue FROM sales');
  const salesResult = await pool.query('SELECT COUNT(*) AS total_sales FROM sales');
  const topProducts = await pool.query(
    `SELECT p.name, SUM(si.quantity) AS sold_quantity, SUM(si.total_price) AS revenue
     FROM sale_items si
     JOIN products p ON p.id = si.product_id
     GROUP BY p.name
     ORDER BY sold_quantity DESC LIMIT 5`
  );
  const lowStock = await pool.query('SELECT id, name, quantity, low_stock_threshold FROM products WHERE quantity <= low_stock_threshold ORDER BY quantity ASC LIMIT 5');

  return {
    totalRevenue: revenueResult.rows[0].total_revenue || 0,
    totalSales: parseInt(salesResult.rows[0].total_sales, 10) || 0,
    topProducts: topProducts.rows,
    lowStockProducts: lowStock.rows
  };
}

function generateAiResponse(inquiry, metrics) {
  if (inquiry.includes('sell today') || inquiry.includes('today\'s revenue')) {
    return `Current sales and revenue details are available. Total revenue: $${metrics.totalRevenue || '0.00'} and total sales: ${metrics.totalSales}.`;
  }
  if (inquiry.includes('low stock') || inquiry.includes('run out of stock')) {
    return `Low stock alert: ${metrics.lowStockProducts.length} products need attention. Top low stock items: ${metrics.lowStockProducts.map(item => item.name).join(', ')}.`;
  }
  if (inquiry.includes('top customer') || inquiry.includes('top selling')) {
    return `Top selling products: ${metrics.topProducts.map(product => `${product.name} (${product.sold_quantity})`).join(', ')}.`;
  }
  if (inquiry.includes('recommend') || inquiry.includes('profit')) {
    return 'Focus on high-margin products and review pricing. Add promotions on top sellers and replenish low stock items to increase profit.';
  }
  return 'Merchant OS can help with revenue, sales, inventory, and customer insights. Try asking "How much did we sell today?" or "Show low stock products."';
}
