const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require("dotenv").config();



// user auth APIs
async function registerUser(req, res) {

    const { fullName, email, password } = req.body;

    const isuserExist = await userModel.findOne({ email });

    if (isuserExist) {
        return res.status(400).json({ message: "User already exist" })
    }


    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        fullName,
        email,
        password: hashPassword
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token);

    res.status(201).json({
        message: "User registered successfully", user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    });


}

async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });



    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Inavalid email or password"
        })

    } else {
        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET);

        res.cookie("token", token)
        return res.status(200).json({
            message: `user  login completed`,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        });
    }
}

async function logoutUser(req, res) {
    try {
        // Clear the authentication cookie (assuming it's named "token")
        res.clearCookie("token");

        // console.log("Logout successful, mission completed");
        return res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        console.error("Something went wrong during logout:", err);
        return res.status(500).json({ message: "Logout failed" });
    }
}


// partner auth APIs

async function registerFoodPartner(req, res) {
    try{
    const { name, email, password } = req.body;

    const ispartnerExist = await foodPartnerModel.findOne({
        email
    })

    if (ispartnerExist) {
        return res.status(400).json({ message: "our food partner exist already with this Email." });
    } else {

        const hashpass = await bcrypt.hash(password, 10);
        const partner = await foodPartnerModel.create({
            name,
            email,
            password: hashpass
        });

        const token = jwt.sign({ id: partner._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token);

        res.status(201).json({
            message: "Partener Created Successfully",
            partner: {
                _id: partner._id,
                name: partner.name,
                email: partner.email

            }
        })
    } } catch(err){
        return res.status(500).json({
            message: "server error!!!", details: err.message
        })
    }

}

async function loginFoodPartner(req, res) {
    try{
        const { email, password } = req.body;

        const partner = await foodPartnerModel.findOne({ email })
        
        if (!partner) {
            return res.status(400).json({ message: "Invalid Email Or Password!!!. Please Try Again..."})
        }

        const ispassvalid = await bcrypt.compare(password, partner.password);

        if (!ispassvalid) {
            return res.status(400).json({ message: "Invalid Email Or Password!!!. Please Try Again..."})
        } else{
            const token = jwt.sign({ id: partner._id}, process.env.JWT_SECRET,{expiresIn: "1d"})
            res.cookie("token", token);

            res.status(200).json({
                message: "partner Login Completed.",
                partner :{
                    _id: partner._id,
                    name: partner.name,
                    email: partner.email
                }
            })
        }
    }catch(err){
        return res.status(500).json({message: "server Error !!!", details: err.message})
    }
}

async function partnerLogout(req, res){
    res.clearCookie("token");
    
    res.status(200).json({message:"Partner logout successfull."})
}



module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    partnerLogout
}