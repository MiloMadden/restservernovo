
const {Categoria} = require('../models/')

const getCategorias = async(req, res)=>{

    const {limite=5, desde=0} = req.query

    const [categorias, total] = await Promise.all([
        Categoria.find({state: true}).populate('user', 'name').skip(Number(desde)).limit(Number(limite)),
        Categoria.countDocuments({state:true})
    ])
    
    res.json({
        categorias, 
        total
    })
}

const getCategoria = async(req, res)=>{

    const {id} = req.params;

    try {

        const categoria = await Categoria.findById(id).populate('user', 'name')
  
        /*if(!categoria.state){
            return res.status(404).json({
                msg: 'La categoria que buscas ha sido borrada'
            })
        }*/

        res.json({
            categoria
        })
        
    } catch (error) {
        
        return res.status(400).json({
            error: error.message       
        })
    }

}

const nuevaCategoria = async(req, res)=>{

    const name = req.body.name.toUpperCase()

    const categoriaDB = await Categoria.findOne({name})

    if(categoriaDB){
        return res.status(400).json({
            msg: `la categoria ${name} ya existe`
        })
    }

    const categoria = new Categoria({
        name, 
        user: req.user.id
    })

    const creada = await categoria.save()

    res.json({
        categoria: creada
    })
}

const updateCategoria = async(req, res)=>{

    const {id} = req.params;
    const {state, user, ...data} = req.body;

    data.name = data.name.toUpperCase()
    data.user = req.user.id

    try {

        const categoriaUpdated = await Categoria.findByIdAndUpdate(id, {name: data.name, user: data.user}, {new:true})

        res.json({
            categoria: categoriaUpdated
        })
        
    } catch (error) {
        return res.status(400).json({
            error: error.message       
        })
    }

}

const borrarCategoria = async(req, res)=>{

    const {id} = req.params;

    try {
    
        const categoriaBorrada =  await Categoria.findByIdAndUpdate(id, {state:false}, {new: true})

        res.json({
            categoria: categoriaBorrada
        })

    } catch (err) {
        return res.status(500).json({
            ok: false, 
            error: err.message
        })
    }

}

module.exports = {
    getCategorias, 
    getCategoria, 
    nuevaCategoria, 
    updateCategoria, 
    borrarCategoria
}