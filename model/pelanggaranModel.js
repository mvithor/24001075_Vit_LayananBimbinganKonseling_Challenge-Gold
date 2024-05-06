
const getPelanggaran = "SELECT * FROM pelanggaran"
const getPelanggaranById = "SELECT * FROM pelanggaran WHERE id = $1 ";
const getPelanggaranAll = "SELECT COUNT(*) FROM pelanggaran";
const addPelanggaran = "INSERT INTO pelanggaran (student_id, kelas, pelanggaran, poin, deskripsi, prosedur_konseling) VALUES ($1, $2, $3, $4, $5, $6)";
const deletePelanggaran = "DELETE FROM pelanggaran WHERE id = $1";
const updatePelanggaran = "UPDATE pelanggaran SET kelas = $1, pelanggaran= $2, poin = $3, deskripsi =$4, prosedur_konseling = $5 WHERE id= $6"

module.exports = {
    getPelanggaran,
    getPelanggaranAll,
    getPelanggaranById,
    addPelanggaran,
    deletePelanggaran,
    updatePelanggaran,
}