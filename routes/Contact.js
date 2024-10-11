//CRUD API
const express = require ("express");
const router= express.Router();
const Contact= require("../models/Contact");

//create
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

    //read all contacts
    router.get("/contact", async(req, res) => {
    try{
        Contact.find()
        .then((contacts) => {
            console.log(contacts);
            res.status(200).json({contacts: contacts });

        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({msg: "Unable to get contacts"});
        })
        }catch(error){
            console.log(error);
            res.status(500).json({msg: "Unable to get contacts"})
        }


    });

    //read single contact
    //6709835b0e422fe17c9d3928
    router.get("/contact/:id", async(req,res) => {
        try{
            const id = req.params.id;
            Contact.findById(id)
            .then((contact) => {
                console.log(contact);
                res.status(200).json({contact: contact });
    
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({msg: "Unable to get contacts"});
            })
        }catch(error){
            console.log(error);
            res.status(500).json({msg: "Unable to get contact"})
        }
    });

    //search
    router.get("/search", async(req, res) => {
        try{
            const searchTerm = req.query.searchTerm;
            const searchRegex = new RegExp(searchTerm,"i");
            const matchingContacts = await Contact.find({
                $or: [
                    {firstName: searchRegex},
                    {lastName: searchRegex},
                    {emailAdd: searchRegex}
                ]
            })
            .then((contact) => {
                console.log(contact);
                res.status(200).json({contact: contact });
    
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({msg: "Unable to find contacts"});
            })
        }catch(error){
            console.log(error);
            res.status(500).json({msg: "Unable to search contact"})
        }
    });

    //update
    //6709835b0e422fe17c9d3928
    router.put("/contact/:id", async(req,res)=> {
        try{
            const id = req.params.id;
            const {firstName, lastName, emailAdd} = req.body;
            const Updatecontact = await Contact.findByIdAndUpdate(id, {firstName, lastName, emailAdd},
                {new: true})
                .then((Updatecontact) => {
                    console.log(Updatecontact);
                    res.status(200).json({msg : "Updated successfully" ,contact: Updatecontact});
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json({msg: "Unable to update contact"});
                        })
                        }catch(error){
                            console.log(error);
                            res.status(500).json({msg: "Unable to update contact"});

        }
    });
module.exports=router;