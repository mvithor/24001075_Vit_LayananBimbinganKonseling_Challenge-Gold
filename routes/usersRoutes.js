const { Router } = require ('express');
const { getUsers, deleteUsers } = require ('../controller/Users');
const protectDashboard = require('../middleware/protectDashboard');
const router = Router();

// router.get('/', protectDashboard, getUsers);

router.get('/', getUsers);

router.delete('/:id', protectDashboard, deleteUsers);

module.exports = router;