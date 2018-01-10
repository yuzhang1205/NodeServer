"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var Product = /** @class */ (function () {
    function Product(Id, Music, Singer, Rating, Description, Categories) {
        this.Id = Id;
        this.Music = Music;
        this.Singer = Singer;
        this.Rating = Rating;
        this.Description = Description;
        this.Categories = Categories;
    }
    return Product;
}());
exports.Product = Product;
var Comment = /** @class */ (function () {
    function Comment(id, productId, timestamp, user, rating, content) {
        this.id = id;
        this.productId = productId;
        this.timestamp = timestamp;
        this.user = user;
        this.rating = rating;
        this.content = content;
    }
    return Comment;
}());
exports.Comment = Comment;
var comments = [
    new Comment(1, 1, '2017-12-19', 'zy', 3, 'nice music,挺好听的歌曲。'),
    new Comment(2, 2, '2017-12-20', 'yy', 4, 'nice things,东西不错。'),
    new Comment(3, 1, '2017-12-19', 'zy', 2, 'nice things,好听。'),
    new Comment(4, 2, '2017-12-19', 'zy', 5, 'nice things,东西不错。')
];
var products = [
    new Product(1, '夜曲', 'Jay', 5, 'Jay Music', ['流行', '酷炫']),
    new Product(2, '浪漫手机', 'Jay', 4.5, 'Jay Music', ['流行', '浪漫']),
    new Product(3, '断桥残雪', 'Vae', 3.5, 'Vae Music', ['流行', '古典']),
    new Product(4, '杀手', 'JJ', 5, 'JJ Music', ['快歌', '流行']),
    new Product(5, '不为谁而作的歌', 'JJ', 4.5, 'JJ Music', ['流行', '快歌']),
    new Product(6, '三国杀', '汪苏泷', 2.5, '汪苏泷 Music', ['古典', '快歌'])
];
var app = express();
app.use('/', express.static(path.join(__dirname, '..', 'client')));
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' spark');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get("/api/products", function (request, response) {
    /*let params=request.query;
    console.log(params);
    response.send(products);*/
    var result = products;
    var params = request.query;
    if (params.Music) {
        result = result.filter(function (p) { return p.Music.indexOf(params.Music) !== -1; });
    }
    if (params.Singer && result.length > 0) {
        result = result.filter(function (p) { return p.Singer.indexOf(params.Singer) !== -1; });
    }
    if (params.Category && params.Category !== '-1' && result.length > 0) {
        result = result.filter(function (p) { return p.Categories.indexOf(params.Category) !== -1; });
    }
    response.send(result);
});
app.get("/api/products/:id", function (request, response) {
    response.json(products.find(function (product) { return product.Id == request.params.id; }));
});
app.get("/api/products/:id/comments", function (req, res) {
    res.json(comments.filter(function (conmment) { return conmment.productId == req.params.id; }));
});
var server = app.listen(8000, "localhost", function () {
    console.log("HTTP server is running");
});
/*const wsServer=new  Server({port:8085});
wsServer.on("connection",websocket=>{
    websocket.send("webSocket is running");
    websocket.on("message",message=>{
        console.log("接收到消息： "+message);
    })
});*/
/*
setInterval(()=>{
    if(wsServer.clients){
        wsServer.clients.forEach((client)=>{
            client.send("服务器的定时发送.");
        })
    }
},2000);*/
