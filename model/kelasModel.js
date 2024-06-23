const getKelas = "SELECT * FROM kelas";
const getKelasForm = "SELECT id FROM kelas WHERE id = $1";
const getSiswaKelasById = "SELECT id, name FROM students WHERE kelas_id = $1";
const getNamaKelas = "SELECT id, nama_kelas FROM kelas";
const getKelasById = "SELECT * FROM kelas WHERE id =$1";
const getKelasAll = "SELECT COUNT(*) AS count FROM kelas";
const addKelas = "INSERT INTO kelas (nama_kelas) VALUES ($1)";
const deleteKelas = "DELETE FROM kelas WHERE id = $1";
const updateKelas = "UPDATE kelas SET nama_kelas = $1 WHERE id = $2";
const cekKelasTerdaftar = "SELECT * FROM kelas WHERE nama_kelas = $1";

module.exports = {
    getKelas,
    getKelasForm,
    getSiswaKelasById,
    getNamaKelas,
    getKelasById,
    getKelasAll,
    addKelas,
    deleteKelas,
    updateKelas,
    cekKelasTerdaftar
}
