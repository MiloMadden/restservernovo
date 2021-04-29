const {Router} = require('express')
const {check} = require('express-validator')
const {validarToken, validarCampos, isAdminRole} = require('../middlewares')
const {existeProducto, productoPorId} = require('../helpers/producto-validators')
const {existeCategoria} = require('../helpers/categoria-validators')
const {
        getProducto, 
        getProductos, 
        crearProducto, 
        deleteProducto, 
        updateProducto
} = require('../controllers/')

const router = Router()

router.get('/', getProductos )
router.get('/:id', [
     check('id', 'Inserta un id de producto').not().isEmpty(),
     check('id', 'no es un id de mongo').isMongoId(),
     check('id').custom(productoPorId),
     validarCampos
], getProducto)
router.post('/', [
     validarToken, 
     check('name', 'El nombre del producto es obligatorio').not().isEmpty(),
     check('name').custom(existeProducto), 
     check('categoria', 'Inserta una categoria valida').not().isEmpty(),
     check('categoria', 'no es un id de mongo').isMongoId(), 
     check('categoria').custom(existeCategoria),
     check('price', 'Inserta el precio').not().isEmpty(), 
     check('description', 'Inserta la descripcion').not().isEmpty(),
     validarCampos   
], crearProducto)
router.put('/:id', [
        validarToken, 
        check('id', 'Inserta un id de producto').not().isEmpty(),
        check('id', 'no es un id de mongo').isMongoId(),
        check('id').custom(productoPorId),
        check('categoria', 'Inserta una categoria valida').not().isEmpty(),
        check('categoria').isMongoId(), 
        check('categoria').custom(existeCategoria),
        check('name', 'El nombre del producto es obligatorio').not().isEmpty(),
        check('price', 'Inserta el precio').not().isEmpty(), 
        check('description', 'Inserta la descripcion').not().isEmpty(),
        validarCampos
], updateProducto)
router.delete('/:id', [
        validarToken, 
        isAdminRole, 
        check('id', 'inserta un id de producto').not().isEmpty(), 
        check('id', 'no es un id de mongo').isMongoId(),
        check('id').custom(productoPorId),
        validarCampos
], deleteProducto)

module.exports = router