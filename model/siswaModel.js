const getStudents = "SELECT * FROM students";
const getStudentsById = "SELECT * FROM students WHERE id = $1";
const getStudentsAll = "SELECT COUNT(*) AS count FROM students";
const getJenisKelamin = "SELECT * FROM students WHERE jenis_kelamin =$1";
// Menentukan tabel students sebagai sumber data dengan alias s (nama lengkap)
const checkNamaTerdaftar = "SELECT s FROM students s WHERE s.name = $1";
const addStudent = "INSERT INTO students (user_id, name, jenis_kelamin_id, tanggal_lahir, kelas_id, alamat) VALUES ($1, $2, $3, $4, $5, $6)";
const deleteStudent = "DELETE FROM students WHERE id =$1";
const deleteAllStudent = "DELETE FROM students";
const updateStudent = "UPDATE students SET name = $1, jenis_kelamin_id = $2, tanggal_lahir = $3, kelas_id = $4, alamat = $5 WHERE id = $6";

module.exports = {
    getStudents,
    getStudentsById, 
    getJenisKelamin,
    getStudentsAll,
    checkNamaTerdaftar,
    addStudent,
    deleteStudent,
    deleteAllStudent,
    updateStudent,
}



