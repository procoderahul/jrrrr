const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express();
const port = 3000;
const collection = require("./conn");
const { mongo, default: mongoose } = require('mongoose');

const staticPath = path.join(__dirname, "../public")
const templatePath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set('view engine', 'hbs')
app.set('views', templatePath)
hbs.registerPartials(partialsPath)

app.use(express.static(staticPath))
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.render('index')
})

app.get("/fetch" , (req,res) =>{
    collection.find().then((result)=>{
        res.send(result)
    }).catch((err) =>{
        console.log(err)
    })
})


app.post("/sub", async (req, res) => {
    const data = {
        email: req.body.email,
        phone: req.body.phone,
        name: req.body.name,
        message: req.body.message
    }

    await collection.insertMany([data])

    res.render('index')
})
app.listen(port, () => {
    console.log(`listening on ${port}`)
})

