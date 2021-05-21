const  Models = require("../models");

module.exports = {
    index: (req, res) => {

        Models.Image.find()
        .then((data) => {

            res.render("main/index", {images: data})
        })
        .catch((err) => {
            console.log(err)
        })
    }



}