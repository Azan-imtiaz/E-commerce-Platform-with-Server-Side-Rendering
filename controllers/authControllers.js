const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
const productModel =require("../models/productModel")

// User registration
module.exports.userRegister = async function (req, res) {
    try {
        const { email, password, fullname } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.render('index', { error: "You already have an account", successMessage: null });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await userModel.create({
            email: email,
            password: hashedPassword,
            fullName: fullname
        });

        return res.render('index', { error: null, successMessage: "User Created Successfully" });
    } catch (err) {
        console.error(err.message);
        return res.render('index', { error: "Something Went Wrong", successMessage: null });
    }
};

// User login
module.exports.userLogin = async function (req, res) {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.render('index', { error: "Email or password is incorrect", successMessage: null });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            // Generate JWT token
            const token = generateToken(user);
            res.cookie('token', token);

            const products=await productModel.find();
            return res.render('shop', { products });
        } else {
            return res.render('index', { error: "Email or password is incorrect", successMessage: null,loggedIn:false });
        }
    } catch (err) {
        console.error(err.message);
        return res.render('index', { error: "Something went wrong", successMessage: null });
    }
};

// User logout
module.exports.userLogout = function (req, res) {
    res.clearCookie('token');
    return res.render('index', { error: null, successMessage: "Logout Successful",loggedIn:false });
};
