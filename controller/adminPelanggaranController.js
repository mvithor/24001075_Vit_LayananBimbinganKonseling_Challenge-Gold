const pool = require('../config/connection');
const {
    getDataPelanggaran,
    inputDataPelanggaran,
    deleteDataPelanggaran,
    getDataPelanggaranById,
    updateDataPelanggaran
} = require('../model/adminPelanggaranModel');
const getPelanggaran = async function (req, res) {
    try {
        //ambil data dari db
        const { rows } = await pool.query(getDataPelanggaran);
        //ambil data dari db
        dataPelanggaran = rows

        res.status(200).json({
            message: 'get data pelanggaran',
            status: 'success',
            dataPelanggaran: dataPelanggaran,
        });


    } catch (error) {
        res.status(500).json({
            message: 'get data pelanggaran',
            status: 'failed',
            error: error.message
        });
    }
};
const deletePelanggaranById = async function (req, res) {
    //ambil data params
    const id = +req.params.id;
    //delete data
    try {

        const checkDataPelanggaran = await pool.query(getDataPelanggaranById, [id]);
        if (checkDataPelanggaran.rows.length === 0) {
            return res.status(404).json({ message: "data pelanggaran not found" });
        };
        await pool.query(deleteDataPelanggaran, [id])
        //kasih respone
        res.status(200).json({
            message: `delete data pelanggaran by id: ${id}`,
            status: 'sucsess'
        });
    } catch (error) {
        res.status(500).json({
            message: 'delete data pelanggaran',
            status: 'failed',
            error: error.message
        });

    };
};
const updatePelanggaranById = async function (req, res) {
    //ambil data params
    const id = +req.params.id;
    //ambil data body
    const payload = req.body;
    try {
        const nip = payload.nip;
        const namaSiswa = payload.namaSiswa;
        const jenisKelamin = payload.jenisKelamin;
        const waktu = payload.waktu;
        const peristiwa = payload.peristiwa;
        const tempat = payload.tempat;
        const informan = payload.informan;
        const bidangBimbingan = payload.bidangBimbingan;
        if (!(nip && namaSiswa && jenisKelamin && waktu && peristiwa && tempat && informan && bidangBimbingan)) {
            res.status(400).json({
                message: 'some fields missing!!!'
            })
            return;
        }
        //update data
        await pool.query(updateDataPelanggaran, [
            nip,
            namaSiswa,
            jenisKelamin,
            waktu,
            peristiwa,
            tempat,
            informan,
            bidangBimbingan,
            id
        ]);
        //kasih respone
        res.status(200).json({
            message: 'update data pelanggaran',
            status: 'success'
            
        });
    } catch (error) {
        res.status(500).json({
            message: 'update data pelanggaran',
            status: 'failed',
            error: error.message
        });
    }

};
const inputPelanggaran = async function (req, res) {
    try {
        const payload = req.body;
        const nip = payload.nip;
        const namaSiswa = payload.namaSiswa;
        const jenisKelamin = payload.jenisKelamin;
        const waktu = payload.waktu;
        const peristiwa = payload.peristiwa;
        const tempat = payload.tempat;
        const informan = payload.informan;
        const bidangBimbingan = payload.bidangBimbingan;

        if (!(nip && namaSiswa && jenisKelamin && waktu && peristiwa && tempat && informan && bidangBimbingan)) {
            res.status(400).json({
                message: 'some fields missing!!!'
            })
            return;
        }
        //input data
        await pool.query(inputDataPelanggaran, [
            nip,
            namaSiswa,
            jenisKelamin,
            waktu,
            peristiwa,
            tempat,
            informan,
            bidangBimbingan
        ]);
        //kasih respone
        res.status(200).json({
            status: 'success',
            message: 'input data pelanggaran',
            data: payload
        });
    } catch (error) {
        res.status(500).json({
            message: 'input data pelanggaran',
            status: 'failed',
            error: error.message
        });
    }

};

module.exports = {
    getPelanggaran,
    deletePelanggaranById,
    updatePelanggaranById,
    inputPelanggaran

};