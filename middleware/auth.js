const validator = require('validator');
const Users = require('../model/userModel');

const checkEmailTerdaftar = async (req, res, next) => {
  const { email } = req.body;

  // Periksa apakah email memiliki format yang valid
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Format email tidak valid' });
  }

  try {
    const user = await Users.findOne({
      where: {
        email: email
      }
    });

    if (user) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    next(); 
  } catch (error) {
    console.error('Terjadi kesalahan saat mengecek email terdaftar', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengecek email terdaftar' });
  }
};

module.exports = { 
    checkEmailTerdaftar 
};
