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
        if (error.code === 11000 && error.keyPattern && error.keyPattern.emailAddress){
            res.status(500).json({message: "email must be UNIQUE"});

        }
        res.status(500).json({message: "unable to create a new contact"});
    })

}catch(error){
    console.log(error);
    res.status(500).json({message: "unable to save contact"});
}

})
module.exports=router;