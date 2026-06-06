-- Initial Merchant OS seed data

INSERT INTO roles (name, description) VALUES
('Super Admin', 'Full system access'),
('Admin', 'Administrative management'),
('Manager', 'Store management and reporting'),
('Cashier', 'Point-of-sale operations');

INSERT INTO categories (name, description) VALUES
('Electronics', 'Computers, accessories, and devices'),
('Pharmacy', 'Health and wellness products'),
('Groceries', 'Food and household goods'),
('Stationery', 'Office supplies and paper goods');
