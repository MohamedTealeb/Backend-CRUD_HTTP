const fs=require("node:fs");
const http=require("node:http");

console.log(http);
 const server=http.createServer(

    (req,res)=>{
    
      const {url,method} =req
      if (url=='/users'&& method =='GET'){
    
            const users=JSON.parse(fs.readFileSync('data.json')) 
           res.setHeader('Content-Type','application/json')
            
            res.write(JSON.stringify(users))
            res.end()
      }//ans of question 4 
      else if(url=='/users'&&method=='POST'){
         let data ;
         req.on('data',(chunk)=>{
            data=JSON.parse(chunk)
         })
         req.on('end',()=>{
            const {id,name ,age ,email} =data
            const users =JSON.parse(fs.readFileSync('data.json'))
            const isUserExists=users.find((user)=>user.email==email)
            if (isUserExists) return res.end((`user with email ${email} already exists`))
               const newUser={
            id:users.length+1,
            name,
            age,
            email
               }
               users.push(newUser)
               fs.writeFileSync('data.json',JSON.stringify(users))
               res.statusCode=201
               res.write('user created successfully')
               res.end()

         })// ans of question 1 user added successfully
      } else if(url=='/users' &&method=='PATCH'){

          let data ;
            req.on('data',(chunk)=>{
               data=JSON.parse(chunk)
            })
            req.on('end',()=>{
                const {name,age,email,id}=data 
                if(!id) return res.end('id is required')
                    const users=JSON.parse(fs.readFileSync('data.json'))
                const userIndex=users.findIndex((user)=>user.id==id)
                if(userIndex<0) return res.end('user not found') 
                    if(name) users[userIndex].name=name
                 if(age) users[userIndex].age=age
                 if(email) {
                    const isUserExists=users.find((user)=>user.email==email)
                    if(isUserExists) return res.end(`user with email ${email} already exists`)
                    users[userIndex].email=email
                 }
                    fs.writeFileSync('data.json',JSON.stringify(users))
                    res.statusCode=200
                    res.write('user updated successfully')
                    res.end()

            })
      }// ans of question 2 user updated successfully
      else if (url.startsWith('/users/') && method === 'DELETE') {
    const id = parseInt(url.split('/')[2]);

    const users = JSON.parse(fs.readFileSync('data.json'));
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex < 0) {
        res.statusCode = 404;
        res.end('User not found');
    } else {
        users.splice(userIndex, 1); // حذف المستخدم
        fs.writeFileSync('data.json', JSON.stringify(users));
        res.statusCode = 200;
        res.end('User deleted successfully');
    }
} // ans 3 user delete successfully
else if (url.startsWith('/users/') && method === 'GET') {
    const id = parseInt(url.split('/')[2]);

    const users = JSON.parse(fs.readFileSync('data.json'));
    const user = users.find(user => user.id === id);

    if (!user) {
        res.statusCode = 404;
        res.end('User not found');
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(user));
    }
}


    }
 )
 server.listen(3000,()=>{
    console.log('server is running on port 3000');
    
 }) 
 // part 2 ans of question 1 
//it allows Nodejs to perform non-blocking I/O by executing callbacks when operations like file reading or HTTP requests complete

//part 2ans of question 2
//Libuv is a C library used by Node.js to provide asynchronous I/O.
//It handles the event loop, thread pool, and low-level tasks like file system and network operations behind the scenes.


