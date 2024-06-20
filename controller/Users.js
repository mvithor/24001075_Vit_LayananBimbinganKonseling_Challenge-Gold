const pool = require('../config/connection');
const queriesUser = require('../model/userModel');
const { getUserByEmail,
        getUserByRefreshToken,
        updateRefreshToken,
        deleteRefreshToken,
      } = require('../model/userModel')
const queriesSiswa = require('../model/siswaModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Function ambil data user
const getUsers = async (req, res) => {
  try {
    
    const result = await pool.query(queriesUser.getUserLogin);
    const user = result.rows;
    res.json(user)
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil data user', error);
    res.status(500).send('Internal Server Error');
  }
}

// Function ambil data usersById
const getUsersById = async (req, res) => {
    try {
      // Ambil ID dari parameter
      const id = req.params.id;

      // Cari pengguna berdasarkan ID
      const user = await Users.findOne({ where: { id }});
      res.status(200).json({ user });

    } catch (error) {
       console.error('Terjadi kesalahan saat mengambil data user',error);
       res.status(500).json('Internal Server Error') 
    }
}
// Function hapus user
const deleteUsers = async (req, res) => {
    try {
      // Ambil ID dari parameter 
      const id = req.params.id; 
  
      // Cari pengguna berdasarkan ID
      const user = await Users.findOne({ where: { id } });
  
      // Hapus pengguna dari database
      await user.destroy();
  
      // Kirim respons 
      res.status(200).json({ msg: "Pengguna berhasil dihapus" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Kesalahan Internal Server" });
    }
  };

// Function Register
  const Register = async (req, res) => {
    // Mengambil data dari body request
    const { name, email, password, confPassword, jenis_kelamin, tanggal_lahir, kelas, alamat } = req.body;
    console.log(req.body)
    // Konfirmasi password
    if (password !== confPassword)
        return res.status(400).json({ msg: "Password Tidak Sama" });
    
    const userResult = await pool.query(getUserByEmail, [email]); 
    if (userResult.rows.length > 0) {
      return res.status(400).json({ msg: "Email sudah terdaftar" });
  }

    try {
        // Salt acak dan hash + password asli
        const saltRounds = 10; 
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(password, salt);

        // Dapatkan tanggal saat ini untuk createdAt dan updatedAt
        const now = new Date();

        // Memulai Transaksi
        const client = await pool.connect();
        try {
          await client.query('BEGIN');

          // Menambahkan pengguna baru ke tabel users
          const addUserValues = [name, email, hashPassword, null, 'siswa', new Date(), new Date()];
          const userResult = await client.query(queriesUser.addUser, addUserValues);
          const newUserId = userResult.rows[0].id;

          // Menambahkan entri baru ke tabel students
          const addStudentValues = [newUserId, name, jenis_kelamin, tanggal_lahir, kelas, alamat];
          await client.query (queriesSiswa.addStudent, addStudentValues);

          // Commite Transaksi
          await client.query ('COMMIT');

          // Kirim respons ke klien
          res.status(201).json({ msg: "Registrasi berhasil" });
        } catch (error) {
          // Rollback transaksi jika terjadi kesalahan
          await client.query('ROLLBACK');
          console.error('Terjadi kesalahan saat melakukan register', error);
          res.status(500).json({ msg: "Internal Server Error" });
        } finally {
          client.release();
    }
        
    } catch (error) {
        console.error('Terjadi kesalahan saat melakukan register', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
// Function Login
const Login = async (req, res) => {
  try {
      const { email, password } = req.body;
      console.log(req.body)
      //  Validasi email dan password harus diisi
      if (!email || !password) {
          return res.status(400).json({ msg: "Email dan password diperlukan" });
      }

      const userResult = await pool.query(getUserByEmail, [email]);

      // Cek apakah email terdaftar
      if (userResult.rows.length === 0) {
          return res.status(400).json({ msg: "Email tidak terdaftar" });
      }

      // Ambil data pengguna dari hasil query
      const user = userResult.rows[0];

      // Apakah passwordnya sama ?
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ msg: "Password Salah" });

      // Ambil informasi pengguna
      const { role, id: userId, name, email: userEmail } = user;

      // Buat akses token 
      const accessToken = jwt.sign({ userId, name, email: userEmail, role }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '20s'
      });

      const refreshToken = jwt.sign({ userId, name, email: userEmail, role }, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: '1d'
      });

     // Pembaruan refresh token di database
    await pool.query(updateRefreshToken, [refreshToken, userId]);

      // Simpan refresh token dalam cookie
      res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000 // 1 hari
      });

      res.json({ accessToken })

      // Simpan access token dalam cookie
      // res.cookie('accessToken', accessToken, {
      //     httpOnly: true,
      //     maxAge: 60 * 60 * 1000 // 1 jam
      // });

      // const redirectTo = (role === 'admin') ? '/dashboard/admin' : '/dashboard/siswa';
      // Kirim nama pengguna bersama dengan accessToken dan redirectTo
      // res.status(200).json({ accessToken, redirectTo });

  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
  }
};

// const Login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         //  Validasi email dan passsword harus di isi
//         if (!email || !password) {
//             return res.status(400).json({ msg: "Email dan password diperlukan" });
//         };
//         // Cari berdasarkan email
        
//         const userResult = await pool.query(getUserByEmail, [email]);
//         // Cek apakah email terdaftar
//         if (!userResult) {
//             return res.status(400).json({ msg: "Email tidak terdaftar" });
//         }
//         // Apakah passswordnya sama ?
//         const match = await bcrypt.compare(req.body.password, userResult.password);
//         if (!match) return res.status(400).json({ msg: "Password Salah" });

//         const role = user.role;
//         const userId = user.id;
//         const name = user.name;
//         const userEmail = user.email;

//         // Atur objek req.user dengan informasi pengguna
//         req.user = { userId, name, email: userEmail, role };
//         // Buat akses token 
//         const accessToken = jwt.sign({ userId, name, email: userEmail, role }, process.env.ACCESS_TOKEN_SECRET, {
//             expiresIn: '1h'
//         });

//         const refreshToken = jwt.sign({ userId, name, email: userEmail, role }, process.env.REFRESH_TOKEN_SECRET, {
//             expiresIn: '1d'
//         });

//         // Simpan refresh token dalam cookie
//         res.cookie('refreshToken', refreshToken, {
//             httpOnly: true,
//             maxAge: 24 * 60 * 60 * 1000 // 1 hari
//         });

//         // Simpan access token dalam cookie
//         res.cookie('accessToken', accessToken, {
//             httpOnly: true,
//             maxAge: 60 * 60 * 1000 // 1 jam
//         });

//         const redirectTo = (role === 'admin') ? '/dashboard/admin' : '/dashboard/siswa';

//         // Kirim nama pengguna bersama dengan accessToken dan redirectTo
//         res.status(200).json({ accessToken, redirectTo });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ msg: "Internal Server Error" });
//     }
// };


// Function Log Out
const Logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);

    // Query untuk mendapatkan user berdasarkan refresh token
    const userResult = await pool.query(getUserByRefreshToken, [refreshToken]);

    if (userResult.rows.length === 0) return res.sendStatus(204);

    const userId = userResult.rows[0].id;

    // Menghapus refresh token dari database
    await pool.query(deleteRefreshToken, [userId]);

    res.clearCookie('refreshToken');
    return res.sendStatus(200);
  } catch (error) {
    console.error('Error during logout', error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
// const Logout = async (req, res) => {
//     try {
//       // Menghapus cookie accessToken
//       res.clearCookie('accessToken');
  
//       // Mendapatkan token akses dari cookie
//       const refreshToken = req.cookies.refreshToken;
  
//       // Memeriksa apakah token ada
//       if (!refreshToken) {
//         // Jika tidak ada refresh token, langsung kembali ke halaman login
//         return res.redirect('/auth');
//       }
  
//       // Cari pengguna berdasarkan refresh token
//       const userResult = await pool.query(findUserToken, [refreshToken]);

//       // Jika pengguna tidak ditemukan, kembali ke halaman login
//       if (userResult.rows.length === 0) {
//         return res.redirect('/auth');
//       }
//       const userId = userResult.rows[0].id;
  
//       // Hapus refresh token dari pengguna di database
//       await pool.query(deleteRefreshToken, [userId]);
  
//       // Hapus cookie refreshToken
//       res.clearCookie('refreshToken');
  
//       // Redirect ke halaman login
//       res.redirect('/auth');
//     } catch (error) {
//       console.error('Terjadi kesalahan saat logout:', error);
//       res.status(500).json({ message: 'Terjadi kesalahan saat logout' });
//     }
//   };

// Function menampilkan form login dan register
const form = (req, res) => {
    res.render('login/login', {
        layout : 'layouts/login-layout',
        title  : 'Login' 
    })
}


module.exports = {
    getUsers,
    getUsersById,
    deleteUsers,
    form,
    Register,
    Login,
    Logout,
};