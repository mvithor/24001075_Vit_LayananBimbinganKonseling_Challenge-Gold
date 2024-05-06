const pool = require('../config/connection');
const queries = require('../model/profileModel');

const getProfile = async (req, res) => {
    try {
        // Dapatkan ID pengguna yang login
        const id = req.users._id;
        const user = await pool.query (queries.getProfile, [id]);

        res.render ('profile/profileGet', {
            user: user.rows[0],
            layout : 'layouts/profile-layout',
            title  : 'Profile'
        })
    } catch (error) {
        
    }
}

module.exports = {
    getProfile,
}