const getUser = "SELECT * FROM users";
const getUserLogin = "SELECT id, name, email FROM users";
const getUserById = "SELECT * FROM users WHERE id =$1";
const getGenderForm = "SELECT id, jenis_kelamin FROM gender";
const getGender = "SELECT id FROM gender WHERE id = $1";
const getUserByEmail = "SELECT * FROM users WHERE email =$1";
const getUserByRefreshToken = "SELECT * FROM users WHERE refresh_token = $1";
const updateRefreshToken = "UPDATE users SET refresh_token = $1 WHERE id =$2";
const findUserToken = "SELECT id FROM users WHERE refresh_token = $1";
const deleteRefreshToken = "UPDATE users SET refresh_token = NULL WHERE id = $1";
const addUser = "INSERT INTO users (name, email, password, refresh_token, role) VALUES ($1, $2, $3, $4, $5) RETURNING id";
const deleteUser = "DELETE FROM users WHERE id =$1";
const updateUser = "UPDATE users SET name = $1, email = $2, password = $3, refresh_token = $4, role = $5, WHERE id = $6"


module.exports = {
  getUser,
  getUserLogin,
  getUserById,
  getGenderForm,
  getGender,
  getUserByRefreshToken,
  getUserByEmail,
  updateRefreshToken,
  findUserToken,
  deleteRefreshToken,
  addUser,
  deleteUser,
  updateUser,
}