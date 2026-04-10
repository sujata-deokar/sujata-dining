const express  = require('express');
const mongoose = require('mongoose');

const router = express.Router();

/* ============================================================
   MENU ROUTES
   ============================================================ */
const menuItemSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: '' },
  price:       { type: Number, required: true, min: 0 },
  category:    { type: String, required: true, enum: ['starters','soups','maincourse','breads','rice','desserts','drinks','thali'] },
  cuisine:     { type: String, enum: ['maharashtrian','gujarati','punjabi','all'], default: 'all' },
  imageUrl:    { type: String, default: '' },
  isVeg:       { type: Boolean, default: true },
  isSpicy:     { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);

// GET menu
router.get('/menu', async (req, res) => {
  try {
    const filter = { isAvailable: true };
    if (req.query.category) filter.category = req.query.category;
    if (req.query.cuisine)  filter.cuisine  = req.query.cuisine;

    const items = await MenuItem.find(filter);
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ============================================================
   RESERVATION ROUTES
   ============================================================ */
const reservationSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  phone: { type: String, required: true },
  date:  { type: Date,   required: true }
}, { timestamps: true });

const Reservation = mongoose.models.Reservation || mongoose.model('Reservation', reservationSchema);

// POST reservation
router.post('/reservations', async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.json({ success: true, data: reservation });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

/* ============================================================
   EXPORT
   ============================================================ */
module.exports = router;
