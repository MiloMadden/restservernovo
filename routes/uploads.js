const {Router} = require('express')
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validarCampos')
const {coleccionesPermitidas} = require('../helpers/db-validators')
const {validarArchivoSubir} = require('../middlewares/validar-archivo')
const router = Router()
const {cargarArchivo, actualizarArchivo, getArchivo, actualizarArchivoCloudinary} = require('../controllers/uploads')

router.post('/', validarArchivoSubir, cargarArchivo)
router.put('/:collection/:id', [
    validarArchivoSubir,
    check('id', 'El id no es valido').isMongoId(), 
    check('collection').custom(c=>coleccionesPermitidas(c, ['users', 'products'])), 
    validarCampos
], actualizarArchivoCloudinary)

router.get('/:collection/:id', [
    check('id', 'El id no es valido').isMongoId(), 
    check('collection').custom(c=>coleccionesPermitidas(c, ['users', 'products'])), 
    validarCampos
], getArchivo)

module.exports = router