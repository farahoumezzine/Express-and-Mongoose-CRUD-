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


    // Read all contacts
    router.get("/contact", async (req, res) => {
    try {
        //optimize the query
      const contacts = await Contact.find().lean().exec();
      res.status(200).json({ contacts });
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ msg: "Unable to get contacts", error: error.message });
    }
  });


    //read single contact
    //6709835b0e422fe17c9d3928
    router.get("/contact/:id", async(req,res) => {
        try {
            const id = req.params.id;

          const contacts = await Contact.findById(id).lean().exec();
          res.status(200).json({ contacts });
        } catch (error) {
          console.error('Error fetching contacts:', error);
          res.status(500).json({ msg: "Unable to get contacts", error: error.message });
        }
    });

    //search
    router.get("/search", async(req, res) => {
        try {
            const searchTerm = req.query.searchTerm;
            const searchRegex = new RegExp(searchTerm,"i");
            const matchingContacts = await Contact.find({
                $or: [
                    {firstName: searchRegex},
                    {lastName: searchRegex},
                    {emailAdd: searchRegex}
                ]
            }).lean().exec();

          res.status(200).json({ contact : matchingContacts });
        } catch (error) {
          console.error('Error fetching contacts:', error);
          res.status(500).json({ msg: "Unable to search contacts", error: error.message });
        }
    });

    //update
    //6709835b0e422fe17c9d3928
    router.put("/contact/:id", async(req,res)=> {
        try {
            const id = req.params.id;
            const {firstName, lastName, emailAdd} = req.body;

            const Updatecontact = await Contact.findByIdAndUpdate(id, {firstName, lastName, emailAdd},{new: true})
            .lean().exec();
          res.status(200).json({ contact : Updatecontact });
        } catch (error) {
          console.error('Error fetching contacts:', error);
          res.status(500).json({ msg: "Unable to update contacts", error: error.message });
        }

    });


module.exports=router;