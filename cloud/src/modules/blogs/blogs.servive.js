import { Blog } from "../../DB/models/Blog.model.js"
import { UserModel } from "../../DB/models/User.model.js"
import { errorHandling, successResponse } from "../../utils/response.js"
export const listBlog= async(req,res,next)=>{
    try {
      const blogs=await Blog.findAll({
        include:[{

            model:UserModel,
            attributes:['fullName','email']
        }
        ]
      })
        return successResponse({res,status:201,data:{blogs}})
    } catch (error) {
        return errorHandling({res,error})
    }
}
export const createBlog= async(req,res,next)=>{
    try {
        const {title,content,userId}=req.body
        const user=await UserModel.findByPk(userId)
        if(!user){
           return successResponse({res,message:"in-valid blog owner",status:404})
        }
        const blog=new Blog({title,content,b_author_id:userId})
        await blog.checkUser(userId)
        await blog.save()
        return successResponse({res,status:201,data:{blog}})
    } catch (error) {
        return errorHandling({res,error})
    }
}