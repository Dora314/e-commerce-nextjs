-- Update existing products with inventory management fields
UPDATE "Product" SET 
    "sku" = 'SKU-' || UPPER(SUBSTRING("id", 1, 8)),
    "minStock" = FLOOR(random() * 10) + 5,
    "maxStock" = FLOOR(random() * 50) + 50,
    "reorderPoint" = FLOOR(random() * 15) + 10,
    "unitCost" = "price" * (0.6 + random() * 0.2), -- Unit cost is 60-80% of selling price
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
