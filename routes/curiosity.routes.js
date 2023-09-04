const express = require("express");
const Curiosity = require("../models/Curiosity.model");
const User = require("../models/User.model");

const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

const router = express.Router();


//CREATE: display form 
router.get("/curiosities-create", (req, res, next) => {
   Curiosity.find()
        .then((curiositiesFromDB) => {
           res.render("curiosities/curiosity-create", {curiosities: curiositiesFromDB}); 
        })
            
        .catch( (e) => {
            console.log("Error getting list of curiosities from DB", e);
            next(e);
        });
});

router.get('/natural-wonders', (req, res, next) => {
    Curiosity.find({category: "Natural Wonders"})
        .then((curiositiesFromDB) => {
               res.render("curiosities/natural-wonders", {curiosities: curiositiesFromDB});   
        })
            
        .catch( (e) => {
            console.log("Error getting list of curiosities from DB", e);
            next(e);
        });
});

router.get('/terrific-technology', (req, res, next) => {
    Curiosity.find({category: "Terrific Technology"})
    .then((curiositiesFromDB) => {
           res.render("curiosities/terrific-technology", {curiosities: curiositiesFromDB});   
    })
        
    .catch( (e) => {
        console.log("Error getting list of curiosities from DB", e);
        next(e);
    });
})

router.get('/curious-art', (req, res, next) => {
    Curiosity.find({category: "Curious Art"})
    .then((curiositiesFromDB) => {
           res.render("curiosities/curious-art", {curiosities: curiositiesFromDB});   
    })
        
    .catch( (e) => {
        console.log("Error getting list of curiosities from DB", e);
        next(e);
    });
})

router.get('/raving-reliques', (req, res, next) => {
    Curiosity.find({category: "Raving Reliques"})
    .then((curiositiesFromDB) => {
           res.render("curiosities/raving-reliques", {curiosities: curiositiesFromDB});   
    })
        
    .catch( (e) => {
        console.log("Error getting list of curiosities from DB", e);
        next(e);
    });
})

router.get('/fascinating-finds', (req, res, next) => {
    Curiosity.find({category: "Fascinating Finds"})
    .then((curiositiesFromDB) => {
           res.render("curiosities/fascinating-finds", {curiosities: curiositiesFromDB});   
    })
        
    .catch( (e) => {
        console.log("Error getting list of curiosities from DB", e);
        next(e);
    });
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


//Edit Curiosity:
router.get('/:category/:curiosityId/edit', (req, res, next) => {
    const {curiosityId} = req.params;
    console.log(req.params)

    Curiosity.findById(curiosityId)
        .then(curiosityToEdit => {
            res.render("curiosities/update-form", {curiosities: curiosityToEdit})
        })
        .catch(e => next(e));
});

router.post('/:category/:curiosityId/edit', (req, res, next) => {
    const curiosityId = req.params.id;
    const category = req.body.category;
    const { title, date, description } = req.body;

    Curiosity.findByIdAndUpdate(curiosityId, { title, date, description, category }, { new: true })
        .then(updatedCuriosity => res.redirect(`/${category}/${updatedCuriosity.id}`))
        .catch(error => next(error));
});




module.exports = router;