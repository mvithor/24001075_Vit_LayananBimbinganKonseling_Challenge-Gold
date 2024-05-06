const {Sequelize} = require("sequelize")
const pool = require('../config/connection');
const {DataTypes} = require ("sequelize");


const sequelize = (pool && pool.sequelize) || new Sequelize('db_konseling', 'm.vithoralfaqih', '123456', {
    host: "localhost",
    dialect: "postgresql"
});
const Users = sequelize.define('users', {
   name: {
    type: DataTypes.STRING,
   },
   email: {
    type: DataTypes.STRING,
   },
   password: {
    type: DataTypes.STRING,
   },
   refresh_token: {
    type: DataTypes.STRING,
   },
   role: {
    type: DataTypes.ENUM('admin', 'siswa'),
    allowNull: false,
    defaultValue: 'siswa',
  },
},{
    //Mencegah penambahan (s) dalam nama tabel
    freezeTableName:true
});

module.exports = Users;