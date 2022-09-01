const express = require('express'); 
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { response } = require('express');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET="dharmil@213";
//Rout:1 create a User using: POST "/api/auth/createUser". No login required
router.post('/createUser', [
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 charactors').isLength({ min: 5 }),
] , async (req, res)=>{
    let success=false;
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check wather the user with this email exist already
    try {
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error : "Sorry, A user with this email is already exists"});
        }
        const salt = await bcrypt.genSaltSync(10);
        secPass = await bcrypt.hash(req.body.password,salt);
        // create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(authToken);
        // res.json(user);
        success=true;
        res.json({success,authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})


//Rout:2 authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [ 
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists()
] , async (req, res)=>{
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            success=false;
            return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }

        const passwordCompare= await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }

        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success,authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})


// Rout:3 Get logedin user details using : POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res)=>{
    try {
        userId=req.user.id;
        const user= await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})
module.exports=router;