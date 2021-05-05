
const validarArchivoSubir = (req, res, next)=>{

    if(!req.files || Object.keys(req.files).length === 0 || !req.files.archivo){
        
        return res.status(400).json({
            msg: 'Ningun archivo se ha subido'
        })
    }

    next()

}

module.exports = {
    validarArchivoSubir
}