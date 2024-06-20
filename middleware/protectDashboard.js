const jwt = require('jsonwebtoken');
const pool = require('../config/connection');
const { updateRefreshToken } = require('../model/userModel');

const protectDashboard = async (req, res, next) => {
  // Mendapatkan token akses dari cookie
  const accessToken = req.cookies['accessToken'];

  // Memeriksa apakah token ada
  if (!accessToken) {
    // Alihkan pengguna ke halaman lockscreen jika token tidak ditemukan
    return res.render('users/lockscreen', {
      layout : 'layouts/lockscreen',
      title  : 'Lockscreen'
    })
    // res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  try {
    // Verifikasi token akses menggunakan secret key yang sama seperti yang digunakan untuk menghasilkan token
    const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    // Mengekstrak username dari decodedAccessToken
    const username = decodedAccessToken.name;

    // Menyimpan username di req.userName untuk digunakan di controller dashboard
    req.userName = username;

    // Menyimpan peran pengguna dalam objek req untuk digunakan di handler selanjutnya
    req.userRole = decodedAccessToken.role;

    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      // Jika tidak ada refresh token, alihkan ke halaman login
      return res.status(401).json({ message: 'Refresh token tidak ditemukan' });
    }

    // Verifikasi token refresh
    const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Memeriksa apakah token refresh masih berlaku
    if (decodedRefreshToken.exp < Date.now() / 1000) {
      return res.status(401).json({ message: 'Token refresh sudah kadaluwarsa. Silakan masuk kembali.' });
    }

    // Menjalankan refresh token
    const { userId, name, email, role } = decodedRefreshToken;
    const newAccessToken = jwt.sign({ userId, name, email, role }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '3600s' // Atur waktu kedaluwarsa baru untuk access token
    });

    // Perbarui cookie access token
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true, // Gunakan http only agar tidak bisa diubah melalui javascript
      maxAge: 24 * 60 * 60 * 1000 // Atur maxAge untuk access token
    });

    // Simpan kembali refresh token ke database
    await pool.query(updateRefreshToken, [refreshToken, userId]);


    // Lanjutkan ke middleware selanjutnya dengan access token yang diperbarui
    req.accessToken = newAccessToken;
    next();
  } catch (error) {
    // Menangani kesalahan refresh token atau verifikasi token akses
    console.error('Terjadi kesalahan:', error);
    res.status(500).render('error/500',{
      layout : 'layouts/error-layout',
      title  : 'Internal Server Error'
    })
  //   json({ message: 'Terjadi kesalahan dalam verifikasi token' });
  // }
};
}
module.exports = protectDashboard;






// const jwt = require('jsonwebtoken');
// const User = require('../model/userModel'); // Ganti dengan nama model user Anda
// const refreshController = require('../controller/refreshToken'); // Ganti dengan nama controller refresh token Anda

// const protectDashboard = async (req, res, next) => {
//   // Mendapatkan token akses dari cookie
//   const accessToken = req.cookies.accessToken;

//   // Memeriksa apakah token ada
//   if (!accessToken) {
//     // Alihkan pengguna ke halaman login jika token tidak ditemukan
//     return res.json({ message: 'Token akses tidak ditemukan' });
//   }

//   try {
//     // Verifikasi token akses menggunakan secret key yang sama seperti yang digunakan untuk menghasilkan token
//     const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

//     // Mengekstrak username dari decodedAccessToken
//     const username = decodedAccessToken.name;

//     // Menyimpan username di req.userName untuk digunakan di controller dashboard
//     req.userName = username;

//     // Menyimpan peran pengguna dalam objek req untuk digunakan di handler selanjutnya
//     req.userRole = decodedAccessToken.role;

//     // Memeriksa apakah token akses sudah kedaluwarsa
//     const now = Math.floor(Date.now() / 1000);
//     if (decodedAccessToken.exp < now) {
//       // Coba refresh token jika token akses sudah kedaluwarsa
//       try {
//         // Dapatkan refresh token dari localStorage
//       const refreshToken = localStorage.getItem('refreshToken');
//       if (!refreshToken) {
//         // Jika tidak ada refresh token, alihkan ke halaman login
//         return res.redirect('/auth').json({ message: 'Token akses dan refresh tidak valid' });
//       }
        
//       } catch (error) {
//         // Menangani kesalahan refresh token
//         console.error('Kesalahan refresh token:', error);
//         res.status(500).json({ message: 'Terjadi kesalahan saat refresh token' });
//       }
//     } else {
//       // Jika token akses masih berlaku, lanjutkan ke middleware selanjutnya
//       req.accessToken = accessToken;
//       next();
//     }
//   } catch (err) {
//     // Menangani kesalahan verifikasi token akses
//     console.error('Kesalahan middleware protectDashboard:', err);
//     res.status(500).json({ message: 'Kesalahan dalam verifikasi token' });
//   }
// };

// module.exports = protectDashboard;




// const jwt = require('jsonwebtoken');
// const User = require('../model/userModel')
// const refresh = require('../controller/refreshToken');

// const protectDashboard = async (req, res, next) => {
//   // Mendapatkan token akses dari cookie
//   const accessToken = req.cookies.accessToken;

//   // Memeriksa apakah token ada
//   if (!accessToken) {
//     // Alihkan pengguna ke halaman login jika token tidak ditemukan
//     return res.json({ message: 'token tidak ditemukannnnnn bossss'});
//   }

//   try {
//     // Verifikasi token akses menggunakan secret key yang sama seperti yang digunakan untuk menghasilkan token
//     const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

//     // Mengekstrak username dari decodedAccessToken
//     const username = decodedAccessToken.name;

//     // Menyimpan username di req.userName untuk digunakan di controller dashboard
//     req.userName = username;

//     // Menyimpan peran pengguna dalam objek req untuk digunakan di handler selanjutnya
//     req.userRole = decodedAccessToken.role;

//     // Memeriksa apakah token akses sudah kedaluwarsa
//     const now = Math.floor(Date.now() / 1000);
//     if (decodedAccessToken.exp < now) {
//       // Coba refresh token jika token akses sudah kedaluwarsa
//       try {
//         // Mendapatkan refresh token dari local storage
//         const refreshToken = localStorage.getItem('refreshToken');
//         if (!refreshToken) {
//           // Jika tidak ada refresh token, alihkan ke halaman login
//           return res.redirect('/auth').json({message: 'token tidak ditemukan'});
//         }

//         // Verifikasi token refresh
//         const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

//         // Memeriksa apakah token refresh masih berlaku
//         if (decodedRefreshToken.exp < now) {
//             res.status(400).json({ message: 'Token refresh sudah kadaluwarsa. Silakan masuk kembali.' });
//             return; // Hentikan proses middleware
//           }
          

//         // Menjalankan refresh token
//         const { userId, name, email, role } = decodedRefreshToken;
//         const newAccessToken = jwt.sign({ userId, name, email, role }, process.env.ACCESS_TOKEN_SECRET, {
//           expiresIn: '3600s' // Atur waktu kedaluwarsa baru untuk access token
//         });

//         // Perbarui cookie access token
//         res.cookie('accessToken', newAccessToken, {
//           httpOnly: true, // Gunakan http only agar tidak bisa diubah melalui java script
//           maxAge: 24 * 60 * 60 * 1000 // Atur maxAge untuk access token
//         });
//         // Kirim token akses baru ke klien sebagai respons JSON
//         res.status(200).json({ accessToken: newAccessToken });

//         // Simpan kembali refresh token ke database
//         await Users.update({ refresh_token: refreshToken }, {
//           where: { id: userId }
//         });

//         // Lanjutkan ke middleware selanjutnya dengan access token yang diperbarui
//         req.accessToken = newAccessToken;
//         next();
//       } catch (error) {
//         // Menangani kesalahan refresh token
//         console.error('Kesalahan refresh token:', error);
//         res.status(500).json({ message: 'Terjadi kesalahan saat refresh token' });
//       }
//     } else {
//       // Jika token akses masih berlaku, lanjutkan ke middleware selanjutnya
//       req.accessToken = accessToken;
//       next();
//     }
//   } catch (err) {
//     // Menangani kesalahan verifikasi token akses
//     console.error('Kesalahan middleware protectDashboard:', err);
//     res.status(500).json({ message: 'Kesalahan dalam verifikasi token' });
//   }
// };

// module.exports = protectDashboard;



// const jwt = require('jsonwebtoken');

// const protectDashboard = async (req, res, next) => {
//   // Mendapatkan token akses dari cookie
//   const accessToken = req.cookies['accessToken'];

//   // Memeriksa apakah token ada
//   if (!accessToken) {
//     // Alihkan pengguna ke halaman login jika token tidak ditemukan
//     return res.json({ message: 'token tidak ditemukannnnnn bossss'});
//   }

//   try {
//     // Verifikasi token akses menggunakan secret key yang sama seperti yang digunakan untuk menghasilkan token
//     const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

//     // Mengekstrak username dari decodedAccessToken
//     const username = decodedAccessToken.name;

//     // Menyimpan username di req.userName untuk digunakan di controller dashboard
//     req.userName = username;

//     // Menyimpan peran pengguna dalam objek req untuk digunakan di handler selanjutnya
//     req.userRole = decodedAccessToken.role;

//         const refreshToken = req.cookies[refreshToken];
//         if (!refreshToken) {
//           // Jika tidak ada refresh token, alihkan ke halaman login
//           return res.redirect('/auth').json({message: 'token tidak ditemukan'});
//         }

//         // Verifikasi token refresh
//         const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

//         // Memeriksa apakah token refresh masih berlaku
//         if (decodedRefreshToken.exp < now) {
//             res.status(400).json({ message: 'Token refresh sudah kadaluwarsa. Silakan masuk kembali.' });
//             return; // Hentikan proses middleware
//           }
          

//         // Menjalankan refresh token
//         const { userId, name, email, role } = decodedRefreshToken;
//         const newAccessToken = jwt.sign({ userId, name, email, role }, process.env.ACCESS_TOKEN_SECRET, {
//           expiresIn: '3600s' // Atur waktu kedaluwarsa baru untuk access token
//         });

//         // Perbarui cookie access token
//         res.cookie('accessToken', newAccessToken, {
//           httpOnly: true, // Gunakan http only agar tidak bisa diubah melalui java script
//           maxAge: 24 * 60 * 60 * 1000 // Atur maxAge untuk access token
//         });
//         // Kirim token akses baru ke klien sebagai respons JSON
//         res.status(200).json({ accessToken: newAccessToken });

//         // Simpan kembali refresh token ke database
//         await Users.update({ refresh_token: refreshToken }, {
//           where: { id: userId }
//         });

//         // Lanjutkan ke middleware selanjutnya dengan access token yang diperbarui
//         req.accessToken = newAccessToken;
//         next();
//       } catch (error) {
//         // Menangani kesalahan refresh token
//         console.error('Kesalahan refresh token:', error);
//         res.status(500).json({ message: 'Terjadi kesalahan saat refresh token' });
//       }
//     } else {
//       // Jika token akses masih berlaku, lanjutkan ke middleware selanjutnya
//       req.accessToken = accessToken;
//       next();
//     }
//   } catch (err) {
//     // Menangani kesalahan verifikasi token akses
//     console.error('Kesalahan middleware protectDashboard:', err);
//     res.status(500).json({ message: 'Kesalahan dalam verifikasi token' });
//   }
// };

// module.exports = protectDashboard;
