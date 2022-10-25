const { Router } = require('express');
const router = Router();

const {
    getUsers,
    addUser,
    getUserByID,
    updateUser,
    deleteUser,
} = require('../controllers/auth');
const { registerValidation } = require('../validators/auth');
const { userAuth, authPage } = require('../middlewares/auth-middleware');
const { getZonesData, getForm, fetchItems, createOrder } = require('../controllers/data');
const { validationMiddleware } = require('../middlewares/validations-middleware');

router.get('/warehouse/:id',userAuth, authPage(["Admin", "Operator"]), getZonesData)

//Admin routes
router.get('/add-user', userAuth, authPage(["Admin"]), getForm);
router.post('/add-user', registerValidation, validationMiddleware, addUser);
router.get('/manage-users', userAuth, authPage(["Admin"]), getUsers);
router.get('/edit-user/:user_id', userAuth, authPage(["Admin"]), getForm, getUserByID);
router.put('/edit-user/:user_id', validationMiddleware, updateUser);
router.delete('/manage-users/:user_id', deleteUser);

//operator routes
router.get('/:wh_id/:zone_id',userAuth, authPage(["Operator"]), fetchItems)
router.get('/create-order', createOrder)

module.exports = router;
