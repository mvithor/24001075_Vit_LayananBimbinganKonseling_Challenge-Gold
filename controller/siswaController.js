const pool = require('../config/connection')
const queries = require('../model/siswaModel');
const moment = require('moment');

// Dapatkan data siswa
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

// Dapatkan jumlah data siswa
const getStudentsAll = async (req, res) => {
    try {
      const result = await pool.query(queries.getStudentsAll);
      const count = result.rows[0].count;
      res.json({count})
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil jumlah siswa', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }

}

// Dapatkan data siswa berdasarkan ID
const getStudentsById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new Error('Invalid ID');
        }
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
        const { name, tanggal_lahir, jenis_kelamin_id, kelas_id, alamat } = req.body;
        
        // Lakukan update data siswa
        await pool.query(queries.updateStudent, [
            name,
            jenis_kelamin_id,
            tanggal_lahir, 
            kelas_id, 
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
        const id = parseInt (req.params.id);
        const checkSiswaTerdaftar = await pool.query(queries.getStudentsById, [id]);
        if (checkSiswaTerdaftar.rows.length === 0) {
            return res.status(404).json({ msg: "Siswa tidak ditemuka"});
        };
        await pool.query(queries.deleteStudent, [id]);
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

    getStudentsAll,
    getStudentsById,
    deleteStudent,
    deleteAllStudent,
    updateStudent,
}