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
const { getZonesData } = require('../controllers/getData');
const router = Router();

router.get('/get-users', getUsers);
router.post('/add-user', registerValidation, validationMiddleware, addUser);
router.get('/protected', userAuth, protected);
router.post('/login', loginValidation, validationMiddleware ,login);
router.get('/logout', userAuth, logout);

router.get('/warehouse/:id',userAuth, authPage(["Admin", "Operator"]), getZonesData)

module.exports = router;