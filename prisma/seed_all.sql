-- SEED ALL DATA FOR E-COMMERCE DEMO
-- 1. Xoá dữ liệu theo thứ tự khoá ngoại
DELETE FROM "OrderItem";
DELETE FROM "CartItem";
DELETE FROM "WishlistItem";
DELETE FROM "Order";
DELETE FROM "Cart";
DELETE FROM "Wishlist";
DELETE FROM "Product";
-- DELETE FROM "User"; -- Nếu muốn reset user, bỏ comment dòng này

-- 2. Insert User mẫu
INSERT INTO "User" (id, name, email, password, role, "createdAt", "updatedAt") VALUES
('clxrz2p5j000008l5g1j2a3k4', 'John Doe', 'john@example.com', 'password123', 'CUSTOMER', NOW(), NOW()),
('clxrz2p5k000108l5h2k3b4l5', 'Jane Smith', 'jane@example.com', 'password123', 'CUSTOMER', NOW(), NOW()),
('clxrz2p5l000208l5i3l4c5m6', 'Bob Johnson', 'bob@example.com', 'password123', 'CUSTOMER', NOW(), NOW()),
('clxrz2p5m000308l5j4m5d6n7', 'Alice Brown', 'alice@example.com', 'password123', 'CUSTOMER', NOW(), NOW()),
('clxrz2p5n000408l5k6n6e7o8', 'Charlie Wilson', 'charlie@example.com', 'password123', 'CUSTOMER', NOW(), NOW()),
('clxrz2p5o000508l5l7o7f8p9', 'Diana Martinez', 'diana@example.com', 'password123', 'CUSTOMER', NOW(), NOW()),
('clxrz2p5p000608l5m8p8g9q0', 'Edward Taylor', 'edward@example.com', 'password123', 'CUSTOMER', NOW(), NOW()),
('clxrz2p5q000708l5n9q9h0r1', 'Fiona Davis', 'fiona@example.com', 'password123', 'CUSTOMER', NOW(), NOW()),
('clxrz2p5r000808l5o0r0i1s2', 'George Anderson', 'george@example.com', 'password123', 'CUSTOMER', NOW(), NOW()),
('clxrz2p5s000908l5p1s1j2t3', 'Helen Garcia', 'helen@example.com', 'password123', 'CUSTOMER', NOW(), NOW());

-- 3. Insert Product mẫu (chỉ lấy các trường chung, có thể bổ sung trường inventory sau)
INSERT INTO "Product" (id, name, description, price, stock, image, images, category, "createdAt", "updatedAt") VALUES
('1', 'Premium Wireless Headphones', 'Experience immersive sound with these premium wireless headphones.', 299.99, 50, 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800'], 'Electronics', NOW(), NOW()),
('2', 'Smart Watch Series X', 'Stay connected and track your fitness with the Smart Watch Series X.', 449.99, 30, 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800'], 'Electronics', NOW(), NOW()),
('3', '4K Gaming Monitor', 'Ultra-sharp 4K resolution for an unparalleled gaming experience.', 699.99, 15, 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=800'], 'Electronics', NOW(), NOW()),
('4', 'Wireless Charging Pad', 'Charge your devices conveniently with this sleek wireless charging pad.', 39.99, 100, 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=800'], 'Electronics', NOW(), NOW()),
('5', 'Bluetooth Speaker Pro', 'Portable and powerful Bluetooth speaker for music on the go.', 129.99, 75, 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800'], 'Electronics', NOW(), NOW()),
('6', 'Designer Leather Jacket', 'A stylish and high-quality leather jacket for a modern look.', 199.99, 25, 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800'], 'Fashion', NOW(), NOW()),
('7', 'Luxury Silk Scarf', 'Elegant silk scarf to complement any outfit.', 89.99, 40, 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800'], 'Fashion', NOW(), NOW()),
('8', 'Premium Denim Jeans', 'Comfortable and durable denim jeans for everyday wear.', 79.99, 60, 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800'], 'Fashion', NOW(), NOW()),
('9', 'Designer Handbag', 'A chic and spacious handbag for all your essentials.', 249.99, 20, 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800'], 'Fashion', NOW(), NOW()),
('10', 'Modern Coffee Table', 'A minimalist coffee table to enhance your living room.', 349.99, 15, 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800'], 'Home & Garden', NOW(), NOW()),
('24', 'Vintage Camera', 'Capture timeless moments with this classic vintage camera.', 599.99, 12, 'https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=800'], 'Electronics', NOW(), NOW()),
('25', 'Gaming Mechanical Keyboard', 'RGB mechanical keyboard for the ultimate gaming setup.', 149.99, 45, 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=800'], 'Electronics', NOW(), NOW()),
('26', 'Luxury Watch', 'An exquisite timepiece that combines style and precision.', 899.99, 8, 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800'], 'Fashion', NOW(), NOW());

-- 4. Insert Order mẫu
INSERT INTO "Order" (id, "userId", total, status, "shippingAddressJson", "paymentMethod", "createdAt", "updatedAt") VALUES
('order1', 'clxrz2p5j000008l5g1j2a3k4', 299.99, 'DELIVERED', '{"street": "123 Main St", "city": "New York", "state": "NY", "zip": "10001"}', 'Credit Card', NOW(), NOW()),
('order2', 'clxrz2p5k000108l5h2k3b4l5', 149.99, 'SHIPPED', '{"street": "456 Oak Ave", "city": "Los Angeles", "state": "CA", "zip": "90210"}', 'PayPal', NOW(), NOW()),
('order3', 'clxrz2p5l000208l5i3l4c5m6', 599.99, 'PROCESSING', '{"street": "789 Pine St", "city": "Chicago", "state": "IL", "zip": "60601"}', 'Credit Card', NOW(), NOW()),
('order4', 'clxrz2p5m000308l5j4m5d6n7', 89.99, 'PENDING', '{"street": "321 Elm St", "city": "Miami", "state": "FL", "zip": "33101"}', 'Apple Pay', NOW(), NOW()),
('order5', 'clxrz2p5n000408l5k6n6e7o8', 199.99, 'CANCELLED', '{"street": "654 Maple Ave", "city": "Seattle", "state": "WA", "zip": "98101"}', 'Credit Card', NOW(), NOW()),
('order6', 'clxrz2p5o000508l5l7o7f8p9', 449.99, 'DELIVERED', '{"street": "987 Cedar Rd", "city": "Austin", "state": "TX", "zip": "73301"}', 'Credit Card', NOW(), NOW()),
('order7', 'clxrz2p5p000608l5m8p8g9q0', 129.99, 'SHIPPED', '{"street": "147 Birch Lane", "city": "Denver", "state": "CO", "zip": "80201"}', 'PayPal', NOW(), NOW()),
('order8', 'clxrz2p5q000708l5n9q9h0r1', 899.99, 'PROCESSING', '{"street": "258 Spruce St", "city": "Portland", "state": "OR", "zip": "97201"}', 'Credit Card', NOW(), NOW()),
('order9', 'clxrz2p5r000808l5o0r0i1s2', 349.99, 'DELIVERED', '{"street": "369 Willow Dr", "city": "Boston", "state": "MA", "zip": "02101"}', 'Credit Card', NOW(), NOW()),
('order10', 'clxrz2p5s000908l5p1s1j2t3', 249.99, 'PENDING', '{"street": "741 Poplar Ave", "city": "Phoenix", "state": "AZ", "zip": "85001"}', 'Apple Pay', NOW(), NOW());

-- 5. Insert OrderItem mẫu
INSERT INTO "OrderItem" (id, "orderId", "productId", quantity, price)
SELECT gen_random_uuid(), o.id, '1', 1, 299.99 FROM "Order" o WHERE o."userId" = 'clxrz2p5j000008l5g1j2a3k4';
INSERT INTO "OrderItem" (id, "orderId", "productId", quantity, price)
SELECT gen_random_uuid(), o.id, '25', 1, 149.99 FROM "Order" o WHERE o."userId" = 'clxrz2p5k000108l5h2k3b4l5';
INSERT INTO "OrderItem" (id, "orderId", "productId", quantity, price)
SELECT gen_random_uuid(), o.id, '24', 1, 599.99 FROM "Order" o WHERE o."userId" = 'clxrz2p5l000208l5i3l4c5m6';
INSERT INTO "OrderItem" (id, "orderId", "productId", quantity, price)
SELECT gen_random_uuid(), o.id, '7', 1, 89.99 FROM "Order" o WHERE o."userId" = 'clxrz2p5m000308l5j4m5d6n7';
INSERT INTO "OrderItem" (id, "orderId", "productId", quantity, price)
SELECT gen_random_uuid(), o.id, '6', 1, 199.99 FROM "Order" o WHERE o."userId" = 'clxrz2p5n000408l5k6n6e7o8';
INSERT INTO "OrderItem" (id, "orderId", "productId", quantity, price)
SELECT gen_random_uuid(), o.id, '2', 1, 449.99 FROM "Order" o WHERE o."userId" = 'clxrz2p5o000508l5l7o7f8p9';
INSERT INTO "OrderItem" (id, "orderId", "productId", quantity, price)
SELECT gen_random_uuid(), o.id, '5', 1, 129.99 FROM "Order" o WHERE o."userId" = 'clxrz2p5p000608l5m8p8g9q0';
INSERT INTO "OrderItem" (id, "orderId", "productId", quantity, price)
SELECT gen_random_uuid(), o.id, '26', 1, 899.99 FROM "Order" o WHERE o."userId" = 'clxrz2p5q000708l5n9q9h0r1';
INSERT INTO "OrderItem" (id, "orderId", "productId", quantity, price)
SELECT gen_random_uuid(), o.id, '10', 1, 349.99 FROM "Order" o WHERE o."userId" = 'clxrz2p5r000808l5o0r0i1s2';
INSERT INTO "OrderItem" (id, "orderId", "productId", quantity, price)
SELECT gen_random_uuid(), o.id, '9', 1, 249.99 FROM "Order" o WHERE o."userId" = 'clxrz2p5s000908l5p1s1j2t3';

-- 6. Update inventory fields cho Product
UPDATE "Product" SET 
    "sku" = 'SKU-' || UPPER(SUBSTRING("id", 1, 8)),
    "minStock" = FLOOR(random() * 10) + 5,
    "maxStock" = FLOOR(random() * 50) + 50,
    "reorderPoint" = FLOOR(random() * 15) + 10,
    "unitCost" = "price" * (0.6 + random() * 0.2),
    "supplier" = CASE 
        WHEN "category" = 'Electronics' THEN 'TechSupply Inc'
        WHEN "category" = 'Fashion' THEN 'Fashion Forward'
        WHEN "category" = 'Home & Garden' THEN 'Home Essentials'
        WHEN "category" = 'Sports' THEN 'Athletic Gear Pro'
        WHEN "category" = 'Beauty & Health' THEN 'Beauty Supply Co'
        WHEN "category" = 'Books & Media' THEN 'Media Distributors'
        WHEN "category" = 'Automotive' THEN 'Auto Parts Plus'
        WHEN "category" = 'Toys & Games' THEN 'Toy Warehouse'
        ELSE 'General Supplier'
    END
WHERE "sku" IS NULL OR "minStock" IS NULL;

-- 7. (Tuỳ chọn) Insert Cart mẫu cho mỗi user
INSERT INTO "Cart" (id, "userId", "createdAt", "updatedAt") VALUES
('cart1', 'clxrz2p5j000008l5g1j2a3k4', NOW(), NOW()),
('cart2', 'clxrz2p5k000108l5h2k3b4l5', NOW(), NOW()),
('cart3', 'clxrz2p5l000208l5i3l4c5m6', NOW(), NOW()),
('cart4', 'clxrz2p5m000308l5j4m5d6n7', NOW(), NOW()),
('cart5', 'clxrz2p5n000408l5k6n6e7o8', NOW(), NOW()),
('cart6', 'clxrz2p5o000508l5l7o7f8p9', NOW(), NOW()),
('cart7', 'clxrz2p5p000608l5m8p8g9q0', NOW(), NOW()),
('cart8', 'clxrz2p5q000708l5n9q9h0r1', NOW(), NOW()),
('cart9', 'clxrz2p5r000808l5o0r0i1s2', NOW(), NOW()),
('cart10', 'clxrz2p5s000908l5p1s1j2t3', NOW(), NOW());

-- Bạn có thể bổ sung CartItem, Wishlist, WishlistItem tương tự nếu muốn.

-- Prisma không cho phép chạy nhiều câu lệnh trong 1 lần $executeRawUnsafe
-- => Cần sửa seed.ts để chạy từng câu lệnh một
