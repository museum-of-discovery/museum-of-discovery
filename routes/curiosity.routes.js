const express = require("express");
const Curiosity = require("../models/Curiosity.model");
const User = require("../models/User.model");

const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

const router = express.Router();


//CREATE: display form 
router.get("/curiosities-create", (req, res, next) => {
    User.find()
        .then( usersFromDB => {
            const data = {
                users: usersFromDB
            }
            res.render("curiosities/curiosity-create", data);
        })
        .catch( (e) => {
            console.log("Error getting list of users from DB", e);
            next(e);
        });
});

//CREATE: process form
router.post("/curiosities-create", (req, res, next) => {
    const newCuriosity = {
        user: req.body.user,
        title: req.body.title,
        date: req.body.date,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image
    };
    console.log(req.body.description)

    // Curiosity.create(newCuriosity)
    //     .then((newCuriosity) => {
    //         res.redirect("/")
    //     })
})



module.exports = router;