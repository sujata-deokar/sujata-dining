// ============================================================
//  SUJATA DINING — server.js
// ============================================================

const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const bodyParser = require('body-parser');
const path       = require('path');

const app  = express();
const PORT = process.env.PORT || 5000;

/* ============================================================
   MIDDLEWARE
   ============================================================ */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Serve static frontend from root folder (since no public folder)
app.use(express.static(__dirname));

/* ============================================================
   MONGODB CONNECTION
   ============================================================ */
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sujata_dining';

mongoose.connect(MONGO_URI, {
  useNewUrlParser:    true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

/* ============================================================
   ROUTES (FIXED)
   ============================================================ */
const routes      = require('./routes');
const orderRoutes = require('./orderRoutes');

app.use('/api', routes);
app.use('/api/orders', orderRoutes);

/* ============================================================
   ROOT ROUTE
   ============================================================ */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

/* ============================================================
   HEALTH CHECK
   ============================================================ */
app.get('/api/health', (req, res) => {
  res.json({
    status:    'OK',
    message:   '🍽️ Sujata Dining API is running',
    timestamp: new Date().toISOString()
  });
});

/* ============================================================
   ERROR HANDLER
   ============================================================ */
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

/* ============================================================
   START SERVER
   ============================================================ */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
