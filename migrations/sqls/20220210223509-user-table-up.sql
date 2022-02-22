CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    firstName VARCHAR,
    lastName VARCHAR,
    password VARCHAR
);