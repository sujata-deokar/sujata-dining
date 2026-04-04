// ============================================================
//  SUJATA DINING — routes/orderRoutes.js
// ============================================================

const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  price:    { type: Number, required: true },
  quantity: { type: Number, default: 1 }
});

const orderSchema = new mongoose.Schema({
  customerName:  { type: String, required: true, trim: true },
  phone:         { type: String, required: true },
  tableNumber:   { type: Number, default: null },
  orderType:     { type: String, enum: ['dine-in','takeaway'], default: 'dine-in' },
  items:         [orderItemSchema],
  totalAmount:   { type: Number, required: true },
  status:        { type: String, enum: ['received','preparing','ready','served','cancelled'], default: 'received' },
  paymentStatus: { type: String, enum: ['pending','paid'], default: 'pending' },
  notes:         { type: String, trim: true, default: '' }
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

// POST new order
router.post('/', async (req, res) => {
  try {
    // Calculate total server-side for verification
    const total = req.body.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const order = await Order.create({ ...req.body, totalAmount: total });
    res.status(201).json({
      success: true,
      message: `Order #${order._id.toString().slice(-6).toUpperCase()} received! Estimated time: 25–35 min.`,
      data:    order
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET all orders (admin)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
