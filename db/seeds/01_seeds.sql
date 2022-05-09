INSERT INTO customers (name, phone_number)
VALUES ('Johnny Blaze', '250-896-1953'),
('George Taylor', '250-896-1953'),
('Bonnie Jackson', '250-896-1953');

INSERT INTO batteries (name, description, image, cost, prep_time)
VALUES ('Small Battery', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','images/small_battery.png', 599, 15),
('Medium Battery', 'Elit pellentesque habitant morbi tristique senectus et netus et malesuada.Proin sagittis nisl rhoncus mattis rhoncus urna.', 'images/medium_batteries.png', 1799, 30),
('Large Battery', 'Eros donec ac odio tempor. Ipsum suspendisse ultrices gravida dictum. Et leo duis ut diam quam nulla porttitor massa.', 'images/lrg_battery.png', 3099,  45);

INSERT INTO orders (customer_id, active)
VALUES (1, true),
(2, true),
(3, true);

INSERT INTO battery_orders (battery_id, order_id, quantity)
VALUES (1, 1, 3),
(2, 1, 5),
(3, 2, 10),
(1, 3, 1);
