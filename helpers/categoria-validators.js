
const Categoria = require('../models/categoria')

const existeCategoria = async (id)=>{

    const categoria = await Categoria.findById(id)

    if(!categoria){
        throw new Error('No existe la categoria que buscas')
    }else{
        if(!categoria.state){
            throw new Error(`La categoria ${categoria.name}, ha sido eliminada`)
        }
    }

}

module.exports = {
    existeCategoria
}