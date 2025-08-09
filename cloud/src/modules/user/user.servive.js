import { Blog } from "../../DB/models/Blog.model.js"
import { UserModel } from "../../DB/models/User.model.js"
import { errorHandling,successResponse } from "../../utils/response.js"

export const profile=async(req,res,next)=>{
    
    try {
        //pagenation
        // const page=parseInt(req.query.page<1?1:req.query.page)
        // const size=parseInt(req.query.size<1?5:req.query/size)
        // const users =await UserModel.findAndCountAll({
        //     offset:2,
        //     limit:3
        // })

        // const users=await UserModel.findAll({
        //     attributes:{exclude :'password'},
        //     // where:{
        //     //     gender:req.query.gender,
        //         // DOB:{
        //         //     // [Op.gte]:req.query.DOB
        //         //     // [Op.ne]:null
        //         //     [open.and]:null
        //         // }
        //     // }
        // })
        const user=await UserModel.findByPk(req.params.userId,{
            paranoid:true,
            include:[{
                model:Blog,
                attributes:['title','content']
            }]

        })
        return user? successResponse({res,data:{user}}):
        successResponse({
            res,
            status:404,
            message:"invalid userid",
         
        })
    } catch (error) {
        return errorHandling({res,error})
    }
}

export const updateProfile=async(req,res,next)=>{
    
    try {
        //pagenation
        // const page=parseInt(req.query.page<1?1:req.query.page)
        // const size=parseInt(req.query.size<1?5:req.query/size)
        // const users =await UserModel.findAndCountAll({
        //     offset:2,
        //     limit:3
        // })

        // const users=await UserModel.findAll({
        //     attributes:{exclude :'password'},
        //     // where:{
        //     //     gender:req.query.gender,
        //         // DOB:{
        //         //     // [Op.gte]:req.query.DOB
        //         //     // [Op.ne]:null
        //         //     [open.and]:null
        //         // }
        //     // }
        // })
        const user=await UserModel.update(req.body,{
            where:{id:req.params.userId}
        })
        return user[0]? successResponse({res,data:{user}}):
        successResponse({
            res,
            status:404,
            message:"invalid userid",
         
        })
    } catch (error) {
        return errorHandling({res,error})
    }
}
export const freezeProfile=async(req,res,next)=>{
    
    try {
        //pagenation
        // const page=parseInt(req.query.page<1?1:req.query.page)
        // const size=parseInt(req.query.size<1?5:req.query/size)
        // const users =await UserModel.findAndCountAll({
        //     offset:2,
        //     limit:3
        // })

        // const users=await UserModel.findAll({
        //     attributes:{exclude :'password'},
        //     // where:{
        //     //     gender:req.query.gender,
        //         // DOB:{
        //         //     // [Op.gte]:req.query.DOB
        //         //     // [Op.ne]:null
        //         //     [open.and]:null
        //         // }
        //     // }
        // })
        const user=await UserModel.destroy({
            where:{id:req.params.userId}
        })
        return user? successResponse({res,data:{user}}):
        successResponse({
            res,
            status:404,
            message:"invalid userid",
         
        })
    } catch (error) {
        return errorHandling({res,error})
    }
}
export const hardDeleteProfile=async(req,res,next)=>{
    
    try {
        //pagenation
        // const page=parseInt(req.query.page<1?1:req.query.page)
        // const size=parseInt(req.query.size<1?5:req.query/size)
        // const users =await UserModel.findAndCountAll({
        //     offset:2,
        //     limit:3
        // })

        // const users=await UserModel.findAll({
        //     attributes:{exclude :'password'},
        //     // where:{
        //     //     gender:req.query.gender,
        //         // DOB:{
        //         //     // [Op.gte]:req.query.DOB
        //         //     // [Op.ne]:null
        //         //     [open.and]:null
        //         // }
        //     // }
        // })
        const user=await UserModel.destroy({
            where:{id:req.params.userId},
            force:true
        })
        return user? successResponse({res,data:{user}}):
        successResponse({
            res,
            status:404,
            message:"invalid userid",
         
        })
    } catch (error) {
        return errorHandling({res,error})
    }
}
export const restoreProfile=async(req,res,next)=>{
    
    try {
        //pagenation
        // const page=parseInt(req.query.page<1?1:req.query.page)
        // const size=parseInt(req.query.size<1?5:req.query/size)
        // const users =await UserModel.findAndCountAll({
        //     offset:2,
        //     limit:3
        // })

        // const users=await UserModel.findAll({
        //     attributes:{exclude :'password'},
        //     // where:{
        //     //     gender:req.query.gender,
        //         // DOB:{
        //         //     // [Op.gte]:req.query.DOB
        //         //     // [Op.ne]:null
        //         //     [open.and]:null
        //         // }
        //     // }
        // })
        const user=await UserModel.restore({
            where:{id:req.params.userId}
        })
        return user? successResponse({res,data:{user}}):
        successResponse({
            res,
            status:404,
            message:"invalid userid",
         
        })
    } catch (error) {
        return errorHandling({res,error})
    }
}
export const truncateusers=async(req,res,next)=>{
    
    try {
        //pagenation
        // const page=parseInt(req.query.page<1?1:req.query.page)
        // const size=parseInt(req.query.size<1?5:req.query/size)
        // const users =await UserModel.findAndCountAll({
        //     offset:2,
        //     limit:3
        // })

        // const users=await UserModel.findAll({
        //     attributes:{exclude :'password'},
        //     // where:{
        //     //     gender:req.query.gender,
        //         // DOB:{
        //         //     // [Op.gte]:req.query.DOB
        //         //     // [Op.ne]:null
        //         //     [open.and]:null
        //         // }
        //     // }
        // })
        const user=await UserModel.destroy({
         truncate:trueو,
         force:true
        })
        return user? successResponse({res,data:{user}}):
        successResponse({
            res,
            status:404,
            message:"invalid userid",
         
        })
    } catch (error) {
        return errorHandling({res,error})
    }
}