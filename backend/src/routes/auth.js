const { Router } = require('express');
const {
    getUsers,
    addUser,
    login,
    protected,
    logout,
} = require('../controllers/auth');
const { validationMiddleware } = require('../middlewares/validations-middleware');
const { registerValidation, loginValidation } = require('../validators/auth');
const { userAuth, authPage } = require('../middlewares/auth-middleware');
const { getZonesData, getForm, fetchItems } = require('../controllers/getData');
const router = Router();

router.get('/protected', userAuth, protected);
router.post('/login', loginValidation, validationMiddleware ,login);
router.get('/logout', userAuth, logout);

//Admin routes
router.post('/add-user', registerValidation, validationMiddleware, addUser);
router.get('/add-user', userAuth, authPage(["Admin"]), getForm);
router.get('/get-users', userAuth, getUsers);

router.get('/warehouse/:id',userAuth, authPage(["Admin", "Operator"]), getZonesData)

//operator routes
router.get('/warehouse/:wh_id/:zone_id',userAuth, authPage(["Operator"]), fetchItems)

module.exports = router;