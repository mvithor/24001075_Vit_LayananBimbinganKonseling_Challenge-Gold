const {Router} = require("express");
const { getStudents,
        getStudentsAll, 
        getStudentsById, 
        updateStudent, 
        deleteStudent, 
        deleteAllStudent, 
    } = require('../controller/siswaController');
const protectDashboard = require ('../middleware/protectDashboard')

const router = Router();


router.get("/",getStudents);
router.get("/count",getStudentsAll);
router.get('/:id', getStudentsById);
router.put('/:id', updateStudent)
router.delete("/:id", deleteStudent);
router.delete("/", deleteAllStudent);

module.exports = router;