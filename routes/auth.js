const {Router} = require('express')
const {check} = require('express-validator')
const {login} = require('../controllers/auth')
const {validarCampos} = require('../middlewares/validarCampos')
const router = Router()

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(), 
    validarCampos
], login)

module.exports = router