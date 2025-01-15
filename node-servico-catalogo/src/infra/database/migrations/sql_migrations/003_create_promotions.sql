CREATE TABLE IF NOT EXISTS promotions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  discount_percent NUMERIC(5,2) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL
);