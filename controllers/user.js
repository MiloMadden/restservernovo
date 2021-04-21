const {response} = require('express') // OPCIONAL
const User = require('../models/user')
const bcrypt = require('bcryptjs');

const usuariosGet = async(req, res = response)=>{

    //const {page = 1, limit} = req.query
    const {limite=5, desde=0} = req.query
    
    //const users = await User.find({state:true}).skip(Number(desde)).limit(Number(limite))
    //const total = await User.countDocuments({state:true})

    const [total, users] = await Promise.all([
        User.countDocuments({state:true}), 
        User.find({state:true}).skip(Number(desde)).limit(Number(limite))
    ])

    res.json({
        total,
        users
    })
}

const usuariosPost = async(req, res)=>{

    const {name, email, password, role} = req.body
    const user = new User({name, email, password, role})

    // encriptar contraseña
    const salt = bcrypt.genSaltSync(10)
    user.password = bcrypt.hashSync(password, salt)

    // guardar usuario
    const sent = await user.save()

    res.json({
        msg: 'POST request - Controller 2',
        sent
    })
}

const usuariosPut = async(req, res)=>{

    const {id} = req.params
    const {_id, password, google, email, ...resto} = req.body

    // validar en base de datos
    if(password){
        // encriptar contraseña
        const salt = bcrypt.genSaltSync(10)
        resto.password = bcrypt.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, resto, {new:true})

    res.json({
        msg: 'PUT request - Controller', 
        updated: user
    })
}

const usuariosDelete = async(req, res)=>{

    const id = req.params.id;

    // eliminar fisicamente
    //const user = await User.findByIdAndDelete(id)

    // eliminar cambiando estado a false
    const user = await User.findByIdAndUpdate(id, {state: false}, {new:true})

    res.json({
        msg: 'DELETE request - Controller',
        deleted: user
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