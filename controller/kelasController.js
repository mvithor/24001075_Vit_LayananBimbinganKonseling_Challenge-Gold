const pool = require('../config/connection');
const queries = require('../model/kelasModel');
const { getNamaKelas, getKelasForm, getSiswaKelasById } = require('../model/kelasModel')



// Dapatkan data kelas
const getKelas = async (req, res) => {
    try {
        const result = await pool.query(queries.getKelas);
        const kelas = result.rows;
        res.json(kelas);
    } catch (error) {
        console.error('Terjadi kesalahan saat mengambil data kelas', error);
        res.status(500).send('Internal Server Error');
    };
};
//Dapatkan ID Kelas 
const getKelasOptions = async (req, res) => {
    try {
        const {rows} = await pool.query(getKelasForm);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching kelas options:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Dapatkan nama kelas
const getClassName = async (req, res) => {
  try {
    const {rows} = await pool.query(getNamaKelas);
    console.log(rows)
    res.status(200).json(rows);
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil nama kelas:", error)
    res.status(500).json({ message: 'Error fetching class names' });
  }
};

// Dapatkan jumlah data kelas
const getKelasAll = async (req, res) => {
    try {
        const result = await pool.query(queries.getKelasAll);
        const count = result.rows[0].count;
        res.json({count});
    } catch (error) {
        console.error('Terjadi kesalahan saat mengambil jumlah kelas', error);
        res.status(500).send('Internal Server Error');
    };
};

// Dapatkan data kelas berdasarkan ID
const getKelasById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query(queries.getKelasById, [id]);
        const kelas = result.rows[0];
        res.json(kelas)
    } catch (error) {
        console.error('Terjadi kesalahan saat mengambil kelas by Id', error);
        res.status(500).send('Internal Server Error');
    };
};

// Dapatkan data siswa berdasarkan ID kelasnya
const SiswaKelasById = async (req, res) => {
    const { KelasId } = req.params;
    try {
       const client = await pool.connect();
       const result = await client.query(getSiswaKelasById, KelasId);
       const siswa = result.rows;
       client.release();
       res.json(siswa)
    } catch (error) {
       console.error('Terjadi kesalahan saat mengambil data siswa:', error);
       res.status(500).json({ error: 'Internal Server Error' });
    };
};

// Tambahkan data Kelas
const addKelas = async (req, res) => {
    try {
        const { nama_kelas } = req.body;
        const checkKelasResult = await pool.query(queries.cekKelasTerdaftar, [nama_kelas]);
        if (checkKelasResult.rows.length > 0) {
            return res.status(400).json({ msg: "Kelas sudah terdaftar"});
        }
        // Jika kelas belum terdaftar, tambahkan kelas baru
        await pool.query(queries.addKelas, [nama_kelas]);
        res.status(201).json({ msg: "Kelas Berhasil di Tambahkan" });
    } catch (error) {
        console.error('Terjadi kesalahan saat menambahkan data kelas:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    };
};

// Hapus data Kelas
const deleteKelas = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const checkKelasTerdaftar = await pool.query(queries.getKelasById, [id]);
        if (checkKelasTerdaftar.rows.length === 0) {
            return res.status(404).json({ msg: "Kelas tidak ditemukan" });
        };
        await pool.query(queries.deleteKelas, [id]);
        res.status(200).json({ msg: "Kelas berhasil dihapus" });
    } catch (error) {
        console.error('Terjadi kesalahan saat menghapus kelas', error);
        res.status(500).json({ msg: "Internal Server Error" });
    };
};

// Update data Kelas
const updateKelas = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { nama_kelas } = req.body;
        await pool.query(queries.updateKelas, [nama_kelas, id])
        return res.json({ msg: " Data kelas berhasil di perbarui"});
    } catch (error) {
        console.error('Terjadi kesalahan saat update kelas', error);
        res.status(500).json({ msg: "Internal Server Error" });
    };
};

module.exports = {
    getKelas,
    getKelasOptions,
    getClassName,
    getKelasAll,
    SiswaKelasById,
    getKelasById,
    addKelas,
    deleteKelas,
    updateKelas
}
