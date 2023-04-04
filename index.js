const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();
 
// mongoose.connect(
//     process.env.MONGO_URL, 
//     {useNewUrlParser: true, useUnifiedTopology: true},
//     ()=>{
//     console.log("connected to MongoDB");
// });

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
})
.then( () => console.log("connected to MongoDB")) 
.catch ( err => console.log(err) )


//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.get("/",(req,res)=>{
    res.send("welcome to homepage")
})

app.listen(5000,()=>{
    console.log("server is running on 5000 Port")
})