const express = require ("express");
const mongoose= require ("mongoose");
const bodyParser= require ("body-parser");

const Contact= require ("./routes/Contact");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api", Contact);

//connection from mongoose to mongoDB
const connecttoDB= async()=> {
    try {
        await mongoose.connect('mongodb://localhost:27017/mydatabase', {
            useNewUrlParser: true, // Ensures that Mongoose uses MongoDB’s new URL parser.
            useUnifiedTopology: true //more robust connection handling
        });
        console.log("connected to mongoDB");
    }catch(error){
        console.log(error);
    }
}
connecttoDB();

const port= 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});