//acquiring packages
require("dotenv").config();
const express  =require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path")


///acquiring routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

const app =express();

//connecting db
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser : true}, function(err){
    if(err){
        console.log(err);
    } else{
        console.log("Database connected successfully")
    }
});



//middlewares
app.use(express.static('./public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("tiny"));


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

//multer
const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, "./public/images")
    },

    filename: (req,file,cb)=>{
        cb(null, file.originalname);
    },
});

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req,res)=>{
    res.status(200).json("File has been uploaded");
})


//server
app.listen(process.env.PORT || 5000, (req,res)=>{
    console.log("Backend Server running on port 5000")
})