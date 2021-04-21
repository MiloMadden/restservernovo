const mongoose = require('mongoose')

const dbConnection = async ()=>{

    try {

        await mongoose.connect(process.env.MONGODB1, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log('base de datos online')
        
    } catch (error) {
        console.log('error de conexion')
        throw new Error('Error en base de datos')
    }

}

module.exports = {
    dbConnection
}