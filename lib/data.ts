import { Product, Category } from '@/types/product';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Latest gadgets and electronic devices'
  },
  {
    id: '2',
    name: 'Fashion',
    slug: 'fashion',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Trendy clothing and accessories'
  },
  {
    id: '3',
    name: 'Home & Garden',
    slug: 'home-garden',
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Home decor and garden essentials'
  },
  {
    id: '4',
    name: 'Sports',
    slug: 'sports',
    image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Sports equipment and fitness gear'
  },
  {
    id: '5',
    name: 'Beauty & Health',
    slug: 'beauty-health',
    image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Beauty products and health supplements'
  },
  {
    id: '6',
    name: 'Books & Media',
    slug: 'books-media',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Books, movies, music and digital media'
  },
  {
    id: '7',
    name: 'Automotive',
    slug: 'automotive',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Car accessories and automotive parts'
  },
  {
    id: '8',
    name: 'Toys & Games',
    slug: 'toys-games',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Toys, games and entertainment for all ages'
  }
];

export const products: Product[] = [
  // Electronics
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals who demand the best audio experience.',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    stock: 50,
    featured: true,
    rating: 4.8,
    reviews: 324,
    tags: ['wireless', 'audio', 'premium', 'noise-cancelling'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Smart Watch Series X',
    description: 'Advanced smartwatch with fitness tracking, heart rate monitoring, GPS, and seamless smartphone integration. Features include sleep tracking, water resistance, and 7-day battery life.',
    price: 449.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    stock: 30,
    featured: true,
    rating: 4.6,
    reviews: 156,
    tags: ['smartwatch', 'fitness', 'tech', 'health'],
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16'
  },
  {
    id: '3',
    name: '4K Gaming Monitor',
    description: 'Ultra-wide 4K gaming monitor with 144Hz refresh rate, HDR support, and low input lag. Perfect for competitive gaming and professional work with stunning visual clarity.',
    price: 699.99,
    originalPrice: 899.99,
    image: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    stock: 15,
    featured: false,
    rating: 4.7,
    reviews: 89,
    tags: ['monitor', '4k', 'gaming', 'hdr'],
    createdAt: '2024-01-17',
    updatedAt: '2024-01-17'
  },
  {
    id: '4',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Features LED indicator, overcharge protection, and sleek minimalist design.',
    price: 39.99,
    originalPrice: 59.99,
    image: 'https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    stock: 100,
    featured: false,
    rating: 4.3,
    reviews: 245,
    tags: ['wireless', 'charging', 'qi', 'fast-charge'],
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18'
  },
  {
    id: '5',
    name: 'Bluetooth Speaker Pro',
    description: 'Portable Bluetooth speaker with 360-degree sound, waterproof design, and 20-hour battery life. Perfect for outdoor adventures and home entertainment.',
    price: 129.99,
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    stock: 75,
    featured: true,
    rating: 4.5,
    reviews: 178,
    tags: ['bluetooth', 'speaker', 'waterproof', 'portable'],
    createdAt: '2024-01-19',
    updatedAt: '2024-01-19'
  },

  // Fashion
  {
    id: '6',
    name: 'Designer Leather Jacket',
    description: 'Premium genuine leather jacket with modern design and classic styling. Crafted from high-quality materials with attention to detail. Perfect for casual and semi-formal occasions.',
    price: 199.99,
    originalPrice: 299.99,
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Fashion',
    stock: 25,
    featured: false,
    rating: 4.7,
    reviews: 89,
    tags: ['leather', 'designer', 'jacket', 'premium'],
    createdAt: '2024-01-17',
    updatedAt: '2024-01-17'
  },
  {
    id: '7',
    name: 'Luxury Silk Scarf',
    description: 'Elegant silk scarf with hand-printed patterns. Made from 100% pure silk with vibrant colors that won\'t fade. A perfect accessory for any outfit.',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Fashion',
    stock: 40,
    featured: true,
    rating: 4.6,
    reviews: 67,
    tags: ['silk', 'scarf', 'luxury', 'accessory'],
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  },
  {
    id: '8',
    name: 'Premium Denim Jeans',
    description: 'High-quality denim jeans with perfect fit and comfort. Made from sustainable cotton with modern cut and classic styling. Available in multiple sizes.',
    price: 79.99,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Fashion',
    stock: 60,
    featured: false,
    rating: 4.4,
    reviews: 134,
    tags: ['denim', 'jeans', 'sustainable', 'comfort'],
    createdAt: '2024-01-21',
    updatedAt: '2024-01-21'
  },
  {
    id: '9',
    name: 'Designer Handbag',
    description: 'Elegant designer handbag crafted from premium materials. Features multiple compartments, adjustable strap, and timeless design that complements any style.',
    price: 249.99,
    originalPrice: 349.99,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Fashion',
    stock: 20,
    featured: true,
    rating: 4.8,
    reviews: 92,
    tags: ['handbag', 'designer', 'luxury', 'premium'],
    createdAt: '2024-01-22',
    updatedAt: '2024-01-22'
  },

  // Home & Garden
  {
    id: '10',
    name: 'Modern Coffee Table',
    description: 'Sleek modern coffee table perfect for contemporary living rooms. Made from sustainable materials with clean lines and functional design. Easy to assemble.',
    price: 349.99,
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Home & Garden',
    stock: 15,
    featured: true,
    rating: 4.5,
    reviews: 67,
    tags: ['furniture', 'modern', 'table', 'sustainable'],
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18'
  },
  {
    id: '11',
    name: 'Ceramic Planter Set',
    description: 'Beautiful set of 3 ceramic planters in different sizes. Perfect for indoor plants with drainage holes and matching saucers. Modern minimalist design.',
    price: 59.99,
    originalPrice: 79.99,
    image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Home & Garden',
    stock: 45,
    featured: false,
    rating: 4.6,
    reviews: 123,
    tags: ['planter', 'ceramic', 'garden', 'indoor'],
    createdAt: '2024-01-23',
    updatedAt: '2024-01-23'
  },
  {
    id: '12',
    name: 'Smart LED Light Bulbs',
    description: 'WiFi-enabled smart LED bulbs with color changing capabilities. Control via smartphone app, voice commands, and set schedules. Energy efficient and long-lasting.',
    price: 24.99,
    originalPrice: 34.99,
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Home & Garden',
    stock: 200,
    featured: true,
    rating: 4.4,
    reviews: 289,
    tags: ['smart', 'led', 'wifi', 'energy-efficient'],
    createdAt: '2024-01-24',
    updatedAt: '2024-01-24'
  },

  // Sports
  {
    id: '13',
    name: 'Professional Running Shoes',
    description: 'High-performance running shoes with advanced cushioning and breathable design for serious athletes. Features responsive foam technology and durable construction.',
    price: 129.99,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Sports',
    stock: 40,
    featured: false,
    rating: 4.4,
    reviews: 142,
    tags: ['running', 'shoes', 'athletic', 'performance'],
    createdAt: '2024-01-19',
    updatedAt: '2024-01-19'
  },
  {
    id: '14',
    name: 'Yoga Mat Premium',
    description: 'Extra thick yoga mat with superior grip and cushioning. Made from eco-friendly materials, non-slip surface, and includes carrying strap.',
    price: 49.99,
    originalPrice: 69.99,
    image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Sports',
    stock: 80,
    featured: true,
    rating: 4.7,
    reviews: 198,
    tags: ['yoga', 'mat', 'eco-friendly', 'fitness'],
    createdAt: '2024-01-25',
    updatedAt: '2024-01-25'
  },
  {
    id: '15',
    name: 'Adjustable Dumbbells',
    description: 'Space-saving adjustable dumbbells with quick-change weight system. Range from 5-50 lbs per dumbbell. Perfect for home gym setups.',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Sports',
    stock: 25,
    featured: false,
    rating: 4.6,
    reviews: 87,
    tags: ['dumbbells', 'adjustable', 'home-gym', 'strength'],
    createdAt: '2024-01-26',
    updatedAt: '2024-01-26'
  },

  // Beauty & Health
  {
    id: '16',
    name: 'Organic Face Serum',
    description: 'Premium organic face serum with vitamin C and hyaluronic acid. Reduces fine lines, brightens skin, and provides deep hydration. Suitable for all skin types.',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Beauty & Health',
    stock: 60,
    featured: true,
    rating: 4.8,
    reviews: 234,
    tags: ['organic', 'serum', 'vitamin-c', 'skincare'],
    createdAt: '2024-01-27',
    updatedAt: '2024-01-27'
  },
  {
    id: '17',
    name: 'Essential Oil Diffuser',
    description: 'Ultrasonic essential oil diffuser with LED lights and timer settings. Creates a relaxing atmosphere while providing aromatherapy benefits.',
    price: 39.99,
    image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Beauty & Health',
    stock: 90,
    featured: false,
    rating: 4.5,
    reviews: 167,
    tags: ['diffuser', 'aromatherapy', 'essential-oils', 'wellness'],
    createdAt: '2024-01-28',
    updatedAt: '2024-01-28'
  },

  // Books & Media
  {
    id: '18',
    name: 'Bestselling Novel Collection',
    description: 'Collection of 5 bestselling novels from award-winning authors. Includes hardcover editions with beautiful dust jackets. Perfect for book lovers.',
    price: 89.99,
    originalPrice: 124.99,
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Books & Media',
    stock: 35,
    featured: true,
    rating: 4.9,
    reviews: 156,
    tags: ['books', 'novels', 'bestseller', 'hardcover'],
    createdAt: '2024-01-29',
    updatedAt: '2024-01-29'
  },
  {
    id: '19',
    name: 'Vintage Vinyl Records',
    description: 'Rare collection of vintage vinyl records from the 70s and 80s. Includes classic rock, jazz, and soul albums in excellent condition.',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Books & Media',
    stock: 12,
    featured: false,
    rating: 4.7,
    reviews: 43,
    tags: ['vinyl', 'records', 'vintage', 'music'],
    createdAt: '2024-01-30',
    updatedAt: '2024-01-30'
  },

  // Automotive
  {
    id: '20',
    name: 'Car Phone Mount',
    description: 'Universal car phone mount with 360-degree rotation and strong magnetic hold. Compatible with all smartphone sizes and easy one-hand operation.',
    price: 19.99,
    originalPrice: 29.99,
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Automotive',
    stock: 150,
    featured: false,
    rating: 4.3,
    reviews: 278,
    tags: ['car', 'phone-mount', 'magnetic', 'universal'],
    createdAt: '2024-01-31',
    updatedAt: '2024-01-31'
  },
  {
    id: '21',
    name: 'Premium Car Seat Covers',
    description: 'Luxury leather car seat covers with custom fit design. Protects original upholstery while adding comfort and style. Easy installation included.',
    price: 159.99,
    originalPrice: 219.99,
    image: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Automotive',
    stock: 30,
    featured: true,
    rating: 4.6,
    reviews: 89,
    tags: ['car', 'seat-covers', 'leather', 'premium'],
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01'
  },

  // Toys & Games
  {
    id: '22',
    name: 'Educational Building Blocks',
    description: 'STEM educational building blocks set with 500+ pieces. Encourages creativity, problem-solving, and engineering skills. Safe for children 6+ years.',
    price: 69.99,
    originalPrice: 89.99,
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Toys & Games',
    stock: 55,
    featured: true,
    rating: 4.8,
    reviews: 167,
    tags: ['educational', 'building-blocks', 'stem', 'kids'],
    createdAt: '2024-02-02',
    updatedAt: '2024-02-02'
  },
  {
    id: '23',
    name: 'Board Game Collection',
    description: 'Premium board game collection featuring 3 award-winning strategy games. Perfect for family game nights and social gatherings.',
    price: 99.99,
    originalPrice: 139.99,
    image: 'https://images.pexels.com/photos/776654/pexels-photo-776654.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/776654/pexels-photo-776654.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Toys & Games',
    stock: 25,
    featured: false,
    rating: 4.7,
    reviews: 94,
    tags: ['board-games', 'strategy', 'family', 'collection'],
    createdAt: '2024-02-03',
    updatedAt: '2024-02-03'
  },

  // Additional Electronics
  {
    id: '24',
    name: 'Vintage Camera',
    description: 'Classic vintage-style camera perfect for photography enthusiasts and collectors. Features manual controls and authentic film photography experience.',
    price: 599.99,
    image: 'https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    stock: 12,
    featured: true,
    rating: 4.9,
    reviews: 78,
    tags: ['camera', 'vintage', 'photography', 'film'],
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  },
  {
    id: '25',
    name: 'Gaming Mechanical Keyboard',
    description: 'Professional gaming mechanical keyboard with RGB backlighting, programmable keys, and tactile switches. Built for competitive gaming and productivity.',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    stock: 45,
    featured: false,
    rating: 4.6,
    reviews: 203,
    tags: ['gaming', 'keyboard', 'mechanical', 'rgb'],
    createdAt: '2024-02-04',
    updatedAt: '2024-02-04'
  },

  // More Fashion Items
  {
    id: '26',
    name: 'Luxury Watch',
    description: 'Swiss-made luxury watch with automatic movement, sapphire crystal, and water resistance. Timeless design with premium materials and craftsmanship.',
    price: 899.99,
    originalPrice: 1199.99,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Fashion',
    stock: 8,
    featured: true,
    rating: 4.9,
    reviews: 45,
    tags: ['watch', 'luxury', 'swiss', 'automatic'],
    createdAt: '2024-02-05',
    updatedAt: '2024-02-05'
  },
  {
    id: '27',
    name: 'Designer Sunglasses',
    description: 'Premium designer sunglasses with UV protection and polarized lenses. Stylish frame design with superior comfort and durability.',
    price: 179.99,
    originalPrice: 249.99,
    image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Fashion',
    stock: 35,
    featured: false,
    rating: 4.5,
    reviews: 128,
    tags: ['sunglasses', 'designer', 'uv-protection', 'polarized'],
    createdAt: '2024-02-06',
    updatedAt: '2024-02-06'
  },

  // More Home & Garden
  {
    id: '28',
    name: 'Smart Thermostat',
    description: 'WiFi-enabled smart thermostat with learning capabilities, energy saving features, and smartphone control. Reduces energy costs while maintaining comfort.',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.pexels.com/photos/8031926/pexels-photo-8031926.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/8031926/pexels-photo-8031926.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Home & Garden',
    stock: 40,
    featured: true,
    rating: 4.7,
    reviews: 156,
    tags: ['smart', 'thermostat', 'energy-saving', 'wifi'],
    createdAt: '2024-02-07',
    updatedAt: '2024-02-07'
  },
  {
    id: '29',
    name: 'Outdoor Garden Lights',
    description: 'Solar-powered LED garden lights with automatic on/off sensor. Weather-resistant design perfect for pathways, gardens, and outdoor spaces.',
    price: 49.99,
    originalPrice: 69.99,
    image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Home & Garden',
    stock: 70,
    featured: false,
    rating: 4.4,
    reviews: 189,
    tags: ['solar', 'garden-lights', 'outdoor', 'led'],
    createdAt: '2024-02-08',
    updatedAt: '2024-02-08'
  },

  // More Sports Items
  {
    id: '30',
    name: 'Professional Tennis Racket',
    description: 'High-performance tennis racket used by professionals. Lightweight carbon fiber construction with perfect balance for power and control.',
    price: 249.99,
    originalPrice: 329.99,
    image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Sports',
    stock: 20,
    featured: true,
    rating: 4.8,
    reviews: 67,
    tags: ['tennis', 'racket', 'professional', 'carbon-fiber'],
    createdAt: '2024-02-09',
    updatedAt: '2024-02-09'
  }
];