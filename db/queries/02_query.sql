-- Individual Order Queries
SELECT orders.id, orders.created_at, sum(batteries.prep_time) as total_prep, orders.active
FROM orders
JOIN battery_orders ON orders.id = order_id
JOIN batteries ON batteries.id = battery_id
GROUP BY orders.id, orders.created_at, orders.active
ORDER BY orders.id;

SELECT batteries.name, battery_orders.quantity, batteries.cost as price, sum(batteries.cost * battery_orders.quantity) as total
FROM batteries
JOIN battery_orders ON batteries.id = battery_id
WHERE battery_orders.order_id = 1
GROUP BY batteries.name, battery_orders.quantity, batteries.cost;

-- combined but may not work for the sums and grouping we need above ^
SELECT orders.id,
       batteries.name,
       battery_orders.quantity,
       batteries.cost as price,
       orders.created_at,
       orders.active,
       sum(batteries.cost * battery_orders.quantity) as total,
       sum(batteries.prep_time) as total_prep
FROM orders
JOIN battery_orders ON orders.id = order_id
JOIN batteries ON batteries.id = battery_id
WHERE battery_orders.order_id = 1
GROUP BY orders.id, batteries.name, battery_orders.quantity, batteries.cost, orders.created_at, orders.active
ORDER BY orders.id;
