const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const {dbConnection} = require('../database/config')
const fileUpload = require('express-fileupload')

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.authPath = '/api/auth'
        this.caterogiasPath = '/api/categorias'
        this.productosPath = '/api/productos'
        this.buscarPath = '/api/buscar'
        this.uploadPath = '/api/uploads'

        // connect
        this.conectarDB()

        // middlewares
        this.middlewares()

        //routes
        this.routes()

    }

    middlewares(){

        //CORS
        this.app.use( cors() )

        // express json
        this.app.use(express.json())

        // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: false }))
 
        // parse application/json
        this.app.use(bodyParser.json())
        //this.app.use(express.json())

        //Public Folder
        this.app.use(express.static('public'))

        // Note that this option available for versions 1.0.0 and newer. 
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/', 
            createParentPath: true
        }));
    }

    async conectarDB(){
        dbConnection()
    }

    routes(){

        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usuariosPath, require('../routes/user'))
        this.app.use(this.caterogiasPath, require('../routes/categorias'))
        this.app.use(this.productosPath, require('../routes/productos'))
        this.app.use(this.buscarPath, require('../routes/buscar'))
        this.app.use(this.uploadPath, require('../routes/uploads'))

    }



    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`App running in port ${this.port}`)
        })
    }

}

module.exports = Server