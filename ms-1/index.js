const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const rutasUsuario = require("./routes/auth.route.js");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users",rutasUsuario);

app.get("/",(req,res)=>res.json({message:"Hola mundo"}));

mongoose.connect(
    "mongodb://admin:123@mongo1:27017,mongo2:27017,mongo3:27017/users?replicaSet=rs0&authSource=admin"
    )    

.then(()=>{
    app.listen(3000,()=>console.log("servidor 1 corriendo"))
}).catch((err)=>{
    console.log("El servidor no se pudo iniciar "+ err);
});
