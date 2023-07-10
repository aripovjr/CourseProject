
ALTER TABLE users
ALTER COLUMN createdat SET DEFAULT current_timestamp;


INSERT INTO users (id, name, email, password, role, createdAt)
VALUES ('123e4567-e89b-12d3-a456-426655440000', 'Jasurbek Aripov', 'aripovjr@gmail.com', '121212', 'admin', NOW());

SELECT * FROM users;
