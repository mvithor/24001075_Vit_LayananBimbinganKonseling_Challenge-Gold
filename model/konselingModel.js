const getKonseling = "SELECT * FROM konseling";

const addKonseling = "INSERT INTO konseling (student_id, konselor_id, judul, deskripsi, status, requested_date, scheduled_date) VALUES ($1, $2, $3, $4, $5, $6, $7)";




module.exports = {
    getKonseling,
    addKonseling
}