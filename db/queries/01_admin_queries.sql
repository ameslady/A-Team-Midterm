-- active orders query
SELECT orders.id, customers.name, orders.created_at, orders.active, sum(batteries.cost * battery_orders.quantity) as total
FROM orders
JOIN customers ON customers.id = customer_id
JOIN battery_orders ON orders.id = order_id
JOIN batteries ON batteries.id = battery_id
WHERE active = true
GROUP BY orders.id, customers.name, orders.created_at, orders.active
ORDER BY orders.id;

-- completed orders query
SELECT orders.id, customers.name, orders.created_at, orders.active, sum(batteries.cost * battery_orders.quantity) as total
FROM orders
JOIN customers ON customers.id = customer_id
JOIN battery_orders ON orders.id = order_id
JOIN batteries ON batteries.id = battery_id
WHERE active = false
GROUP BY orders.id, customers.name, orders.created_at, orders.active
ORDER BY orders.id;

-- sets an order to complete query
UPDATE orders SET active = false WHERE id = $1 RETURNING *;
