if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")

// importing our routers
const indexRouter = require("./routes/index")
const authorRouter = require("./routes/authors")

// view engine adn seting ejs as the view engine
app.set("view engine", "ejs")
// appending the current directory to the views filepath
app.set("views", __dirname + "/views")
// setting our layout file 
app.set("layout", "layouts/layout")
app.use(expressLayouts)
// where our public files will be
app.use(express.static("public"))
app.use(bodyParser.urlencoded({limit: "10mb", extended: false}))

// importing mongoose for our db
const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on("error", error => console.error(error))

app.use("/", indexRouter)
// using the author router so every route in this router will start with /authors/
app.use("/authors", authorRouter)

// our server using env variable or defaultign to 3000
app.listen(process.env.PORT || 3000)