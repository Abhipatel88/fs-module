 const express = require('express');
const app =express();
const path=require('path')
const fs =require('fs');
const { log } = require('console');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine','ejs');


app.get("/", function(req, res){
    fs.readdir("./files" , function(err,files){

        res.render("index",{files:files});
    })
});

app.post("/create", function(req, res){
    fs.writeFile(`./files/${req.body.title}.txt` , req.body.details , function(err){
        res.redirect("/")
    })
});
app.get("/files/:filename" ,function(req,res){
    fs.readFile(`files/${req.params.filename}`,"utf-8", function(err,filedata){
        res.render("show", {file:req.params.filename, det:filedata});    
    })
})

app.get("/edit/:file" ,function(req,res){
    
        res.render("edit", {file:req.params.file});    
    
})
app.post("/edit",function(req,res){
    fs.rename(`./files/${req.body.Previous}`,`./files/${req.body.new}`, function(err){
        res.redirect("/");
        // console.log(req.body)
    })
})
app.listen(3000, function(){
    console.log("server is running");
});
