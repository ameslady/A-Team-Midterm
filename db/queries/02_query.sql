-- Individual Order Queries
SELECT orders.id, orders.created_at, sum(batteries.prep_time) as total_prep, sum(batteries.cost * battery_orders.quantity) as total, orders.active
FROM orders
JOIN battery_orders ON orders.id = order_id
JOIN batteries ON batteries.id = battery_id
GROUP BY orders.id, orders.created_at, orders.active
ORDER BY orders.id;

SELECT batteries.id, batteries.name, battery_orders.quantity, batteries.cost as price
FROM batteries
JOIN battery_orders ON batteries.id = battery_id
WHERE battery_orders.order_id = 1;
