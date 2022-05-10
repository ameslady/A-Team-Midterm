-- retrieves all details associated w/ an order
SELECT orders.id, orders.created_at, sum(batteries.prep_time) as total_prep, sum(batteries.cost * battery_orders.quantity) as total, orders.active
FROM orders
JOIN battery_orders ON orders.id = order_id
JOIN batteries ON batteries.id = battery_id
WHERE orders.id = ${req.params.id}
GROUP BY orders.id, orders.created_at, orders.active
ORDER BY orders.id;

-- retrieves all items associated w/ an order
SELECT batteries.id, batteries.name, battery_orders.quantity, batteries.cost as price
FROM batteries
JOIN battery_orders ON batteries.id = battery_id
WHERE battery_orders.order_id = ${req.params.id};

-- Adds a new customer and their own to DB
INSERT INTO customers (name, phone_number) VALUES ($1, $2) RETURNING *;
INSERT INTO orders (customer_id) VALUES ($1) RETURNING *;
INSERT INTO battery_orders (battery_id, order_id, quantity) VALUES ($1, $2, $3) RETURNING *;
