
const auth = require('./auth')
const Categoria = require('./categorias')
const Producto = require('./productos')
const User = require('./user')

module.exports = {
    ...auth,
    ...Categoria, 
    ...Producto,
    ...User
}