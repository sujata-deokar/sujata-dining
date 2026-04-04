// ============================================================
//  SUJATA DINING — seed.js
//  Seed script: populates MongoDB with all menu items
//  Run: node seed.js
// ============================================================

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sujata_dining';

const menuItemSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String },
  price:       { type: Number, required: true },
  category:    { type: String, required: true },
  cuisine:     { type: String, default: 'all' },
  imageUrl:    { type: String },
  isVeg:       { type: Boolean, default: true },
  isSpicy:     { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

const seedData = [
  // ---- THALIS ----
  { name: 'Maharashtrian Thali', description: 'Puran Poli, Amti Dal, Bhakri, Zunka, Koshimbir, Solkadhi, Kheer', price: 249, category: 'thali', cuisine: 'maharashtrian', isVeg: true },
  { name: 'Gujarati Thali',      description: 'Dal Dhokli, Kadhi, Rotla, Undhiyo, Kachumber, Shrikhand, Basundi', price: 269, category: 'thali', cuisine: 'gujarati',     isVeg: true },
  { name: 'Punjabi Thali',       description: 'Dal Makhani, Paneer Butter Masala, Naan, Lassi, Raita, Gulab Jamun', price: 289, category: 'thali', cuisine: 'punjabi',      isVeg: true },

  // ---- STARTERS ----
  { name: 'Samosa (2 pcs)',   description: 'Crispy pastry with spiced potato & peas', price: 60,  category: 'starters', isVeg: true,  isSpicy: false },
  { name: 'Onion Bhajiya',    description: 'Golden fried onion fritters',             price: 80,  category: 'starters', isVeg: true,  isSpicy: false },
  { name: 'Paneer Tikka',     description: 'Tandoor-grilled marinated paneer cubes',  price: 180, category: 'starters', isVeg: true,  isSpicy: true  },
  { name: 'Dahi Puri',        description: 'Crispy puris with curd and chutneys',     price: 90,  category: 'starters', isVeg: true,  isSpicy: false },
  { name: 'Kothimbir Vadi',   description: 'Coriander & besan cake, pan-fried',       price: 100, category: 'starters', isVeg: true,  isSpicy: false },
  { name: 'Dhokla',           description: 'Steamed chickpea cake with tempering',    price: 95,  category: 'starters', isVeg: true,  isSpicy: false },
  { name: 'Aloo Tikki',       description: 'Spiced potato patties with chutneys',     price: 110, category: 'starters', isVeg: true,  isSpicy: true  },
  { name: 'Veg Spring Roll',  description: 'Crispy rolls with seasoned vegetables',   price: 130, category: 'starters', isVeg: true,  isSpicy: false },

  // ---- SOUPS ----
  { name: 'Tomato Shorba',         description: 'Spiced Indian tomato broth with cream',       price: 110, category: 'soups', isVeg: true, isSpicy: false },
  { name: 'Sweet Corn Soup',       description: 'Velvety corn soup with vegetables',            price: 120, category: 'soups', isVeg: true, isSpicy: false },
  { name: 'Manchow Soup',          description: 'Indo-Chinese spiced broth with fried noodles', price: 130, category: 'soups', isVeg: true, isSpicy: true  },
  { name: 'Lemon Coriander Soup',  description: 'Tangy light soup with ginger',                 price: 115, category: 'soups', isVeg: true, isSpicy: false },
  { name: 'Dal Shorba',            description: 'Silky lentil soup with cumin tempering',       price: 100, category: 'soups', isVeg: true, isSpicy: false },
  { name: 'Cream of Mushroom',     description: 'Creamy mushroom soup with herbs',              price: 145, category: 'soups', isVeg: true, isSpicy: false },

  // ---- MAIN COURSE ----
  { name: 'Paneer Butter Masala', description: 'Cottage cheese in tomato-cream gravy',       price: 220, category: 'maincourse', cuisine: 'punjabi',      isVeg: true, isSpicy: false },
  { name: 'Dal Makhani',          description: 'Slow-cooked black lentils in butter & cream', price: 200, category: 'maincourse', cuisine: 'punjabi',      isVeg: true, isSpicy: false },
  { name: 'Amti Dal',             description: 'Maharashtrian sweet-sour toor dal',           price: 160, category: 'maincourse', cuisine: 'maharashtrian', isVeg: true, isSpicy: true  },
  { name: 'Shahi Paneer',         description: 'Royal Mughlai-style cashew & saffron curry',  price: 240, category: 'maincourse', isVeg: true, isSpicy: false },
  { name: 'Kadhi Pakoda',         description: 'Yogurt curry with besan fritters',            price: 170, category: 'maincourse', isVeg: true, isSpicy: true  },
  { name: 'Undhiyo',              description: 'Gujarati mixed vegetable upside-down curry',   price: 210, category: 'maincourse', cuisine: 'gujarati',     isVeg: true, isSpicy: false },
  { name: 'Palak Paneer',         description: 'Spinach purée with paneer cubes',             price: 210, category: 'maincourse', isVeg: true, isSpicy: false },
  { name: 'Zunka',                description: 'Dry besan dish with garlic, Maharashtrian',   price: 140, category: 'maincourse', cuisine: 'maharashtrian', isVeg: true, isSpicy: true  },

  // ---- BREADS ----
  { name: 'Butter Naan',    description: 'Fluffy tandoor naan brushed with butter',   price: 50, category: 'breads', cuisine: 'punjabi', isVeg: true },
  { name: 'Garlic Naan',    description: 'Naan with garlic, coriander and butter',    price: 65, category: 'breads', isVeg: true },
  { name: 'Tandoori Roti',  description: 'Whole-wheat bread baked in clay tandoor',   price: 40, category: 'breads', isVeg: true },
  { name: 'Lachha Paratha', description: 'Multi-layered flaky whole-wheat paratha',   price: 70, category: 'breads', cuisine: 'punjabi', isVeg: true },
  { name: 'Bhakri',         description: 'Rustic jowar flatbread from Maharashtra',   price: 35, category: 'breads', cuisine: 'maharashtrian', isVeg: true },
  { name: 'Puran Poli',     description: 'Sweet flatbread with jaggery & chana dal',  price: 90, category: 'breads', cuisine: 'maharashtrian', isVeg: true },
  { name: 'Aloo Paratha',   description: 'Stuffed potato flatbread with spices',      price: 90, category: 'breads', isVeg: true, isSpicy: true },
  { name: 'Rotla (Bajra)',  description: 'Pearl-millet flatbread from Gujarat',        price: 30, category: 'breads', cuisine: 'gujarati', isVeg: true },

  // ---- RICE ----
  { name: 'Jeera Rice',   description: 'Basmati rice with cumin and ghee',           price: 120, category: 'rice', isVeg: true },
  { name: 'Veg Biryani',  description: 'Aromatic basmati with spiced vegetables',    price: 220, category: 'rice', isVeg: true, isSpicy: true  },
  { name: 'Dal Khichdi',  description: 'Rice-lentil porridge with ghee',             price: 150, category: 'rice', isVeg: true },
  { name: 'Masale Bhat',  description: 'Festive Maharashtrian spiced rice',          price: 170, category: 'rice', cuisine: 'maharashtrian', isVeg: true, isSpicy: true },
  { name: 'Curd Rice',    description: 'Cooked rice with fresh curd and tempering',  price: 110, category: 'rice', isVeg: true },

  // ---- DESSERTS ----
  { name: 'Gulab Jamun',    description: 'Khoya dumplings in rose-cardamom syrup', price: 80,  category: 'desserts', isVeg: true },
  { name: 'Shrikhand',      description: 'Strained yogurt with saffron & cardamom', price: 100, category: 'desserts', cuisine: 'gujarati', isVeg: true },
  { name: 'Basundi',        description: 'Thickened sweetened milk with dry fruits', price: 110, category: 'desserts', isVeg: true },
  { name: 'Kheer',          description: 'Creamy rice pudding with pistachios',      price: 90,  category: 'desserts', isVeg: true },
  { name: 'Gajar Halwa',    description: 'Slow-cooked carrot halwa with nuts',       price: 120, category: 'desserts', isVeg: true },
  { name: 'Motichoor Ladoo', description: 'Besan boondi balls with saffron',         price: 70,  category: 'desserts', isVeg: true },

  // ---- DRINKS ----
  { name: 'Masala Chaas',   description: 'Spiced buttermilk with cumin & ginger',   price: 60,  category: 'drinks', isVeg: true },
  { name: 'Sweet Lassi',    description: 'Thick yogurt with sugar & cardamom',      price: 80,  category: 'drinks', isVeg: true },
  { name: 'Mango Lassi',    description: 'Alphonso mango with thick curd',           price: 110, category: 'drinks', isVeg: true },
  { name: 'Solkadhi',       description: 'Kokum & coconut milk Konkan drink',        price: 70,  category: 'drinks', cuisine: 'maharashtrian', isVeg: true },
  { name: 'Fresh Lime Soda', description: 'Squeezed lemon with chilled soda',        price: 60,  category: 'drinks', isVeg: true },
  { name: 'Thandai',        description: 'Festive chilled milk with nuts & saffron', price: 130, category: 'drinks', isVeg: true }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ Connected to MongoDB');

    await MenuItem.deleteMany({});
    console.log('🗑️  Cleared existing menu items');

    const inserted = await MenuItem.insertMany(seedData);
    console.log(`🌱 Seeded ${inserted.length} menu items successfully`);

    mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
