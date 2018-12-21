var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'mydb'
});

router.get('/', (req, res) => {
    connection.query('select id from USER', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
})
//them user vao database
router.post('/insert', (req, res) => {
    var username = req.body.username;
    var userpass = req.body.userpass;
    var name = req.body.name;
    var email = req.body.email;
    var avartar = req.body.avartar;
    var phone = req.body.phone;
    var infor = req.body.infor;
    var query = "call user_insert(?,?,?,?,?,?,?)";
    connection.query(query,
        [username, userpass, name, email, avartar, phone, infor],
        function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            res.json(results);
        });
})
//lay thong tin user theo id
router.get('/:id', (req, res) => {
    res.send(req.params.id);
})
//kiem tra dang nhap
router.post('/check_login', (req, res) => {
    var username = req.body.username;
    var userpass = req.body.userpass;
    var query = "select id from USER where username=? and userpass=?";
    connection.query(query,
        [username, userpass],
        function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
})
//user clap bai viet
router.post('/clap', (req, res) => {
    var userid = req.body.userid;
    var postid = req.body.postid;
    var query = "call clap(?,?)";
    connection.query(query,
        [userid, postid],
        function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
})
//get thong tin user theo id
router.post('/user_id', (req, res) => {
    var userid = req.body.userid;
    var query = "call user_id(?)";
    connection.query(query,
        [userid],
        function (error, results, fields) {
            if (error) throw error;
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
router.post('/user_id_post', (req, res) => {
    var userid = req.body.userid;
    var query = "call user_id_post(?)";
    connection.query(query,
        [userid],
        function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    //   CREATE DEFINER=`root`@`localhost` PROCEDURE `user_id_post`(pid int)
    //   BEGIN
    //   select * 
    //   from POST
    //   where POST.user=pid;
    //   END
})
//update profile user
router.post('/update', (req, res) => {
    var userid = req.body.userid;
    var name = req.body.name;
    var avatar = req.body.avatar;
    var query = "call user_update(?,?,?)";
    connection.query(query,
        [userid, name, avatar],
        function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    // CREATE DEFINER=`root`@`localhost` PROCEDURE `user_update`(pid int, pname nvarchar(45),pavartar nvarchar(200))
    // BEGIN
    // update USER
    // set USER.name = pname, USER.avartar = pavartar
    // where id = pid;
    // END
})
//bookmark
router.post('/bookmark', (req, res) => {
    var { userid, postid } = req.body;
    var query = "select bookmark(?,?) as state";
    connection.query(query,
        [userid, postid],
        function (error, results, fields) {
            if(error) throw error;
            res.json(results);
        });
})
//delete bookmark
router.post('/delete_bookmark', (req, res) => {
    var { userid, postid } = req.body;
    var query = "call delete_bookmark(?,?)";
    connection.query(query,
        [userid, postid],
        function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            res.json(results);
        });
})
//get bookmark by userid
router.post('/user_bookmark', (req, res) => {
    var { userid } = req.body;
    var query = "call user_bookmark(?)";
    connection.query(query,
        [userid],
        function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            res.json(results);
        });
})
//check bookmark
router.post('/check_bookmark', (req, res) => {
    var { userid, postid } = req.body;
    var query = "call check_bookmark(?,?)";
    connection.query(query,
        [userid, postid],
        function (error, results, fields) {
            if(error) throw error;
            res.json(results);
        });
})
//subcrible 
router.post('/subcribe',(req,res)=>{
    var query='call subcriptions_insert(?,?,?)';
    var endpoint=req.body.endpoint;
    var auth=req.body.keys.auth;
    var p256dh=req.body.keys.p256dh;
    console.log(endpoint);
    console.log(auth);
    console.log(p256dh);
    connection.query(query,
        [endpoint,auth,p256dh], function (error, results, fields) {
        if (error) throw error;
        res.json({"ok":"ok"});
    });
})
module.exports = router;
