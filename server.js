const express = require('express')
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
const ImageArr = []

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
app.delete('/delete_img',(req,res)=>{
    console.log(req.params);
})
app.listen(process.env.PORT,console.log(`server is listening on PORT ${PORT}`))

