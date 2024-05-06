const checkNamaTerdaftar = "SELECT k FROM konselor WHERE k.nama = $1";
const getKonselor = "SELECT * FROM konselor";
const getKonselorAll = "SELECT COUNT(*) FROM konselor";
const getKonselorById = "SELECT * FROM konselor WHERE id = $1";
const addKonselor = "INSERT INTO konselor (nama, email, bidang, nomor_telepon, alamat, status_aktif) VALUES ($1, $2, $3, $4, $5, $6)";
const deleteKonselor = "DELETE FROM konselor WHERE id = $1";
const updateKonselor = "UPDATE konselor SET nama = $1, email = $2, bidang = $3, nomor_telepon = $4, alamat = $5, status_aktif = $6 WHERE id = $7";

module.exports = {
    checkNamaTerdaftar,
    getKonselor,
    getKonselorById,
    getKonselorAll,
    addKonselor,
    deleteKonselor,
    updateKonselor,
}