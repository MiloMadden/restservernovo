const {Router} = require('express')
const {check} = require('express-validator')
const {login, googleS} = require('../controllers/auth')
const {validarCampos} = require('../middlewares/validarCampos')
const router = Router()

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(), 
    validarCampos
], login)

router.post('/google', [
    check('id_token', 'El token es obligatorio').not().isEmpty(), 
    validarCampos
], googleS)

module.exports = router