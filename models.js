// ============================================================
//  SUJATA DINING — models/MenuItem.js
// ============================================================

const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type:     String,
    required: [true, 'Item name is required'],
    trim:     true
  },
  description: {
    type:    String,
    trim:    true,
    default: ''
  },
  price: {
    type:     Number,
    required: [true, 'Price is required'],
    min:      [0, 'Price cannot be negative']
  },
  category: {
    type:     String,
    required: true,
    enum:     ['starters', 'soups', 'maincourse', 'breads', 'rice', 'desserts', 'drinks', 'thali']
  },
  cuisine: {
    type:    String,
    enum:    ['maharashtrian', 'gujarati', 'punjabi', 'all'],
    default: 'all'
  },
  imageUrl: {
    type:    String,
    default: ''
  },
  isVeg: {
    type:    Boolean,
    default: true
  },
  isSpicy: {
    type:    Boolean,
    default: false
  },
  isAvailable: {
    type:    Boolean,
    default: true
  },
  ratings: {
    average: { type: Number, default: 0 },
    count:   { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);


// ============================================================
//  models/Reservation.js
// ============================================================

const reservationSchema = new mongoose.Schema({
  name: {
    type:     String,
    required: [true, 'Name is required'],
    trim:     true
  },
  phone: {
    type:     String,
    required: [true, 'Phone number is required'],
    match:    [/^[6-9]\d{9}$/, 'Please enter a valid Indian mobile number']
  },
  email: {
    type:  String,
    trim:  true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email address']
  },
  date: {
    type:     Date,
    required: [true, 'Reservation date is required']
  },
  time: {
    type:    String,
    default: '12:00 PM'
  },
  guests: {
    type:    Number,
    min:     1,
    max:     20,
    default: 2
  },
  specialRequests: {
    type:    String,
    trim:    true,
    default: ''
  },
  status: {
    type:    String,
    enum:    ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);


// ============================================================
//  models/Order.js
// ============================================================

const orderItemSchema = new mongoose.Schema({
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
  name:     { type: String, required: true },
  price:    { type: Number, required: true },
  quantity: { type: Number, default: 1 }
});

const orderSchema = new mongoose.Schema({
  customerName:  { type: String, required: true, trim: true },
  phone:         { type: String, required: true },
  tableNumber:   { type: Number, default: null },
  orderType:     { type: String, enum: ['dine-in', 'takeaway'], default: 'dine-in' },
  items:         [orderItemSchema],
  totalAmount:   { type: Number, required: true },
  status: {
    type:    String,
    enum:    ['received', 'preparing', 'ready', 'served', 'cancelled'],
    default: 'received'
  },
  paymentStatus: {
    type:    String,
    enum:    ['pending', 'paid'],
    default: 'pending'
  },
  notes: { type: String, trim: true, default: '' }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = { MenuItem: menuItemSchema, Reservation, Order };
