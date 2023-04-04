const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// testing api

router.get("/test-me", function (req, res) {
  res.send("My first ever api!") 
}) 


// REGISTER test
// router.get("/register", async function (req, res) {
//   const user = await new User({
//     username: "zaya",
//     email: "zaya@gmail.com",
//     password: "674789",
//   })

//   await user.save();  
//   res.send("ok")
 

// REGISTER
router.post("/register", async function (req, res) {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    })
     
    // save and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
     res.status(500).json(err);
  }
});


// login

router.post("/login" , async(req, res)=>{
  try{
    const user = await User.findOne({email: req.body.email});
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")

    res.status(200).json(user)
  } catch(err){
    // console.log(err)
    res.status(500).json(err);
  }
})
module.exports = router; 
