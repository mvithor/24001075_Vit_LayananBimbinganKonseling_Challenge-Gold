const pool = require('../config/connection');
const queriesSiswa = require('../model/siswaModel');
const queriesKonselor = require('../model/konselorModel');
const queriesPelanggaran = require('../model/pelanggaranModel')

//Function dashboard Admin
const dashboardAdmin = async (req, res) => {
    try {
        // // Dapatkan username login
        // const userName = req.userName;

        // Query jumlah siswa
        const resultStudents = await pool.query(queriesSiswa.getStudentsAll);
        const jumlahStudents = resultStudents.rows[0] ? parseInt(resultStudents.rows[0].count) : 0;

        // Query jumlah konselor
        const resultKonselor = await pool.query(queriesKonselor.getKonselorAll);
        const jumlahKonselor = resultKonselor.rows[0] ? parseInt(resultKonselor.rows[0].count) : 0;

        // Query jumlah pelanggaran
        const resultPelanggaran = await pool.query(queriesPelanggaran.getPelanggaranAll);
        const jumlahPelanggaran = resultPelanggaran.rows[0] ? parseInt(resultPelanggaran.rows[0].count) : 0;

        res.render('dashboard/admin', {
            greeting: userName,
            jumlahStudents,
            jumlahKonselor,
            jumlahPelanggaran,
            userRole: req.userRole,
            layout: 'layouts/admin-dashboard-layout',
            title: 'Dashboard'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

//Function dashboard siswa
const dashboardSiswa = async (req, res) => {
    try {
        // Dapatkan username login
        const userName = req.userName;

        res.render('dashboard/siswa', {
            greeting: userName,
            userRole: req.userRole,
            layout: 'layouts/siswa-dashboard-layout',
            title: 'Dashboard'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    dashboardAdmin,
    dashboardSiswa
};
