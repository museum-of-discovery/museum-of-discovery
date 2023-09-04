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

router.get('/natural-wonders', (req, res, next) => {
    res.render('curiosities/natural-wonders.hbs')
});

router.get('/terrific-technology', (req, res, next) => {
    res.render('curiosities/terrific-technology.hbs')
})

router.get('/curious-art', (req, res, next) => {
    res.render('curiosities/curious-art.hbs')
})

router.get('/raving-reliques', (req, res, next) => {
    res.render('curiosities/raving-reliques.hbs')
})

router.get('/fascinating-finds', (req, res, next) => {
    res.render('curiosities/fascinating-finds.hbs')
})



//CREATE: process form
router.post("/curiosities-create", (req, res, next) => {

    const currentUser = req.user; 

    const newCuriosity = {
        //user: currentUser._id,
        title: req.body.title,
        date: req.body.date,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image
    };
    console.log(req.body.description)

    Curiosity.create(newCuriosity)
        .then((newCuriosity) => {
            if (req.body.category === "Natural Wonders") {
                res.redirect("/natural-wonders")
            } else if (req.body.category === "Terrific Technology") {
                res.redirect("/terrific-technology")
            } else if (req.body.category === "Curious Art") {
                res.redirect("/curious-art")
            }
            else if (req.body.category === "Raving Reliques") {
                res.redirect("/raving-reliques")
            } else if (req.body.category === "Fascinating Finds") {
                res.redirect("/fascinating-finds")
            } else {
                res.redirect("/")
            }

            
            
        })
        .catch(e => {
            console.log("error creating a new curiosity", e);
            next(e);
        });
});




module.exports = router;