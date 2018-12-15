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
//upload môt bai viet
router.post('/upload',(req,res)=>{
    var title=req.body.title;
    var des=req.body.des;
    var content=req.body.content;
    var view=req.body.view;
    var category=req.body.category;
    var user=req.body.user;
    var state=req.body.state;
    var img=req.body.img;
    var query='call post_insert(?,?,?,?,?,?,?,?)';
    connection.query(query,
        [title,des,content,view,category,user,state,img],
        function (error, results, fields) {
        if (error) throw error;
        res.send("insert sucessful");
      });
})
//xem mot bai viet
router.post('/load_post',(req,res)=>{
    var id=req.body.id;
    console.log(id);
    var query='call load_post(?)';
    connection.query(query,
        [id],
        function (error, results, fields) {
        if (error) throw error;
        res.json(results);
      });
      //storeproduce
//       CREATE DEFINER=`root`@`localhost` PROCEDURE `load_post`(pid int)
// BEGIN
// 	select POST.id,POST.title,POST.des,POST.content,POST.time,POST.view,USER.name
//     from POST inner join USER on POST.user=USER.id
// 	where POST.id=pid;
// END
})
//top 5 bai moi nhat
router.get('/newest',(req,res)=>{
    var query='call new_top_5()';
    connection.query(query,
        [],
        function (error, results, fields) {
        if (error) throw error;
        res.json(results);
      });
})
//top 4 bai viet luot view cao nhat
router.get('/viewest',(req,res)=>{
    var query='call view_top_4()';
    connection.query(query,
        [],
        function (error, results, fields) {
        if (error) throw error;
        res.json(results);
      });
})
//top 4 bai xem nhieu nhat
router.get('/viewest',(req,res)=>{
    var query='call view_top_4()';
    connection.query(query,
        [],
        function (error, results, fields) {
        if (error) throw error;
        res.json(results);
      });
})
//tang 1 luot xem cho bai viet
router.post('/incview',(req,res)=>{
    var postid=req.body.postid;
    var query='call inc_view(?);';
    connection.query(query,
        [postid],
        function (error, results, fields) {
        if (error) throw error;
        res.json(results);
      });
})

module.exports=router;