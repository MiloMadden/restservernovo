const {Router} = require('express')
const {check} = require('express-validator')
const router = Router()
const { 
        getCategorias, 
        getCategoria, 
        borrarCategoria, 
        updateCategoria, 
        nuevaCategoria
} = require('../controllers/categorias')

const {existeCategoria} = require('../helpers/categoria-validators')

const {validarToken, validarCampos, isAdminRole} = require('../middlewares')

// obtener todas las categorias - publico - paginado - total - populate

router.get('/', getCategorias)

// obtener una categoria por id- publico - middleware con el id / helper existe categoria
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(), 
    check('id').custom(existeCategoria), 
    validarCampos
], getCategoria)

// crear nueva categoria - privado
router.post('/', [
    validarToken, 
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], nuevaCategoria)

// actualizar categoria - put - privado
router.put('/:id', [
    validarToken,
    check('id', 'No es un id valido').isMongoId(), 
    check('id').custom(existeCategoria), 
    validarCampos
], updateCategoria)

// delete categoria - privado - admin
router.delete('/:id', [
    validarToken,
    isAdminRole,
    check('id', 'No es un id valido').isMongoId(), 
    check('id').custom(existeCategoria), 
    validarCampos
], borrarCategoria)


module.exports = router