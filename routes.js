// ============================================================
//  SUJATA DINING — routes/menuRoutes.js
// ============================================================

const express    = require('express');
const router     = express.Router();
const mongoose   = require('mongoose');

// Inline model (or import from models/models.js)
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

// GET all menu items (optional ?category=starters&cuisine=punjabi)
router.get('/', async (req, res) => {
  try {
    const filter = { isAvailable: true };
    if (req.query.category) filter.category = req.query.category;
    if (req.query.cuisine)  filter.cuisine  = req.query.cuisine;

    const items = await MenuItem.find(filter).sort({ category: 1, price: 1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Item not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create new menu item (admin)
router.post('/', async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PUT update menu item
router.put('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, error: 'Item not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// DELETE menu item
router.delete('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Item not found' });
    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;


// ============================================================
//  routes/reservationRoutes.js  (appended below)
// ============================================================

const reservationSchema = new mongoose.Schema({
  name:            { type: String, required: true, trim: true },
  phone:           { type: String, required: true },
  email:           { type: String, trim: true },
  date:            { type: Date,   required: true },
  time:            { type: String, default: '12:00 PM' },
  guests:          { type: Number, min: 1, max: 20, default: 2 },
  specialRequests: { type: String, trim: true, default: '' },
  status:          { type: String, enum: ['pending','confirmed','cancelled'], default: 'pending' }
}, { timestamps: true });

// Only define if not already compiled
const Reservation = mongoose.models.Reservation || mongoose.model('Reservation', reservationSchema);

const reservationRouter = express.Router();

// POST new reservation
reservationRouter.post('/', async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Reservation confirmed! We look forward to seeing you.',
      data:    reservation
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET all reservations (admin)
reservationRouter.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ date: 1 });
    res.json({ success: true, count: reservations.length, data: reservations });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH update reservation status
reservationRouter.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!reservation) return res.status(404).json({ success: false, error: 'Reservation not found' });
    res.json({ success: true, data: reservation });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = { menuRouter: router, reservationRouter };
