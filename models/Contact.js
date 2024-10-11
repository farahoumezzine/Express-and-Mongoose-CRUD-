const mongoose= require ("mongoose");

const contactSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required: [true, "First Name is required" ],
        minLength: 3,
        maxLength: 20,
        trim: true,
        validate :{
            validator: function (v) {
                const nameRegex= /^[A-Za-z]+$/;
                return nameRegex.test(v);
        },
        message : "First Name must contain only alphabetic charact"
        
    }
},
lastName:{
type: String,
required: [true, "Last Name is required" ],
},
emailAdd:{
    type:String,
    required:[true, "Email is required" ],
    unique:true,
},

// ADD SOFT delete
isDeleted: { type: Boolean, default: false }, 
deletedAt: { type: Date } // Timestamp for soft delete

});
module.exports=mongoose.model("Contact",contactSchema);