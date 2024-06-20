const pool = require('../config/connection');
const queries = require('../model/pelanggaranModel');
const getStudents = 'SELECT * FROM students';
const getStudentById = 'SELECT name FROM students WHERE id = $1';

// Dapatkan seluruh data pelanggaran
const getPelanggaran = async (req, res) => {
    try {
        // Dapatkan data siswa
        const studentsResult = await pool.query(getStudents);
        const students = studentsResult.rows;

        // Dapatkan data pelanggaran
        const result = await pool.query(queries.getPelanggaran);
        const dataPelanggaran = result.rows;

        // Mendapatkan nama siswa untuk setiap pelanggaran
        for (const pelanggaran of dataPelanggaran) { 
            const studentResult = await pool.query(getStudentById, [pelanggaran.student_id]);
            pelanggaran.student_name = studentResult.rows[0].name;
        }

        // Kirim data pelanggaran dan siswa dalam JSON
        res.json({
            pelanggaran: dataPelanggaran, 
            students: students,
        });
    } catch (error) {
        console.error('Terjadi kesalahan saat mengambil data pelanggaran', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

// Dapatkan data pelanggaran berdasarkan ID
const getPelanggaranById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query(queries.getPelanggaranById, [id]);
        const pelanggaran = result.rows[0];

        res.render('pelanggaran/pelanggaranEdit', {
            pelanggaran,
            layout : 'layouts/pelanggaran-layout',
            title  : ' Edit Pelanggaran'
        })

    } catch (error) {
        console.error('Terjadi kesalahan saat mendapatkan pelanggaran',error);
        res.status(500).send('Internal Server Error');
        
    };     
};
// Tambahkan data pelanggaran
const addPelanggaran = async (req, res) => {
    try {
        const { student_id, kelas, pelanggaran, poin, deskripsi, prosedur_konseling} = req.body;

        // // Validasi data
        // if ( !student_id || !kelas || !pelanggaran || !poin || !deskripsi || !prosedur_konseling) {
        //     return res.status(400).send("Data Pelanggran belum lengkap")
        // }
        // Menambahkan data pelanggaran
          await pool.query(queries.addPelanggaran, [
            student_id,
            kelas,
            pelanggaran,
            poin,
            deskripsi,
            prosedur_konseling,
        ]);
            // Kirim respon dengan nama pelanggaran
           return res.redirect('/dashboard/admin/pelanggaran')
    } catch (error) {
        console.error('Terjadi kesalahan saat menambahkan pelanggaran', error);
        res.status(500).send('Internal Server Error');
    };
};
// Hapus data pelanggaran
const deletePelanggaran = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query(queries.deletePelanggaran, [id])
        
        if (result.rowCount === 0) {
            return res.status(404).send("Pelanggaran tidak terdaftar");
        };
            res.status(200).send(`Pelanggaran ${id} berhasil di hapus`);
        
    } catch (error) {
        console.error('Terjadi kesalahan saat menghapus pelanggaran', error);
        res.status(500).send('Internal Server Error');
    };
};
// Update data pelanggaran 
const updatePelanggaran = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { kelas, pelanggaran, poin, deskripsi, prosedur_konseling} = req.body;

        const result = await pool.query(queries.getPelanggaranById,[id]);
        const noPelanggaranFound = !result.rows.length;
        if (noPelanggaranFound) {
            return res.status(404).send("Pelanggaran tidak ditemukan");
        };
        
        await pool.query(queries.updatePelanggaran, [
            kelas,
            pelanggaran,
            poin,
            deskripsi,
            prosedur_konseling,
            id
        ]);
            return res.redirect('/dashboard/admin/pelanggaran')
        
    } catch (error) {
        console.error('Terjadi kesalahan saat mengupdate pelanggaran',error);
        res.status(500).send('Internal Server Error');
    };
};

const From = async (req, res) => {

    // Dapatkan data siswa
    const students = await pool.query(getStudents);
    // Dapatkan data pelanggaran
    const result = await pool.query(queries.getPelanggaran);
    const dataPelanggaran = result.rows;

    // Mendapatkan nama siswa untuk setiap pelanggaran
    for (const pelanggaran of dataPelanggaran) { 
        const studentResult = await pool.query(getStudentById, [pelanggaran.student_id]);
        pelanggaran.student_name = studentResult.rows[0].name;
    }
    res.render('pelanggaran/pelanggaranAdd', {
        pelanggaran: dataPelanggaran, 
        students: students.rows,
        layout : 'layouts/pelanggaran-layout', 
        title  : "Tambah Pelanggaran"
    })
}

module.exports = {
    getPelanggaran,
    getPelanggaranById,
    addPelanggaran,
    deletePelanggaran,
    updatePelanggaran,
    From
}