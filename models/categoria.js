const {Schema, model} = require('mongoose')

const categoSchema = Schema({

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
    }

})

categoSchema.methods.toJSON = function(){
    const {__v, state, ...data} = this.toObject() 
    return data
}

module.exports = model('Categoria', categoSchema)