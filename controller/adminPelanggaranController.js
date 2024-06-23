const pool = require('../config/connection');
function getPelanggaran (req,res){
    const data = 'API Untuk Read Data Pelanggaran'
    
    res.status(200).json({
        pelangaran : data
    })
};
function deletePelanggaranById (req,res){
    const data = 'API Untuk Delete Data Pelanggaran by Id'
    const id = req.params.id;
    res.status(200).json({
        pelangaran : data,
        id:+id
    })
};
function updatePelanggaranById (req,res){
    const data = 'API Untuk Update Data Pelanggaran by Id'
    const id = req.params.id;
    res.status(200).json({
        pelangaran : data,
        id:+id
    })
};
function inputPelanggaran (req,res){
    const data = 'API Untuk Input Data Pelanggaran'
    
    res.status(200).json({
        pelangaran : data
    })
};










module.exports = {
    getPelanggaran,
    deletePelanggaranById,
    updatePelanggaranById,
    inputPelanggaran

};