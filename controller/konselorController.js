const pool = require('../config/connection');
const queries = require('../model/konselorModel');

// Dapatkan seluruh data konselor
const getKonselor = async (req, res) => {
  try {
      const result = await pool.query(queries.getKonselor);
      const konselor = result.rows;
      res.render('konselor/konselorList', {
        konselor,
        layout : 'layouts/konselor-layout',
        title  : 'Data Konselor' 
      })
  } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data konselor', error);
      res.status(500).send('Internal Server Error');
  };
};
// Dapatkan data konselor berdasarkan ID
const getKonselorById = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await pool.query(queries.getKonselorById, [id]);
      const konselor = result.rows[0];

      res.render('konselor/konselorEdit', {
        konselor,
        layout : 'layouts/konselor-layout',
        title  : 'Edit Konselor'
      })

    } catch (error) {
        console.error('Terjadi kesalahan saat mendapatkan data konselor');
        res.status(500).send('Internal Server Error');
    };  
};
// Tambahkan Data Konselor 
const addKonselor = async (req, res) => {
  try {
      const { nama, email, bidang, nomor_telepon, alamat, status_aktif } = req.body;

      // Validasi data
      if (!nama || !email || !bidang || !nomor_telepon || !alamat  || !status_aktif) {
          return res.status(400).send("Data konselor tidak lengkap");
      };

      // Tambahkan data konselor
        await pool.query(queries.addKonselor, [
          nama,
          email,
          bidang,
          nomor_telepon,
          alamat,
          status_aktif,
      ]);

      // Redirect ke halaman data-konselor
      res.redirect('/dashboard/admin/data-konselor')
  } catch (error) {
      // Handling error berdasarkan jenis error (unique constraint violation)
      if (error.code === '23505') {
          res.status(400).send('Email sudah terdaftar');
      } else {
          console.error('Terjadi kesalahan saat menambahkan konselor:', error);
          res.status(500).send('Internal Server Error');
      };
  };
};
// Hapus data Konselor
const deleteKonselor = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query(queries.deleteKonselor, [id]);

    if (result.rowCount === 0) {
        return res.status(404).send("Konselor tidak terdaftar");
    };
        res.status(200).send("Konselor berhasil dihapus")
    
  } catch (error) {
    console.error('Terjadi kesalahan saat menghapus konselor:', error);
    res.status(500).send('Internal Server Error');
  };
};
// Update data Konselor
const updateKonselor = async (req, res) => {
  try {
      const id = parseInt(req.params.id);
      const { nama, email, bidang, nomor_telepon, alamat, status_aktif } = req.body;

    // Ambil nilai yang dipilih dari elemen select
    const selectedStatus = status_aktif;

    // Konversi nilai string menjadi boolean
    const statusAktif = selectedStatus === "Aktif" ? true : false;

    
    const updateKonselorQuery = "UPDATE konselor SET nama = $1, email = $2, bidang = $3, nomor_telepon = $4, alamat = $5, status_aktif = $6 WHERE id = $7";
      // Update data konselor
      await pool.query(updateKonselorQuery, [
          nama,
          email,
          bidang,
          nomor_telepon,
          alamat,
          statusAktif,
          id
      ]);

      return res.redirect('/dashboard/admin/data-konselor')
  } catch (error) {
      console.error('Terjadi kesalahan saat mengupdate data konselor', error);
      res.status(500).send('Internal Server Error');
  }
}

const From = (req, res) => {
    res.render('konselor/konselorAdd', {
        layout : 'layouts/konselor-add',
        title  : "Tambah Konselor"
    })
}
        
 
module.exports = {
    getKonselor,
    getKonselorById,
    addKonselor,
    deleteKonselor,
    updateKonselor,
    From
}