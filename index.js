require('dotenv').config()
var express = require('express')
var app = express()

var connectToDb = require("./db") 

const bodyParser = require('body-parser')
const userRoute = require("./routes/users.route")
const weatherRoute = require("./routes/weather.route")
const postRoute = require("./routes/post.route")
const commentsRoute = require("./routes/comments.route")
const users = require('./db')
const { connect } = require('mongoose')
const cors = require('cors')

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))  //middleware
// parse application/json
app.use(bodyParser.json())
app.set("view engine", "ejs")
app.get("/", (req, res)=>{
    res.render("login")
})


app.get("/about", (req, res)=>{
    res.render("final-project/good-earth/about")
})
app.get("/addmission", (req, res)=>{
    res.render("final-project/good-earth/addmission")
})
app.get("/attendance", (req, res)=>{
    res.render("final-project/good-earth/attendance")
})
app.get("/environmental", (req, res)=>{
    res.render("final-project/good-earth/environmental")
})
app.get("/fee", (req, res)=>{
    res.render("final-project/good-earth/fee")
})
app.get("/good_earth", (req, res)=>{
    res.render("final-project/good-earth/good_earth")
})
app.get("/guid_parents", (req, res)=>{
    res.render("final-project/good-earth/guid_parents")
})
app.get("/guid_students", (req, res)=>{
    res.render("final-project/good-earth/guid_students")
})
app.get("/health", (req, res)=>{
    res.render("final-project/good-earth/health")
})
app.get("/online_class", (req, res)=>{
    res.render("final-project/good-earth/online_class")
})
app.get("/pho_vid", (req, res)=>{
    res.render("final-project/good-earth/pho_vid")
})
app.get("/students", (req, res)=>{
    res.render("final-project/good-earth/students")
})
app.get("/teachers", (req, res)=>{
    res.render("final-project/good-earth/teachers")
})
app.get("/time_table", (req, res)=>{
    res.render("final-project/good-earth/time_table")
})
app.get("/timings", (req, res)=>{
    res.render("final-project/good-earth/timings")
})
app.get("/login", (req, res)=>{
    res.render("final-project/login/login")
})
app.get("/signin", (req, res)=>{
    res.render("final-project/signin/signin")
})
app.use("/users", userRoute)
app.use("/weather", weatherRoute)
app.use("/posts" , postRoute) 
app.use("/comments" , commentsRoute )

    

connectToDb() // Connects to out mongo database

app.listen(5000, function(){
    console.log("OMG !!!! My Server is running")
})


