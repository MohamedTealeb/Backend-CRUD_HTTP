import { UserModel } from "../../DB/models/User.model.js"
import { errorHandling, successResponse } from "../../utils/response.js"


export const signup=async(req,res,next)=>{
   try {
    const {fullName,email,password}=req.body
    // const user=await UserModel.create({
    //     fullName,
    //     email,
    //     password,
       
    // },{validate:true})


    // const {fullName,email,password}=req.body
    // const user=await UserModel.bulkCreate(req,body.users,{
    //     validate:true,
    //     fields:['fullName','email','password']
    // })

   //  const {fullName,email,password}=req.body
   //  const user=await UserModel.upsert(req,body)
   // const checkUser=await UserModel.findOne({where:{email:req.body.email}})
   // if(checkUser){
   //    return successResponse({res,message:'user already exists',status:409})
   // }
   // const user=await UserModel.create(req.body,{
   //    validate:true,
   //    fields:['fullName','email','password']
   // })

   const user=await UserModel.findOrCreate({
    where:{email},
    defaults:req.body
   })
    return user[1]? successResponse({res,status:201,data:{user}}):
    successResponse({res,message:'user already exists',status:409})
   } catch (error) {
   return errorHandling({res,error})
   }
}

export const login= async(req,res,next)=>{
   try{
      const {email,password}=req.body
      const user =await UserModel.findOne({
         where:{
            email,
            password
         },
      })
      return user?successResponse({res,status:200,data:{user}}):
      successResponse({res,message:"invalid email or password",status:404})
   }catch(error){
      return errorHandling({error,res})
   }
}