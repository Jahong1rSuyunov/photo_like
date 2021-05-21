const fs = require("fs"),
    path = require("path"),
    Models = require("../models");

module.exports = {

    index: (req, res) =>{
        let id = req.params.id
        let obj = {
            images: {},
            comments: []
        }
        
        Models.Image.findById(id)
        .then((data) => {
            
            data.views++
            data.save()
            
            Models.Comment.find({imageid: id})
            .then((info) => {
                obj.image = data
                obj.comments = info
                console.log(obj.comments)

                res.render("main/foto", obj)
            })
            .catch((err) => {
                if(err) throw err
            })

            
        })
        .catch((err) => {

            console.log(err)
        })
        

    },

    imageUpload: (req, res) => {

        let belgi = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$&";
        let rasmnomi = "";

        for (let i = 0; i < 10; i++) {
            rasmnomi += belgi.charAt(Math.floor(Math.random() * belgi.length));
        }

        let ext = path.extname(req.file.originalname).toLowerCase();
        let yol = req.file.path;
        let targetpath = path.resolve(`./public/upload/${rasmnomi}${ext}`);

        if (ext === ".jpeg" || ext === ".png" || ext === ".gif" || ext === ".jpg") {
            fs.rename(yol, targetpath, (err) => {

                if (err) throw err

                let image = new Models.Image

                image.title = req.body.title;
                image.description = req.body.description;
                image.imageName = rasmnomi+ext;
                image.views = 1
                image.likes = 1
                console.log(image)
                
                image.save((err) => {
                    if(err) throw err
                    res.redirect(`/image/${image._id}`);
                })
                // .then(() => {
                //     res.redirect(`/image/ ${rasmnomi}`);
                // })
                // .catch((err) => {
                //     console.log(err)
                // })

            })
        } else {
            fs.unlink(yol, (err) => {
                if (err) throw err;
                res.status(500).json("Faqat rasm fayl yuklash mumkin ")
            })
        }
    },
    like: (req, res) => {
        let id = req.params.id
        
        Models.Image.findById(id)
        .then((data) => {
            
            data.likes++
            
            data.save()
            .then((info) => {
                res.json({likes: info.likes})
            })
            .catch((err) => {
                if(err) throw err
            })
        })

    },
    
    comment: (req, res) => {

        let id = req.params.id

        Models.Image.findById(id)
        .then((data) => {

            if(data) {
                let comment = new Models.Comment(req.body)
                comment.imageid = data._id

                comment.save()
                .then((info) => {
                    res.redirect(`/image/${data._id}`)
                })
                .catch((err) => {
                    if(err) throw err
                })
            }
        })
        .catch((err) => {
            if(err) throw  err
        })
    }
}



//     fieldname: 'file',
//     originalname: '2_5386337216265979071.mp3',
//     encoding: '7bit',
//     mimetype: 'audio/mpeg',
//     destination: 'public/upload',
//     filename: '5ef08ac8a6a7a09c0ffbb18e777b9872',
//     path: 'public\\upload\\5ef08ac8a6a7a09c0ffbb18e777b9872',
//     size: 3099781
