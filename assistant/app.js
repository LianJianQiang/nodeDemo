/**
 * Created by lian on 2017/11/24.
 */
var express = require('express');
var app=express();
var path=require('path');

var looger=require('morgan');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var superAgent=require('superagent');
var cheerio=require('cheerio');


var routes=require('./routers/index');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');

app.use(looger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

app.use('/',routes);

app.listen(3000,function (req,res) {
    console.log('listen 3000 ...');
});
