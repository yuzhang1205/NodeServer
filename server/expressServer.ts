import * as express from 'express';
import {Server} from 'ws';
import * as path from 'path';

export class Product {
    constructor(public Id: number,
                public Music: string,
                public Singer: string,
                public Rating: number,
                public Description: string,
                public Categories: Array<string>) {
    }

}
export class Comment {
    constructor(public  id: number, public  productId: number, public timestamp: string,
                public user: string, public rating: number, public content: string) {

    }
}
const comments: Comment[] = [
    new Comment(1, 1, '2017-12-19', 'zy', 3, 'nice music,挺好听的歌曲。'),
    new Comment(2, 2, '2017-12-20', 'yy', 4, 'nice things,东西不错。'),
    new Comment(3, 1, '2017-12-19', 'zy', 2, 'nice things,好听。'),
    new Comment(4, 2, '2017-12-19', 'zy', 5, 'nice things,东西不错。')
];

const products: Product[] = [
    new Product(1, '夜曲', 'Jay', 5, 'Jay Music', ['流行', '酷炫']),
    new Product(2, '浪漫手机', 'Jay', 4.5, 'Jay Music', ['流行', '浪漫']),
    new Product(3, '断桥残雪', 'Vae', 3.5, 'Vae Music', ['流行', '古典']),
    new Product(4, '杀手', 'JJ', 5, 'JJ Music', ['快歌', '流行']),
    new Product(5, '不为谁而作的歌', 'JJ', 4.5, 'JJ Music', ['流行', '快歌']),
    new Product(6, '三国杀', '汪苏泷', 2.5, '汪苏泷 Music', [ '古典', '快歌'])
];
const app = express();
app.use('/',express.static(path.join(__dirname,'..','client')));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' spark')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get("/api/products", (request, response) => {
    /*let params=request.query;
    console.log(params);
    response.send(products);*/
    let result=products;
    let params=request.query;
    if (params.Music){
        result=result.filter((p)=>p.Music.indexOf(params.Music)!==-1);
    }
    if (params.Singer && result.length>0){
        result=result.filter((p)=>p.Singer.indexOf(params.Singer)!==-1);
    }
     if (params.Category&&params.Category !=='-1' && result.length>0 ){
         result=result.filter((p)=>p.Categories.indexOf(params.Category)!==-1);
     }
    response.send(result);
});
app.get("/api/products/:id", (request, response) => {
    response.json(products.find((product) => product.Id == request.params.id));
});
app.get("/api/products/:id/comments",(req,res)=>{
   res.json(comments.filter((conmment:Comment)=>conmment.productId==req.params.id))
});

const server = app.listen(8000, "localhost", () => {
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
