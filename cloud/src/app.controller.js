import authController from'./modules/auth/auth.controller.js'
import userController from'./modules/user/user.controller.js'
import blogsController from'./modules/blogs/blogs.controller.js'
import  express from "express";
import { checkDBConnection, syncDBConnection } from './DB/connection.db.js';
  const bootstrap=async()=>{
const app=express();
const port=3000
//DB
await checkDBConnection()
await syncDBConnection()
//convert json buffer data
app.use(express.json())
//app-routing
app.get('/',(req,res)=>{
    res.json({message:'hello world'})
})
app.use('/auth',authController)
app.use('/user',userController)
app.use('/blog',blogsController)
app.all('{/*dummy}',(req,res)=>{
    res.status(404).json({message:'page not found'})
})
return app.listen(port,()=>{
    console.log('listening on port',port);
})
}
export default bootstrap