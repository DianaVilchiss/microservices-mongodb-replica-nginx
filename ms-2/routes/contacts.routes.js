const router = require("express").Router();
const Contact = require("../models/Contact");
const auth = require("../middleware/auth.middleware");

router.use(auth);

router.post("/",async (req,res)=>{
    const contact = await Contact.create({
        userId: req.user.id,
        ...req.body
    });
    res.status(201).json(contact);
});

router.get("/", async (req,res)=>{
    const contacts = await Contact.find({userId: req.user.id});
    res.status(200).json(contacts);
});

module.exports = router;

