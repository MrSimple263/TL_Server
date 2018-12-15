var express=require('express');
var app=express();
var cors = require('cors');
app.use(cors());
app.listen(3001,(err)=>{
    console.log('server is running');
})
var router_user=require('./Controller/user');
var router_post=require('./Controller/post');
app.use('/user',router_user);
app.use('/post',router_post);