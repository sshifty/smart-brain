const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex= require('knex');

const register = require('./controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

const db =knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'februar',
      database : 'smartbrain'
    }
  });

const app= express();
const port =process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cors());
const database={
    users:[
        {
            id:"123",
            name:"John",
            password:"cookies",
            email:"john@gmail.com",
            entries:0,
            joined:new Date()
        },
        {
            id:"124",
            name:"Sally",
            password:"bananas",
            email:"sally@gmail.com",
            entries:0,
            joined:new Date()
        }
    ],
    
}

app.get('/',(req,res)=>{
    res.send("it is working ");
})
app.post('/signin',(req,res)=>{
    signin.handleSignin(req,res,db,bcrypt)
})
app.post('/register',(req,res)=>{
    register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>{
    profile.handleProfileGet(req,res,db)})
app.put('/image',(req,res)=>{
    image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{
    image.handleApiCall(req,res)})
app.listen(port,()=>{
    console.log(`app is running on port ${port}`);
});





/*
/-->res = this is working
/signin route  -->POST request, 
    gonna respond succes or fail
/register -->POSt , wanna add the data to database
    =user (that we return)
/profile/:userId -->GET =(return us)user
/image -- > PUT --> user


*/