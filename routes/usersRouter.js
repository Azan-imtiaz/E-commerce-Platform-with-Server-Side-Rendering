const express = require("express");

const router = express.Router();

const {userRegister,userLogin,userLogout}=require("../controllers/authControllers");


router.get("/", (req, res) => {

    res.send("hey");

})

router.post("/register",userRegister);
router.post("/login",userLogin);
router.get("/logout",userLogout);

module.exports = router;