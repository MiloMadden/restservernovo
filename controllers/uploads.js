const {subirArchivo} = require('../helpers/subir-archivo')
const User = require('../models/user')
const Producto = require('../models/producto')
const path = require('path')
const fs = require('fs')
//=================CLOUDINARY=========================
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

//====================================================

const cargarArchivo = async(req, res)=>{

    try {
        const nombreArchivo = await subirArchivo(req.files, undefined, 'imagenes')

        res.json({
            nombre: nombreArchivo
        })
        
    } catch (error) {
        res.status(400).json({
            error
        })
    }

}
//=======================================================
const actualizarArchivo = async(req, res)=>{

    const {collection, id} = req.params;

    let modelo;

    switch(collection){

        case 'users': 
            modelo = await User.findById(id)

            if(!modelo){
                return res.status(400).json({
                    msg: 'No existe el usuario'
                })
            }

            break;

        case 'products':
            modelo = await Producto.findById(id)

            if(!modelo){
                return res.status(400).json({
                    msg: 'No existe el producto'
                })
            }

            break;
        default: 
            return res.status(500).json({
                msg: 'Se me olvido validar esto'
            })
    }

    // limpiar imagenes previas
    if(modelo.image){

        // borrar imagen del servidor
        const pathImage = path.join(__dirname, '../uploads/', collection, modelo.image)

        if(fs.existsSync(pathImage)){
            fs.unlinkSync(pathImage)
        }

    }

    const nombre = await subirArchivo(req.files, undefined, collection)
    modelo.image = nombre;

    await modelo.save()


    res.json({
        modelo
    })

}

//======================================================================
const actualizarArchivoCloudinary = async(req, res)=>{

    const {collection, id} = req.params;

    let modelo;

    switch(collection){

        case 'users': 
            modelo = await User.findById(id)

            if(!modelo){
                return res.status(400).json({
                    msg: 'No existe el usuario'
                })
            }

            break;

        case 'products':
            modelo = await Producto.findById(id)

            if(!modelo){
                return res.status(400).json({
                    msg: 'No existe el producto'
                })
            }

            break;
        default: 
            return res.status(500).json({
                msg: 'Se me olvido validar esto'
            })
    }

    // limpiar imagenes previas
    if(modelo.image){

        const nombreArr = modelo.image.split('/')
        const nombre = nombreArr[nombreArr.length -1]
        const [publicId] = nombre.split('.')

        await cloudinary.uploader.destroy(publicId)


    }

    console.log(req.files.archivo)
    const {tempFilePath} = req.files.archivo

    const {secure_url} = await cloudinary.uploader.upload(tempFilePath)

    modelo.image = secure_url;

    await modelo.save()

    res.json({
        modelo
    })
    

}

//======================================================================

const getArchivo = async(req, res)=>{

    const {collection, id} = req.params

    let modelo;

    switch(collection){

        case 'users': 
            modelo = await User.findById(id)

            if(!modelo){
                return res.status(400).json({
                    msg: 'No existe el usuario'
                })
            }

            break;

        case 'products':
            modelo = await Producto.findById(id)

            if(!modelo){
                return res.status(400).json({
                    msg: 'No existe el producto'
                })
            }

            break;
        default: 
            return res.status(500).json({
                msg: 'Se me olvido validar esto'
            })
    }

    if(modelo.image){

        // borrar imagen del servidor
        const pathImage = path.join(__dirname, '../uploads/', collection, modelo.image)

        if(fs.existsSync(pathImage)){
            return res.sendFile(pathImage)
        }

    }

    const pathImage = path.join(__dirname, '../assets/no-image.jpg')

    res.sendFile(pathImage)

}

module.exports = {
    cargarArchivo, 
    actualizarArchivo, 
    getArchivo, actualizarArchivoCloudinary
}