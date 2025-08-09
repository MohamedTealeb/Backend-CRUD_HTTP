const mysql2=require("mysql2")
const express=require('express');
const { error } = require("console");
const app =express();
const port=3000
app.use(express.json())

 const connection=mysql2.createConnection({
    database:'blogapp',
    port:'3306',
    password:'',
    user:'root'
})

connection.connect((error)=>{
    if(error){
        console.log(`faild to connect on DB`);
    }else
    {
        console.log(`DB connected`);
    }
})



//user
app.post("/auth/signup",(req,res,next)=>{
    console.log("Request body:", req.body);
const {firstName,middleName,lastName,email,password,confirmpassword}=req.body
console.log({
    firstName,middleName,lastName,email,password,confirmpassword
});
if(password!==confirmpassword){
    return res.status(400).json({message:"password mismatch with confirmPassword"})
}
const findQuery=`SELECT * FROM USERS WHERE u_email=?`
connection.execute(findQuery,[email],(err,data)=>{
if(err){
    return res.status(500).json({message:"fail to run thiis ",err})
}if(data.length){
    return res.status(409).json({message:"Email exist "})

} 
const insertQuery =`INSERT INTO USERS (u_firstName, u_middleName, u_lastName, u_email, u_passsword)
            VALUES (?, ?, ?, ?, ?)`
connection.execute(insertQuery,[firstName,middleName,lastName,email,password],(err,data)=>{
    if(err){
        return res.status(500).json({message:"fail to run this query",err})
    }
    return res.status(201).json({message:"done",data})
})

})

})
app.post('/auth/login',(req,res,next)=>{
    const{email,password}=req.body
    const sql=`select * from users where u_email=? and u_passsword=?`
    connection.execute(sql,[email,password],(err,data)=>{
if(err){
    return res.status(500).json({message:"fail to run ",err})
}
if(data.length===0){
    return res.status(404).json({message:"in-valid email or password"})
}
return res.json({message:"done",data})
    })
})
app.get('/user/:id/profile',(req,res,next)=>{
    const id=req.params.id
    const sql=`Select concat(u_firstName , ' ', u_middleName , ' ', u_lastName) as fullName , u_email , u_id ,convert( DATEDIFF(NOW() , u_DOB) /356.5,int) as age
     from users where u_id=?`
  connection.execute(sql,[id],(err,data)=>{
    if(err){
        return res.status(500).json({message:"fail to execute this query",err})
    }
    return data.length?res.json({message:"done",data}):res.status(404).json({message:"invalid profile id"})
  })

})
app.get('/user/search',(req,res,next)=>{
    const {searchkey}=req.query
    const sql=`Select * from users where u_firstName like ? `
  connection.execute(sql,[searchkey+"%"],(err,data)=>{
    if(err){
        return res.status(500).json({message:"fail to execute this query",err})
    }
    return data.length?res.json({message:"done",data}):res.status(404).json({message:"NO result"})
  })

})
app.patch('/user/:id',(req,res,next)=>{
    const {id} =req.params
    const {DOB,firstName}=req.body
    const sql=`update users set u_DOB=? , u_firstName=? where u_id=? `
    connection.execute(sql,[DOB,firstName,id],(err,data)=>{
        if(err){
            res.status(500).json({message:"fail to execute this query",err})
        }
        return res.json({message:"done",data})
    })
})
app.delete('/user/:id',(req,res,next)=>{
    const {id}=req.params
    const sql=`delete from users where u_id=?`
    connection.execute(sql,[id],(err,data)=>{
        if(err){
            res.status(500).json({message:"fail to execute this query",err})
        }
        return data.affectedRows ? res.status(200).json({message:"done",data})
        :res.status(404).json({message:"invalid acc id"})
    })
})
//blog
app.listen(port,()=> console.log(`app listening on port ${port}`)
)