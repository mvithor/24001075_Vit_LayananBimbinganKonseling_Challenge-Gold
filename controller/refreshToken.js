const jwt = require('jsonwebtoken');
const Users = require('../model/userModel'); 

const refresh = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;

    // Verifikasi refresh token
    const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Periksa apakah refresh token masih valid
    const now = Math.floor(Date.now() / 1000);
    if (decodedRefreshToken.exp < now) {
      return res.status(400).json({ msg: "Refresh token sudah kadaluwarsa. Silakan masuk kembali." });
    }

    // Ekstrak informasi pengguna dari refresh token
    const userId = decodedRefreshToken.userId;
    const name = decodedRefreshToken.name;
    const email = decodedRefreshToken.email;
    const role = decodedRefreshToken.role;

    // Generate access token baru
    const accessToken = jwt.sign({ userId, name, email, role }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30m' 
    });

    // Generate refresh token baru
    const newRefreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '7d' // 
    });

    // Perbarui refresh token di database
    await Users.update({ refresh_token: newRefreshToken }, {
      where: { id: userId }
    });

    // Set cookie access token dan refresh token
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000 
    });
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    // Kirim access token yang baru
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: "Token tidak valid" });
    } else {
      return res.status(500).json({ msg: "Kesalahan Internal Server" });
    }
  }
};

module.exports = refresh;
