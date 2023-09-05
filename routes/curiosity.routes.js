const express = require("express");
const Curiosity = require("../models/Curiosity.model");
const User = require("../models/User.model");
const fileUploader = require('../config/cloudinary.config');

const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

const router = express.Router();

// READ: show list of curiosities in a category:
router.get('/:category', (req, res, next) => {
    const { category } = req.params;

    Curiosity.find({ category })
        .then((curiositiesFromDB) => {
            res.render(`curiosities/curiosity`, { curiosities: curiositiesFromDB, title: category })
        })
        .catch((e) => {
            console.error("Error getting list of curiosities from DB", e);
            next(e);
        })
})

// CREATE: display form 
router.get("/curiosities/create", (req, res, next) => {
    Curiosity.find()
        .then((curiositiesFromDB) => {
            res.render("curiosities/curiosity-create", { curiosities: curiositiesFromDB });
        })

        .catch((e) => {
            console.error("Error getting list of curiosities from DB", e);
            next(e);
        });
});

// CREATE: process form
router.post("/curiosities/create", fileUploader.single('image'), (req, res, next) => {
    const currentUser = req.user;

    const newCuriosity = {
        //user: currentUser._id,
        title: req.body.title,
        date: req.body.date,
        description: req.body.description,
        category: req.body.category,
        image: req.file.path
    };

    Curiosity.create(newCuriosity)
        .then((newCuriosity) => {
            res.redirect(`/${newCuriosity.category}`)
        })
        .catch(e => {
            console.error("error creating a new curiosity", e);
            next(e);
        });
});

// READ: display details of one curiosity:
router.get("/curiosities/:id", (req, res, next) => {
    const { id } = req.params;

    Curiosity.findById(id)
        .then(curiosityFromDB => {
            res.render("curiosities/curiosity-details", curiosityFromDB);
        })
        .catch((e) => {
            console.error("Error getting list of curiosities from DB", e);
            next(e);
        });
});

// READ: display edit page of one curiosity:
router.get('/curiosities/:id/edit', (req, res, next) => {
    const { id } = req.params;

    Curiosity.findById(id)
        .then(curiosityToEdit => {
            res.render("curiosities/curiosity-update", { curiosities: curiosityToEdit })
        })
        .catch(e => next(e));
});

// EDIT: update values of one curiosity:
router.post('/curiosities/:id/edit', fileUploader.single('image'), (req, res, next) => {
    const { id } = req.params;
    const { title, date, description, category } = req.body;
   // const { image } = req.file ? req.file.path : {};
    // console.log(req.file.path)
    let image;
    console.log(req.body)
    if(req.file){
        console.log(req.file.path)
         image = req.file.path
    } else {
        console.log('Img', req.body.image)
    }


    Curiosity.findByIdAndUpdate(id, { title, date, description, category, image }, { new: true })
        .then(updatedCuriosity => res.redirect(`/curiosities/${updatedCuriosity.id}`))
        .catch(error => {
            console.error("Error getting list of curiosities from DB", error)
            next(error)
        });
});

// DELETE: delete curiosities
router.post('/curiosities/:id/delete', async (req, res, next) => {
    const { id } = req.params;
    const { category } = req.body;

    try {
        await Curiosity.findByIdAndDelete(id);

        res.redirect(`/${category}`)
    } catch (err) {
        next(err);
    }
});


module.exports = router;