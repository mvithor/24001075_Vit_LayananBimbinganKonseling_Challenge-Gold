const pool = require('../config/connection')
const queries = require('../model/siswaModel');
const moment = require('moment');

const getStudents = async (req, res) => {
    try {
        const result = await pool.query(queries.getStudents);
        let students = result.rows;
        // Format tanggal_lahir menggunakan Moment.js
        students = students.map(student => {
            return {
                ...student,
                tanggal_lahir: moment(student.tanggal_lahir).format('YYYY-MM-DD')
            };
        });
        res.render('siswa/siswaList', { 
            students,
            layout : 'layouts/data-layout',
            title  : 'Data Siswa' 
        }); 
    
    } catch (error) {
        console.error('Terjadi kesalahan saat mengambil data siswa:', error);
        res.status(500).send('Internal server error');
    };
};

// Dapatkan data siswa berdasarkan ID
const getStudentsById = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await pool.query(queries.getStudentsById, [id]);
      const student = result.rows[0];
  
      res.render('siswa/siswaEdit', {
        student,
        layout: 'layouts/data-layout',
        title: 'Edit Siswa'
      });
    } catch (error) { 
      console.error("Terjadi kesalahan saat mendapatkan data siswa berdasarkan ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
   
  };
  
// Function update student
const updateStudent = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, tanggal_lahir, jenis_kelamin, kelas, alamat } = req.body;
        
        // Lakukan update data siswa
        await pool.query(queries.updateStudent, [
            name,
            jenis_kelamin,
            tanggal_lahir, 
            kelas, 
            alamat, 
            id
        ]);
        return res.redirect('/dashboard/admin/students')
    } catch (error) {
        console.error('Terjadi kesalahan saat mengupdate data siswa', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Hapus data siswa 
const deleteStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query(queries.deleteStudent, [id]);
        
        res.status(200).send("Data siswa berhasil dihapus");
    } catch (error) {
        console.error('Terjadi kesalahan saat menghapus data siswa', error);
        res.status(500).send('Internal Server Error');
    };
};
// Hapus seluruh data Siswa
const deleteAllStudent = async (req, res) => {
    try {
        const result = await pool.query(queries.deleteAllStudent);
        if (!result.rowCount) {
            res.status(404).send("Anda belum memasukkan data siswa");
            return;
        }
        res.status(200).send("Siswa berhasil dihapus semua");
    } catch (error){
        res.status(500).send("internal server errror")
    };
};




module.exports = {
    getStudents,
    getStudentsById,
    deleteStudent,
    deleteAllStudent,
    updateStudent,
}