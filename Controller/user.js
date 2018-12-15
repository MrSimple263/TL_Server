var express=require('express');
var router=express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345',
  database : 'mydb'
});

router.get('/',(req,res)=>{
    connection.query('select id from USER', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
      });
})
//them user vao database
router.post('/insert',(req,res)=>{
    var username=req.body.username;
    var userpass=req.body.userpass;
    var name=req.body.name;
    var email=req.body.email;
    var avartar=req.body.avartar;
    var phone=req.body.phone;
    var infor=req.body.infor;
    var query="call user_insert(?,?,?,?,?,?,?)";
    connection.query(query,
        [username,userpass,name,email,avartar,phone,infor],
        function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.json(results);
      });
})
//lay thong tin user theo id
router.get('/:id',(req,res)=>{
    res.send(req.params.id);
})
//kiem tra dang nhap
router.post('/check_login',(req,res)=>{
    var username=req.body.username;
    var userpass=req.body.userpass;
    var query="select id from USER where username=? and userpass=?";
    connection.query(query,
        [username,userpass],
        function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.json(results);
      });
})
//user clap bai viet
router.post('/clap',(req,res)=>{
    var userid=req.body.userid;
    var postid=req.body.postid;
    var query="call clap(?,?)";
    connection.query(query,
        [userid,postid],
        function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.json(results);
      });
})
//bookmark cho mot bai viet
router.post('/bookmark',(req,res)=>{
    var userid=req.body.userid;
    var postid=req.body.postid;
    var query="call bookmark(?,?)";
    connection.query(query,
        [userid,postid],
        function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.json(results);
      });
})
//xoa bookmark cho bai viet
router.post('/bookmark/del',(req,res)=>{
    var userid=req.body.userid;
    var postid=req.body.postid;
    var query="call bookmark_del(?,?)";
    connection.query(query,
        [userid,postid],
        function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.json(results);
      });
})
//get thong tin user theo id
router.post('/user_id',(req,res)=>{
    var userid=req.body.userid;
    var query="call user_id(?)";
    connection.query(query,
        [userid],
        function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.json(results);
      });
//       CREATE DEFINER=`root`@`localhost` PROCEDURE `user_id`(pid int)
// BEGIN
// select * 
// from USER
// where USER.id=pid;
// END
})
//get cac bai post do user do viet
router.post('/user_id_post',(req,res)=>{
    var userid=req.body.userid;
    var query="call user_id_post(?)";
    connection.query(query,
        [userid],
        function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.json(results);
      });
    //   CREATE DEFINER=`root`@`localhost` PROCEDURE `user_id_post`(pid int)
    //   BEGIN
    //   select * 
    //   from POST
    //   where POST.user=pid;
    //   END
})
module.exports=router;