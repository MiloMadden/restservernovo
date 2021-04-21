const Role = require('../models/role')
const User = require('../models/user')

const esRoleValido = async(role)=>{

    const existeRole = await Role.findOne({role})
    if(!existeRole){
        throw new Error(`El rol ${role} no es valido`)
    }

}

const emailExiste = async(email)=>{

    // verificar si correo existe
    const existeEmail = await User.findOne({email})

    if(existeEmail){
        throw new Error(`El email ${email}, ya fue creado`)
    }

}

const existeUsuarioPorId = async(id)=>{

    const existeUsuario = await User.findById(id)

    if(!existeUsuario){
        throw new Error('El usuario que buscas no existe')
    }

}

module.exports = {
    esRoleValido, 
    emailExiste, 
    existeUsuarioPorId
}