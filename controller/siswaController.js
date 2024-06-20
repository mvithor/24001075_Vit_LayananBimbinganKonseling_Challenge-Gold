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
                tanggal_lahir: moment(student.tanggal_lahir).format('YYYY-MM-DD'),
             
            };
        });
        res.json(students)
    
    } catch (error) {
        console.error('Terjadi kesalahan saat mengambil data siswa:', error);
        res.status(500).send({msg:'Internal server error'});
    };
};

// Dapatkan Data siswa berdasarkan Jenis Kelamin
const getJenisKelamin = async (req, res) => {
    try {
        const result = await pool.query('SELECT DISTINCT jenis_kelamin FROM students');
        const genderOptions = result.rows.map(row => ({ value: row.jenis_kelamin, label: row.jenis_kelamin }));
        res.json(genderOptions);
    } catch (error) {
        console.error('Error fetching gender options:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Dapatkan data siswa berdasarkan ID
const getStudentsById = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await pool.query(queries.getStudentsById, [id]);
      const student = result.rows[0];
      res.json(student);
    } catch (error) { 
      console.error("Terjadi kesalahan saat mendapatkan data siswa berdasarkan ID:", error);
      res.status(500).json({ msg: "Internal Server Error" });
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
        return res.json({ msg: 'Data siswa berhasil diperbarui' });
    } catch (error) {
        console.error('Terjadi kesalahan saat mengupdate data siswa', error);
        res.status(500).json({ msg: 'Internal Server Error' });
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
    getJenisKelamin,
    getStudentsById,
    deleteStudent,
    deleteAllStudent,
    updateStudent,
}