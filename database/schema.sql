-- Merchant OS PostgreSQL schema

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  role_id INTEGER REFERENCES roles(id) ON DELETE SET NULL,
  refresh_token TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  sku VARCHAR(120) NOT NULL UNIQUE,
  barcode VARCHAR(120),
  cost_price NUMERIC(12,2) NOT NULL DEFAULT 0,
  selling_price NUMERIC(12,2) NOT NULL DEFAULT 0,
  quantity INTEGER NOT NULL DEFAULT 0,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  description TEXT,
  image_url TEXT,
  low_stock_threshold INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(50),
  address TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  invoice_number VARCHAR(80) NOT NULL UNIQUE,
  customer_id INTEGER REFERENCES customers(id) ON DELETE SET NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  payment_method VARCHAR(50) NOT NULL,
  subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
  tax NUMERIC(12,2) NOT NULL DEFAULT 0,
  discount NUMERIC(12,2) NOT NULL DEFAULT 0,
  total NUMERIC(12,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sale_items (
  id SERIAL PRIMARY KEY,
  sale_id INTEGER REFERENCES sales(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC(12,2) NOT NULL,
  total_price NUMERIC(12,2) NOT NULL
);

CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  type VARCHAR(80) NOT NULL,
  generated_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  payload JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(120) NOT NULL,
  resource VARCHAR(120),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_low_stock ON products(quantity, low_stock_threshold);
CREATE INDEX idx_sales_created_at ON sales(created_at);
CREATE INDEX idx_sale_items_sale_id ON sale_items(sale_id);
CREATE INDEX idx_customers_email ON customers(email);
