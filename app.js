require("dotenv").config();
const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/mongooseConnection");
const expressSession = require('express-session');
const flash = require("connect-flash");




const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const index = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.EXP_SESSION_SECRET
}))

app.use(flash());


app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use('/', index);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
