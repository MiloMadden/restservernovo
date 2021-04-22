
const isAdminRole = (req, res, next)=>{

    if(!req.user){
        return res.status(500).json({
            msg: 'no hay usuario autenticado'
        })
    }
    const {role} = req.user

    if(role !== 'ADMIN'){
        return res.status(401).json({
            msg: 'No es admin'
        })
    }else{
        next()
    }

}

const tieneRole = (...roles)=>{

    return (req, res, next)=>{

        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg: 'Rol no permitido'
            })
        }else{
            next()
        }

    }
}

module.exports = {
    isAdminRole, 
    tieneRole
}