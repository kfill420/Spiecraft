BEGIN;

INSERT INTO "user" (id, email, password) VALUES
(1, 'admin', 'admin'),
(2, 'user', 'user');

INSERT INTO "product" (id, name, description, price, image_url) VALUES
(1, 'Poivre noir', 'lorem ipsum liracs dpals sdqs', ARRAY[5, 10, 20], ARRAY[1.99, 3.50, 6.00],);

COMMIT;