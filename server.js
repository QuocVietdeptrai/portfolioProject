require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const homeRoutes = require('./routes/homeRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const port = process.env.PORT;

// Kết nối MongoDB
mongoose.connect(process.env.DATABASE)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// View Engine
app.set('view engine', 'pug');
app.set('views', './views');

// Routes
app.use('/', homeRoutes);
app.use('/about', aboutRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/contact', contactRoutes);

// Start Server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
