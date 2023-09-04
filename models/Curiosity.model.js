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
    date: {
        type: String,
        enum: ["Old Stone Age", "New Stone Age", "Bronze Age", "Iron Age", "Classical Antiquity", "Medieval Period", "Renaissance", "Early Modern Period","Industrial Revolution", "Modern Era", "Other" ],
        
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Natural Wonders", "Terrific Technology", "Curious Art", "Raving Reliques", "Fascinating Finds"],
        
    },
    image: String,
},

    {
        timestamps: true
    }
);

module.exports = model("Curiosity", curiositySchema);