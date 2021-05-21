const express = require("express"),
multer = require("multer"),
layouts = require("express-ejs-layouts"),
moment = require("moment"),
mongoose = require("mongoose"),
// morgan = require("morgan"),
Router = require("./routers/mainRouters"),
app=express();

mongoose.connect("mongodb://localhost/Imglike", {useNewUrlParser:true, useUnifiedTopology:true});
mongoose.connection.on("open", () => {
    console.log("Bazaga ulandi Imglike: ")
})

mongoose.Promise = global.Promise



app.set('port',process.env.PORT || 3400 );
app.set("view engine", "ejs");

// app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(layouts);
app.use(multer({dest:"public/upload"}).single("file"))
app.use(express.static("public"));

app.use(Router);

app.listen(app.get("port"), () =>{
    console.log(`server ishga tushdi ${app.get('port')}`)
} )



