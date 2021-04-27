const User = require('../models/user')
const bcrypt = require('bcryptjs')
const {generarJWT} = require('../helpers/generartoken')
const {googleVerify} = require('../helpers/google-verify')

const login = async(req, res)=>{

    const {email, password} = req.body;

    try {

        // verificar si el email existe
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                msg: 'No existe el usuario'
            })
        }

        // verificar si esta activo
        if(!user.state){
            return res.status(400).json({
                msg: 'Usuario no esta activo'
            })
        }

        // verificar contraseña
        const validPassword = bcrypt.compareSync(password, user.password)
        if(!validPassword){
            return res.status(400).json({
                msg: 'La contraseña es incorrecta'
            })
        }

        // generar JWT

        const token = await generarJWT(user._id)

        res.json({
            user, 
            token
        })
        
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            error: err.message
        })
    }


}

const googleS = async(req, res)=>{

    const {id_token} = req.body;

    try {

        const {email, name, image} = await googleVerify(id_token)

        let user = await User.findOne({email})

        if(!user){

            // create

            const data = {
                name, 
                email, 
                password: ':)', 
                google: true, 
                image
            }


            user = new User(data)
            await user.save()

        }

        if(!user.state){
            return res.status(401).json({
                msg: 'Usuario borrado'
            })
        }

        // generar JWT

        const token = await generarJWT(user._id)

        res.json({
            user,
            token
        })


        
    } catch (error) {
        
        res.status(400).json({
            msg: 'Token de google no valido', 
            error: error.message
        })

    }

}

module.exports = {
    login, googleS
}