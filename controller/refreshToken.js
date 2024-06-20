const pool = require('../config/connection');
const jwt = require('jsonwebtoken');
const { getUserByRefreshToken, updateRefreshToken } = require('../model/userModel'); 

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const userResult = await pool.query(getUserByRefreshToken, [refreshToken]);

    if (userResult.rows.length === 0) return res.sendStatus(403);

    const user = userResult.rows[0];

    // Verifikasi refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);

      const userId = decoded.userId;
      const name = decoded.name;
      const email = decoded.email;
      const role = decoded.role;

      // Generate access token baru
      const accessToken = jwt.sign({ userId, name, email, role }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30m'
      });

      // // Generate refresh token baru
      // const newRefreshToken = jwt.sign({ userId, name, email, role }, process.env.REFRESH_TOKEN_SECRET, {
      //   expiresIn: '7d'
      // });

      // // Perbarui refresh token di database
      // pool.query(updateRefreshToken, [newRefreshToken, userId]);

      // // Set cookie access token dan refresh token
      // res.cookie('accessToken', accessToken, {
      //   httpOnly: true,
      //   maxAge: 30 * 60 * 1000
      // });
      // res.cookie('refreshToken', newRefreshToken, {
      //   httpOnly: true,
      //   maxAge: 7 * 24 * 60 * 60 * 1000
      // });

      // Kirim access token yang baru
      res.status(200).json({ accessToken });
    });
  } catch (error) {
    console.error(error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: "Token tidak valid" });
    } else {
      return res.status(500).json({ msg: "Kesalahan Internal Server" });
    }
  }
};

module.exports = refreshToken;






// const pool = require('../config/connection')
// const jwt = require('jsonwebtoken');
// const { getUser } = require('../model/userModel'); 

// const refreshToken = async (req, res) => {
//   try {
//     const refreshToken = req.cookies.refreshToken;
//     if(!refreshToken) return res.sendStatus(401);
//     const user = await pool.query(getUser, [refresh_token : refreshToken])

//     if(!user) return res.sendStatus(403);
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err))

//     // Verifikasi refresh token
//     const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded));

//     // Periksa apakah refresh token masih valid
//     const now = Math.floor(Date.now() / 1000);
//     if (decodedRefreshToken.exp < now) {
//       return res.status(400).json({ msg: "Refresh token sudah kadaluwarsa. Silakan masuk kembali." });
//     }

//     // Ekstrak informasi pengguna dari refresh token
//     const userId = decodedRefreshToken.userId;
//     const name = decodedRefreshToken.name;
//     const email = decodedRefreshToken.email;
//     const role = decodedRefreshToken.role;

//     // Generate access token baru
//     const accessToken = jwt.sign({ userId, name, email, role }, process.env.ACCESS_TOKEN_SECRET, {
//       expiresIn: '30m' 
//     });

//     // Generate refresh token baru
//     const newRefreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
//       expiresIn: '7d' // 
//     });

//     // Perbarui refresh token di database
//     await Users.update({ refresh_token: newRefreshToken }, {
//       where: { id: userId }
//     });

//     // Set cookie access token dan refresh token
//     res.cookie('accessToken', accessToken, {
//       httpOnly: true,
//       maxAge: 30 * 60 * 1000 
//     });
//     res.cookie('refreshToken', newRefreshToken, {
//       httpOnly: true,
//       maxAge: 7 * 24 * 60 * 60 * 1000 
//     });

//     // Kirim access token yang baru
//     res.status(200).json({ accessToken });
//   } catch (error) {
//     console.error(error);
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ msg: "Token tidak valid" });
//     } else {
//       return res.status(500).json({ msg: "Kesalahan Internal Server" });
//     }
//   }
// };

// module.exports = refreshToken;
