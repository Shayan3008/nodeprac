const express = require("express")
const app = express()
const spawn = require("child_process").spawn
const path = require("path")
const PORT = process.env.PORT || 5000
const cors = require("cors")
const logger = require("./middleware/logger.js")
const router = express.Router()
var dataset;


app.use(cors())
app.use(logger)
app.use(express.json())
const member = [
    {
        "id": 1,
        "name": "shayan",
        "status": "active"
    }
]



//api creation
app.get("/api/member", (req, res) => {
    res.json(member)
})

//single member id
app.get("/api/member/:id", (req, res) => {
    var found = member.some(member => member.id == parseInt(req.params.id))
    if (found)
        res.json(member.filter(member => member.id == parseInt(req.params.id)))
    else
        res.status(400).json("No such Id")
})

app.get("/", (req, res) => {

    const py = spawn('py', [__dirname + '/hello.py', req.query.name])
    py.stdout.on("data", function (data) {
        console.log("Listen to data.")
        dataset = data.toString()
    })
})

//sending post request
app.post("/", (req, res) => {
    console.log(req.body)
    res.status(200)
    var data={
        name:req.body.name,
        email:req.body.email,
        status:"active"
    }
    member.push(data)
    res.json(member)
})

//static folder
app.use(express.static(path.join(__dirname, "public")))
app.listen(PORT, () => console.log("Server started at" + PORT))