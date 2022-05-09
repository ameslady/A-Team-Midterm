-- Active Orders Query
SELECT orders.id, customers.name as customer, orders.created_at as time_of_order, orders.active as status, sum(batteries.cost * battery_orders.quantity) as total
FROM orders
JOIN customers ON customers.id = customer_id
JOIN battery_orders ON orders.id = order_id
JOIN batteries ON batteries.id = battery_id
GROUP BY orders.id, customers.name, orders.created_at, orders.active
ORDER BY orders.id;
