BEGIN;

INSERT INTO "users" (id, email, password) VALUES
(1, 'admin', 'admin'),
(2, 'user', 'user');

INSERT INTO "product" (id, name, description, weight, price, image_url) VALUES
(1, 'Poivre noir', 'lorem ipsum liracs dpals sdqs', ARRAY[5, 10, 20], ARRAY[1.99, 3.50, 6.00], '/product/1.jpg'),
(2, 'Poivre blanc', 'lorem ipsum liracs dpals sdqs', ARRAY[5, 10, 20], ARRAY[2.99, 4.50, 7.00], '/product/2.jpg'),
(3, 'Poivre rouge', 'lorem ipsum liracs dpals sdqs', ARRAY[5, 10, 20], ARRAY[1.5, 2.99, 5.00 ], '/product/3.jpg'),
(4, 'Poivre rouge', 'lorem ipsum liracs dpals sdqs', ARRAY[5, 10, 20], ARRAY[1.99, 3.50, 6.00], '/product/4.jpg'),
(5, 'Poivre noir', 'lorem ipsum liracs dpals sdqs', ARRAY[5, 10, 20], ARRAY[1.99, 3.50, 6.00], '/product/5.jpg');

COMMIT;