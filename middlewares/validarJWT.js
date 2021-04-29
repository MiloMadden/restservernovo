const {response} = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validarToken = async(req, res = response, next)=>{

    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const {uid} = jwt.verify(token, process.env.SECRETKEY)
        //console.log(payload)
       
        const user = await User.findById(uid)

        if(!user){
            return res.status(401).json({
                msg: 'Usuario no existe'
            })
        }

        if(!user.state){
            return res.status(401).json({
                msg: 'Usuario con estado false'
            })
        }

        //req.uid = uid
        req.user = user

        next()

    } catch (err) {
        res.status(401).json({
            msg: 'Token no valido', 
            error: err.message
        })
    }


}

module.exports = {
    validarToken
}