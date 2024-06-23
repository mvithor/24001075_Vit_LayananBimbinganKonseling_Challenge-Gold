const getDataPelanggaran = "SELECT * FROM pelanggaran";
const getDataPelanggaranById = "SELECT * FROM pelanggaran WHERE id=$1";
const inputDataPelanggaran = "INSERT INTO pelanggaran (nip,nama_siswa,jenis_kelamin,waktu,peristiwa,tempat,informan,bidang_bimbingan) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
const deleteDataPelanggaran = "DELETE FROM pelanggaran WHERE id=$1";
const updateDataPelanggaran = "UPDATE pelanggaran SET nip=$1,nama_siswa=$2,jenis_kelamin=$3,waktu=$4,peristiwa=$5,tempat=$6,informan=$7,bidang_bimbingan=$8 WHERE id=$9";


module.exports={
    getDataPelanggaran,
    inputDataPelanggaran,
    deleteDataPelanggaran,
    getDataPelanggaranById,
    updateDataPelanggaran
}