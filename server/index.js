const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require("cors");

//import router files
const indexRouter = require("./routes/index")
const projectRouter = require("./routes/projectRoutes")

const app = express()

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(express.json()); // makes sure it comes back as Json

mongoose.connect('mongodb+srv://admin:Marlies2810!@jira-pxx77.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 

// middleware
app.use(cors());

// routes
app.use('/', indexRouter)
app.use('/projects', projectRouter)

const server = app.listen(process.env.PORT || 9000, _ => {
    console.log("listening on port 9000")
})