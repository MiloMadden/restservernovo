const {validarCampos} = require('../middlewares/validarCampos')
const {Router} = require('express')
const {esRoleValido, emailExiste, existeUsuarioPorId} = require('../helpers/db-validators')
const router = Router()
const {usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch} = require('../controllers/user')
const {check} = require('express-validator')

router.get('/', usuariosGet)

router.post('/', [
    check('email', 'Ingresa un email valido').isEmail(),
    check('email').custom(email => emailExiste(email)), // se puede solo .custom(emailExiste)
    check('name', 'El nombre es obligatorio').not().isEmpty(), 
    check('password', 'El password debe tener 6 caracteres').isLength({min: 6}), 
    //check('role', 'No es un rol permitido').isIn(['ADMIN', 'USER']), 
    check('role').custom(role => esRoleValido(role)), // se puede solo .custom(esRoleValido)
    validarCampos
],usuariosPost)

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(), 
    check('id').custom(existeUsuarioPorId),
    //check('role').custom(role), Tambien se puede
    validarCampos
], usuariosPut)

router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(), 
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router  