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
    date: Date,
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Natural Wonders", "Terrific Technology", "Curious Art", "Raving Reliques", "Fascinating Finds"],
        default: "Fascinating Finds"
    },
    image: String,
},

    {
        timestamps: true
    }
);

module.exports = model("Curiosity", curiositySchema);