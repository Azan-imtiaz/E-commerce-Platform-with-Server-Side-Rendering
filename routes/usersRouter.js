const express = require("express");

const router = express.Router();

const {userRegister,userLogin}=require("../controllers/authControllers");


router.get("/", (req, res) => {

    res.send("hey");

})

router.post("/register",userRegister);
router.post("/login",userLogin);

module.exports = router;