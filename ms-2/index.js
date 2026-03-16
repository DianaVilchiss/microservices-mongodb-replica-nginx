const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const contactRoutes = require("./routes/contacts.routes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contacts",contactRoutes);

mongoose.connect(
    "mongodb://admin:123@mongo4:27017,mongo5:27017,mongo6:27017/contacts?replicaSet=rs1&authSource=admin"
    )
    
.then(
    ()=> app.listen(3000,()=>console.log("servidor 2 corriendo"))
).catch(
    err=> console.error(err)
);