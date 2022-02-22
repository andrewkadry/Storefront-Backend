CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    statusOfOrder VARCHAR(50),
    user_id INTEGER NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    
);