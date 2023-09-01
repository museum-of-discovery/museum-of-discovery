const { Schema, model} = require("mongoose");

const curiositySchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    date: String,
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Natural Wonders", "Terrific Technology", "Curious Art", "Raving Reliques", "Interesting Stuff"],
        default: "Interesting Stuff"
    },
    image: String,
},

    {
        timestamps: true
    }
);

module.exports = model("Curiosity", curiositySchema);