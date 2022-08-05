const express = require("express")
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.post('/',(req,res)=>{
    const userEmail = InEmail
    console.log("posting")
})

app.listen(5000,(req,res)=>{
    console.log("Server is running on port 5000")
})