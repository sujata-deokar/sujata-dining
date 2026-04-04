<<<<<<< HEAD
# 🍽️ Sujata Dining — Restaurant Website

**Pure Vegetarian · Maharashtrian · Gujarati · Punjabi Cuisine**

---

## 📁 Project File Structure

```
sujata-dining/
│
├── 📄 index.html          ← Main frontend HTML (structure & layout)
├── 🎨 style.css           ← All CSS styles (pink & cream theme, animations)
├── ⚙️  menuData.js         ← Menu data (all dishes, used by app.js)
├── 🖥️  app.js              ← Frontend JavaScript (interactions, animations)
│
├── 🚀 server.js           ← Node.js + Express backend server
├── 📦 package.json        ← Node dependencies
├── 🌱 seed.js             ← MongoDB seed script
│
├── models/
│   └── models.js          ← MongoDB Mongoose schemas (MenuItem, Reservation, Order)
│
└── routes/
    ├── routes.js          ← Menu & Reservation API routes
    └── orderRoutes.js     ← Order management API routes
```

---

## 🛠️ Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Frontend   | HTML5, CSS3, JavaScript |
| UI Library | React (React CDN / CRA) |
| Backend    | Node.js, Express.js     |
| Database   | MongoDB (Mongoose ODM)  |
| Fonts      | Google Fonts            |
| Images     | Unsplash CDN (HD)       |

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js v18+
- MongoDB running locally or a MongoDB Atlas URI

### 2. Install Dependencies
```bash
cd sujata-dining
npm install
```

### 3. Start MongoDB (local)
```bash
mongod
```

### 4. Seed the Database
```bash
node seed.js
```

### 5. Start the Server
```bash
# Production
npm start

# Development (auto-reload)
npm run dev
```

### 6. Open in Browser
```
http://localhost:5000
```

---

## 🌐 API Endpoints

### Menu
| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| GET    | /api/menu           | Get all menu items       |
| GET    | /api/menu?category= | Filter by category       |
| GET    | /api/menu/:id       | Get single item          |
| POST   | /api/menu           | Add new item (admin)     |
| PUT    | /api/menu/:id       | Update item (admin)      |
| DELETE | /api/menu/:id       | Delete item (admin)      |

### Reservations
| Method | Endpoint                      | Description           |
|--------|-------------------------------|-----------------------|
| POST   | /api/reservations             | Create reservation    |
| GET    | /api/reservations             | Get all reservations  |
| PATCH  | /api/reservations/:id/status  | Update status         |

### Orders
| Method | Endpoint               | Description        |
|--------|------------------------|--------------------|
| POST   | /api/orders            | Place new order    |
| GET    | /api/orders            | Get all orders     |
| GET    | /api/orders/:id        | Get single order   |
| PATCH  | /api/orders/:id/status | Update order status|

---

## 🎨 Color Theme

| Variable       | Value     | Usage              |
|----------------|-----------|--------------------|
| --pink         | #E91E8C   | Primary accent     |
| --pink-deep    | #C2185B   | Hover/CTA states   |
| --cream        | #FFF8F2   | Page background    |
| --cream-dark   | #F5E6D8   | Section background |
| --gold         | #D4A843   | Decorative accents |

---

## 🍛 Menu Categories

- **Starters** — Samosa, Bhajiya, Paneer Tikka, Dhokla, etc.
- **Soups** — Tomato Shorba, Manchow, Dal Shorba, etc.
- **Main Course** — Paneer Butter Masala, Dal Makhani, Amti, Undhiyo, etc.
- **Breads** — Naan, Bhakri, Puran Poli, Lachha Paratha, etc.
- **Rice & Biryani** — Veg Biryani, Masale Bhat, Jeera Rice, etc.
- **Desserts** — Gulab Jamun, Shrikhand, Basundi, Kheer, etc.
- **Drinks** — Lassi, Solkadhi, Masala Chaas, Thandai, etc.

---

© 2025 Sujata Dining, Nagpur. All Rights Reserved.
=======
# sujata-dining
>>>>>>> a87810fd15f5bdc36634091874e0f56d05ecde66
