const {response} = require('express') // OPCIONAL

const usuariosGet = (req, res = response)=>{

    const {page = 1, limit} = req.query

    res.json({
        msg: 'GET request - Controller', 
        page, 
        limit
    })
}

const usuariosPost = (req, res)=>{

    const {nombre, apellido} = req.body

    res.json({
        msg: 'POST request - Controller', 
        nombre, 
        apellido
    })
}

const usuariosPut = (req, res)=>{

    const {id} = req.params

    res.json({
        msg: 'PUT request - Controller', 
        id
    })
}

const usuariosDelete = (req, res)=>{
    res.json({
        msg: 'DELETE request - Controller'
    })
}

const usuariosPatch = (req, res)=>{
    res.json({
        msg: 'PATCH request - Controller'
    })
}

module.exports = {
    usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch
}