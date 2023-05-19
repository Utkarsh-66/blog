const exp=require("express");
const mongoose=require("mongoose");
const expressLayouts = require('express-ejs-layouts');
const bodyParser=require("body-parser");
const ejs=require("ejs");
const _=require("lodash");
const path = require("path");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app=exp();

app.set("view engine","ejs");           //this is for rendering the views
app.set("views",path.join(__dirname,'/views'));
app.use(exp.static("./public"));

app.set("layout extractStyles",true)     //this is for layoutss
app.set("layout extractScripts",true);
app.use(expressLayouts);

app.use(bodyParser.urlencoded({extended:true}));   // this is for body-parser


mongoose.connect("mongodb+srv://Uttu_Gupta:uttu7434@cluster0.ne2ztao.mongodb.net/blogDB",{useNewUrlParser:true});   //pehle connecting with mongoDB
const postSchema={          //dusra making the schema
  title:String,
  content:String
};
const Post=mongoose.model("Post",postSchema); //tesra making the model


app.get("/",function(req,res){
  Post.find()
    .then(function(data){
      res.render("home",{startingcontent:homeStartingContent,newPosts:data});
    });
});
app.get("/about",function(req,res){
  res.render("about",{aboutcontent:aboutContent})
});
app.get("/contact",function(req,res){
    res.render("contact",{contactcontent:contactContent})
});
app.get("/compose",function(req,res){
    res.render("compose")
});

app.get("/:postName", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  Post.findOne({ title: req.params.postName })
    .then(function(data) {
      if (data) {
        res.render("post", { title: data.title, content: data.content });
      } else {
        res.send("Post not found");
      }
    });
});

app.post("/compose",function(req,res){
   const post=new Post({
     title:req.body.postTitle,
     content:req.body.postBody
   });
   post.save()
     .then(function(){
       res.redirect("/");
     });
});

app.listen(3000,function(){
  console.log("Server started on port 3000");
});
