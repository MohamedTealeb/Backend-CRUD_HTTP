export const errorHandling =({res,error})=>{
    switch(error.name){
        case 'SequelizeValidationError':
            return res.status(400).json({message:"validation error",error})
        case 'SequelizeUniqueConstraintError':
            return res.status(400).json({message:"unique constraint error",error})
        default:
            return res.status(500).json({message:"server error",error,info:error.message,stack:error.stack})
    }
}
export const successResponse =({res,status=200,message="done",data={}}={})=>{
   return res.status(status).json({message,data})
}