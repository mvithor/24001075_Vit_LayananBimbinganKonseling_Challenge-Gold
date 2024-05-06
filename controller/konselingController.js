const pool = require('../config/connection');
const queries = require('../model/konselingModel');

// Dapatkan seluruh data konseling
const getKonseling = async (req, res) => {
    try {
        const result = await pool.query(queries.getKonseling);
        res.status(200).json(result.rows);
        
    } catch (error) {
        console.error('Terjadi kesalahan saat mencari data konseling', error);
        res.status(500).send('Internal Server Error');
    };
};
// Tambah data konseling
const addKonseling = async (req, res) => {
    try {
        const { student_id, konselor_id, judul, deskripsi, status, requested_date, scheduled_date } = req.body;

        //Validasi data
        if (!student_id || !konselor_id || !judul || !deskripsi || !status || !requested_date || !scheduled_date) {
            return res.status(400).send("Data konseling tidak lengkap");
        };

        // Tambahkan data konseling
        await pool.query(queries.addKonseling, [
           student_id,
           konselor_id,
           judul,
           deskripsi,
           status,
           requested_date,
           scheduled_date
        ]);
        res.status(200).send(`Pelanggaran ${judul} berhasil di tambahkan`);
    
    } catch (error) {
        console.error('Terjadi kesalahan saat menambahkan konseling', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getKonseling,
    addKonseling,
    
}