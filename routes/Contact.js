//CRUD API
const express = require ("express");
const router= express.Router();
const Contact= require("../models/Contact");

router.post("/contact",async (req,res) => {
try{
    const newContact = new Contact (req.body);
    await newContact.save()
    .then((savedContact) => {
        console.log(savedContact);
        res.status(201).json({msg: "Contact succefully saved"});
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({message: "unable to save contact"});
    })

}catch(error){
    console.log(error);
    res.status(500).json({message: "unable to save contact"});
}

})
module.exports=router;