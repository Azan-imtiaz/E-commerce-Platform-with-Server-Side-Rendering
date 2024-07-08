const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
module.exports.userRegister = async function (req, res) {
    try {
        let { email, password, fullname } = req.body;
        const result = await userModel.find({ email: email })
        if (result && result.length > 0) {
            return res.status(401).send("You already have an Account Please login");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = await userModel.create({
            email: email, password: hashedPassword, fullName: fullname
        });

        res.send("User created successfully");
    }

    catch (err) {
        console.log(err.message);
        res.send(err.message);

    }

};



 module.exports.userLogin = async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });
        if (!user) return res.send("Email or password is incorect");
        const result = await bcrypt.compare(password,user.password);
        if (result) {
            const token = generateToken(user);
            res.cookie('token', token);
            return res.send("login succesfully");
        }
     
            return res.send("Email or Password is Incorect");
    
    }
    catch (err) {
        console.log(err.message);
        res.send(err.message);
    }

}