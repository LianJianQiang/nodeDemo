var express = require('express');
var router=express.Router();

var cnBlog=require('../spiders/cnBlog');
var spiderUri=require('../spiders/config').url;

router.get('/',function(req,res){
    var page=req.query.page;
    var tab=req.query.tab;

    var requestUrl=spiderUri;
    if(page != undefined){
        requestUrl=spiderUri+'?tab='+tab+'&page='+page;
    }

    var blog=new cnBlog(requestUrl);
    blog.getData(res);

});

module.exports=router;