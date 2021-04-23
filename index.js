const express = require("express")
const app = express()
const spawn = require("child_process").spawn
const path = require("path")
const PORT = process.env.PORT || 5000
const cors = require("cors")
const logger = require("./middleware/logger.js")
var dataset;

app.use(logger)

const member = [
    {
        "id": 1,
        "name": "shayan",
        "status": "active"
    }
]

app.use(cors())

//api creation
app.get("/api/member", (req, res) => {
    res.json(member)
})

//single member id
app.get("/api/member/:id", (req, res) => {
    var found=member.some(member=>member.id==parseInt(req.params.id))
    if(found)
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
//static folder
app.use(express.static(path.join(__dirname, "public")))
app.listen(PORT, () => console.log("Server started at" + PORT))