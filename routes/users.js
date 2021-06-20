const {Router} = require('express');
const { getUsers, putUsers, postUsers, deleteUsers } = require('../controllers/users');

const router = Router();


router.get('/',getUsers);
router.put('/:id',putUsers);
router.post('/',postUsers);
router.delete('/',deleteUsers);




module.exports= router;