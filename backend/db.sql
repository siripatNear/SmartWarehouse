CREATE DATABASE smartwarehouse;

CREATE TABLE user(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(255),

);
