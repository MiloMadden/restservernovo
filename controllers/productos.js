
const Producto = require('../models/producto')

const getProductos = async(req, res)=>{

    const {limite=5, desde=0} = req.query

    try {

        const [productos, total] = await Promise.all([
            await Producto.find({state:true}).populate('user', 'name').populate('categoria', 'name').skip(Number(desde)).limit(Number(limite)), 
            await Producto.countDocuments({state:true})
        ])
    
        res.json({
            total, 
            productos
        })
        
    } catch (err) {
        return res.status(400).json({
            error: err.message
        })
    }

}

const getProducto = async(req, res)=>{

    const {id} = req.params;

    try {

        const producto = await Producto.findById(id).populate('user', 'name').populate('categoria', 'name')

        res.json({
            producto
        })
        
    } catch (err) {
        return res.status(400).json({
            error: err.message
        })
    }

}

const crearProducto = async(req, res)=>{

    const {name, price, description, categoria} = req.body

    const user = req.user.id;

    try {

        const producto = new Producto({
            name, price, description, categoria, user
        })
    
        const productoDB = await producto.save()
    
        res.json({
            producto: productoDB
        })
        
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }

}

const updateProducto = async(req, res)=>{

    const {id} = req.params
    const {name, description, price, categoria} = req.body

    try {
        
        const producto = await Producto.findByIdAndUpdate(id, {name, description, price, categoria}, {new:true})

        res.json({
            producto
        })

    } catch (err) {
        return res.status(400).json({
            error: err.message
        })
    }

}

const deleteProducto = async(req, res)=>{

    const {id} = req.params;

    try {

        const producto = await Producto.findByIdAndUpdate(id, {state: false}, {new:true})
                                .populate('user', 'name').populate('categoria', 'name')
        
        res.json({
            producto
        })

    } catch (err) {
        return res.status(400).json({
            error: err.message
        })
    }

}

module.exports = {
    getProducto, getProductos, crearProducto, deleteProducto, updateProducto
}