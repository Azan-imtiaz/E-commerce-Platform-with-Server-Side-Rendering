const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

module.exports.isLoggedIn = async function(req, res, next) {
    try {
        // Check if token exists in cookies
        if (!req.cookies.token) {
            req.flash('error', 'You need to log in first');
            return res.redirect('/');
        }

        // Verify JWT token
        let result = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
        if (!result) {
            req.flash('error', 'You need to log in first');
            return res.redirect('/');
        }

        // Fetch user details from database
        let user = await userModel.findOne({ email: result.email }).select('-password');
        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/');
        }

        // Attach user object to request for further middleware/routes
        req.user = user;
        next(); // Call next to proceed to the next middleware/route handler
    } catch (err) {
        req.flash('error', "Something went wrong");
        return res.redirect('/');
    }
};
