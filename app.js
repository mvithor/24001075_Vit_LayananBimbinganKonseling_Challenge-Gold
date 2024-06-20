const express = require('express');
const app = express();

const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');

// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT || 4000;

// Inisialisasi postgresql
const pool = require('./config/connection');

// Import Routing
const studentRoutes = require('./routes/siswaRoutes');
const profileRoutes = require('./routes/profileRoutes');
const homeRoutes = require('./routes/homeRoutes');
const loginRoutes = require('./routes/login');
const konselorRoutes = require('./routes/konselorRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const pelanggaranRoutes = require('./routes/pelanggaranRoutes');
const konselingRoutes = require('./routes/konselingRoutes');
const usersRoutes = require('./routes/usersRoutes');

// Inisialisasi EJS dan Ejs Layout
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(expressLayouts);

// Inisialisasi cors 
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Inisialisasi Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routing untuk file statis
app.get('/public/css/style.css', (req, res) => {
  res.set('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, 'public', 'css', 'style.css'));
});
app.get('/public/plugins', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'public', 'plugins'));
});
app.get('/public/script.js', (req, res) => {
  res.set('Content-Type', 'text/javascript');
  res.sendFile(path.join(__dirname, 'public', 'script.js'));
});

// Routing
app.use('/', homeRoutes);
app.use('/profile', profileRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/students', studentRoutes);
app.use('/konselor', konselorRoutes);
app.use('/pelanggaran', pelanggaranRoutes);
app.use('/konseling', konselingRoutes);
app.use('/auth', loginRoutes);
app.use('/users', usersRoutes);

// Run Servers
app.listen(PORT, () => {
  console.log(`Server berjalan di localhost: ${PORT}`);
});

// Run Database
async function connect() {
  try {
    const client = await pool.connect();
    console.log('connected...');
  } catch (err) {
    console.log(err.message);
  }
}
connect();
