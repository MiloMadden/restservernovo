const Producto = require('../models/producto')

const existeProducto = async(name)=>{

    const producto = await Producto.findOne({name})

    if(producto){
        throw new Error(`El producto ${name} ya existe`)
    }

}

const productoPorId = async(id)=>{

    const producto = await Producto.findById(id)

    if(!producto){
        throw new Error('No existe el producto que buscas')
    }

}

module.exports = {
    existeProducto, 
    productoPorId
}