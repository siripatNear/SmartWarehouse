const { Router } = require('express');
const {
    login,
    protected,
    logout,
} = require('../controllers/auth');
const { validationMiddleware } = require('../middlewares/validations-middleware');
const { loginValidation } = require('../validators/auth');
const { userAuth } = require('../middlewares/auth-middleware');
const { dropDownList } = require('../controllers/data');
const router = Router();

router.get('/protected', userAuth, protected);
router.post('/login', loginValidation, validationMiddleware ,login);
router.get('/logout', userAuth, logout);

//dropdown list
router.get('/dropdown', dropDownList)

module.exports = router;