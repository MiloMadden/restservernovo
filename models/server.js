const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const {dbConnection} = require('../database/config')

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.authPath = '/api/auth'

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
    }

    async conectarDB(){
        dbConnection()
    }

    routes(){

        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usuariosPath, require('../routes/user'))

    }



    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`App running in port ${this.port}`)
        })
    }

}

module.exports = Server