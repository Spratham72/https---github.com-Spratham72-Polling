const connect=require('./config/connect');
const express=require('express');
const city=require('./controller/city.controller');
const booth=require('./controller/booth.controller');
const app=express();
app.use(express.json());
app.use('/cities',city);
app.use('/booth',booth);

const start=()=>{
    app.listen(1234,async()=>{
        await connect();
        console.log("App live on 1234")
    })
}
module.exports=start;