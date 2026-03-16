const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

router.post("/register", async (req,res)=>{
    try{
        const {email,password} = req.body;
        const passhash = await bcrypt.hash(password,10);

        const user = await User.create({
            email,
            password: passhash
        });
        res.status(201).json(user);
    }catch (error ){
        res.status(400).json({
            message: "usuario no encontrado - "+ 
            error.message||""
        });
    }
});

router.post("/login",async(req,res)=>{
    try {
        const {email,password} =  req.body;
        const user = await User.findOne({email});
        if (!user) return res.status(404).json({
            message: "Fijate que no esta"
        });
        const valid =  await bcrypt.compare(password,user.password);
        if (!valid) return res.status(401).json({
            message: "Credenciales invalidas"
        })
        const token = jwt.sign(
            {id:user._id, email:user.email},
            "1h2kj3h12j12iyd273dy829213",
            {expiresIn:"1d"}
        );

        res.status(200).json({token})
    } catch (error) {
        res.status(500).json({
            message: error.message || 
            "No pudo procesarse la solicitud"
        })
    }
});

module.exports = router;
