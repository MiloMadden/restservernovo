const {User, Producto, Categoria} = require('../models')
const {ObjectId} = require('mongoose').Types;

const coleccionesPermitidas = [
    'users', 
    'productos', 
    'roles', 
    'categorias'
]

const buscarUsuario = async(term, res)=>{
    
    const isMongoId = ObjectId.isValid(term)

    if(isMongoId){
        const usuario = await User.findById(term)

        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regEx = new RegExp(term, 'i')
    const usuario = await User.find({
        $or: [{name: regEx}, {email: regEx}], 
        $and: [{state: true}]
    })

    res.json({
        results: usuario
    })
}

const buscarProducto = async(term, res)=>{

    const isMongoId = ObjectId.isValid(term)

    if(isMongoId){
        const producto = await Producto.findById(id)
                            .populate('categoria', 'name')
                            .populate('user', 'name')

        return res.json({
            results: (producto) ? [producto] : []
        })
    }

    const regEx = new RegExp(term, 'i')
    const producto = await Producto.find({
        $and: [{name: regEx}, {state:true}]
    }).populate('categoria', 'name')
      .populate('user', 'name')

    res.json({
        results: producto
    })

}

const buscarCategoria = async(term, res)=>{

    const isMongoId = ObjectId.isValid(term)

    if(isMongoId){
        const categoria = await Categoria.findById(term)

        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regEx = new RegExp(term, 'i')
    const categoria = await Categoria.find({
        $and: [{name: regEx}, {state:true}]
    })

    res.json({
        results: categoria
    })

}

const buscar = (req, res)=>{

    const {collection, term} = req.params

    if(!coleccionesPermitidas.includes(collection)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch(collection){
        case 'users':
            buscarUsuario(term, res)
            break;
        case 'categorias':
            buscarCategoria(term, res)
            break;
        case 'productos':
            buscarProducto(term, res)
            break;
        default: 
            res.status(500).json({
                msg: 'Se me olvido hacer esta ruta'
            })
    }

}

module.exports = {
    buscar
}