INSERT INTO customers (name, phone_number)
VALUES ('Johnny Blaze', '250-896-1953'),
('George Taylor', '250-896-1953'),
('Bonnie Jackson', '250-896-1953');

INSERT INTO batteries (name, description, image, cost, prep_time)
VALUES ('Tiny Battery','Mattis nunc sed blandit libero volutpat sed cras ornare. Adipiscing vitae proin sagittis nisl. Pellentesque.','images/xsmall_batteries.png', 299, 5),
('XS Battery', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','images/small_battery.png', 599, 5),
('Small Battery', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','images/small_battery2.png', 799, 10),
('Medium Battery', 'Elit pellentesque habitant morbi tristique senectus et netus et malesuada.Proin sagittis nisl rhoncus mattis rhoncus urna.', 'images/medium_battery.png', 1099, 10),
('Large Battery', 'Eros donec ac odio tempor. Ipsum suspendisse ultrices gravida dictum. Et leo duis ut diam quam nulla porttitor massa.', 'images/lrg_battery.png', 1599,  20),
('XL Battery', 'Eros donec ac odio tempor. Ipsum suspendisse ultrices gravida dictum. Et leo duis ut diam quam nulla porttitor massa.', 'images/xl_battery.png', 2099,  20);


INSERT INTO orders (customer_id, active)
VALUES (1, true),
(2, true),
(3, false);

INSERT INTO battery_orders (battery_id, order_id, quantity)
VALUES (1, 1, 3),
(2, 1, 5),
(3, 2, 10),
(4, 2, 2),
(5, 3, 1),
(6, 3, 1);
