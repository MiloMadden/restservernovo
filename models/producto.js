const {Schema, model} = require('mongoose')

const productoSchema = Schema({

    name: {
        type: String,
        required: [true, 'El nombre de categoria es obligatorio'], 
        unique: true
    }, 
    state: {
        type: Boolean, 
        required: true, 
        default: true
    }, 
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }, 
    price: {
        type: Number, 
        default: 0
    }, 
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria', 
        require: true
    }, 
    description: {
        type: String
    }, 
    available: {
        type: Boolean, 
        default: true
    }, 
    image: {
        type: String
    }

})

productoSchema.methods.toJSON = function(){
    const {__v, state, ...data} = this.toObject() 
    return data
}

module.exports = model('Producto', productoSchema)