const validarCampos = require('../middlewares/validarCampos')
const validarToken = require('../middlewares/validarJWT')
const validarRoles = require('../middlewares/validarRoles')

module.exports = {
    ...validarCampos, 
    ...validarToken, 
    ...validarRoles
}