const express = require('express')
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

let ImageArr = [];
let favArr = [];
let albumArr = [];
let deleteArr = []
app.get('/',(req,res)=>{
    res.status(200).send({"status":200,"msg":"success"})
})
app.get('/img',(req,res)=>{
    res.send({"status":200,data:ImageArr})
})
app.post('/post_img',(req,res)=>{
    const {url} = req.body;
    ImageArr.push(url);
    res.status(200).send({"status":200,data:ImageArr});
})
app.delete('/delete_img/:id',(req,res)=>{
    console.log(req.params.id);
    ImageArr = ImageArr.filter((item,index)=>{
        return index!=req.params.id
    })
    console.log(ImageArr);
    res.send({"status":200,data:ImageArr})
})
app.post('/delete_selected',(req,res)=>{
    const idxArr = req.body.data;
    deleteArr = [...deleteArr,idxArr];
    for(let i = 0; i < ImageArr.length; i++){
        for(let j = 0; j<idxArr.length; j++){
            if(ImageArr[i]==idxArr[j]) ImageArr.splice(i,1);
        }
    }
    res.status(200).send({"status":200,data:ImageArr})
})
app.post('/fav',(req,res)=>{
    const {url} = req.body;
    console.log(url,"fsfsgfgfd");
    if(url!=null) favArr.push(url);
    else return res.status(500).send({"status":500,"msg":"invalid url"})
    res.status(200).send({"status":200,data:favArr});
})
app.post('/remfav',(req,res)=>{
    const {url} = req.body;
    if(url!=null) favArr.push(url);
    else return res.send({"status":500,"msg":"invalid url"})
    favArr = favArr.filter(item=>item!=url);
    res.status(200).send({"status":200,data:favArr});
})
app.get('/fav',(req,res)=>{
    res.status(200).send({"status":200,data:favArr});
})
app.post('/createAlbum',(req,res)=>{
    const {data} = req.body;
    if(data.title==null){
        res.status(500).send({"msg":"please give title"});
        return;
    }
    if(data.albumIdx==null){
        res.status(500).send({"msg":"please select template"});
        return;
    }
    albumArr.push(data);
    res.status(200).send({"msg":"album created",data:data});
})
app.get('/album',(req,res)=>{
    res.status(200).send({"status":200,data:albumArr})
})
app.get('/trash',(req,res)=>{
    res.status(200).send({"status":200,data:deleteArr});
})
app.listen(process.env.PORT,console.log(`server is listening on PORT ${PORT}`))

