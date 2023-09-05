const mongoose = require("mongoose");
const Curiosity = require("../models/Curiosity.model");

require('dotenv').config(); // import and configure dotenv (loads environment variables from .env file)

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/my-project';

const curiosities = [
  {
    title: "Great Grandmas Earrings",
    date: "Modern Era",
    description: "Great-Grandma Evelyn's bowtie earrings are our family's cherished heirloom. Passed down through generations, they symbolize enduring love and timeless beauty. Hearing stories of her grace and charm, I feel connected to her, a piece of history in my hands.",
    category: "Raving Reliques",
    image: "https://res.cloudinary.com/dxb0rrnmo/image/upload/v1693909520/my-project/tzlrrbdlmud81ytcgg8e.jpg"
  },
  {
    title: "Rotary Phone",
    date: "Modern Era",
    description: "Hidden away in my grandparents' basement, I found a relic from the '80s—a vintage rotary phone, its dial untouched for decades. Memories of my parents using it rushed back. Each call, a deliberate connection. I marveled at its mechanical simplicity and rhythmic dial clicks. This phone was a link to a time when voices bridged distances, a keeper of stories. As I held it, I thought of late-night chats, teenage secrets, and heartfelt goodbyes. It was a silent confidant, a symbol of simpler times.",
    category: "Terrific Technology",
    image: "https://res.cloudinary.com/dxb0rrnmo/image/upload/v1693909281/my-project/pid0w6xfnjvecjbbzcux.jpg"
  },
  {
    title: "Petrified Forest of Arizona",
    date: "Other",
    description: "In the Arizona desert, I explored the Petrified Forest. Guided by Ranger Sarah, I marveled at the ancient trees turned stone. The Painted Desert's vibrant hues and an ancient pueblo site's stories left me awestruck. The Crystal Forest, aglow under starry skies, felt surreal, a connection to the past and the cosmos. Leaving, I carried the Petrified Forest's timeless beauty and history in my heart.",
    category: "Natural Wonders",
    image: "https://res.cloudinary.com/dxb0rrnmo/image/upload/v1693909494/my-project/wwyqnhe6xx69zynduro9.jpg"
  },
  {
    title: "Old Painting",
    date: "Modern Era",
    description: "At a garage sale, I discovered a forgotten 1880 fruit bowl painting. Mrs. Johnson shared its family history, and now it adorns my home.",
    category: "Curious Art",
    image: "https://res.cloudinary.com/dxb0rrnmo/image/upload/v1693908938/my-project/gejuq5hvjdy4xsc5pcma.jpg"
  }
];

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);

    return Curiosity.deleteMany({}); //WARNING: this will delete all books in your DB !!
  })
  .then((response) => {
    console.log(response);

    return Curiosity.insertMany(curiosities);
  })
  .then(curiositiesFromDB => {
    console.log(`Created ${curiositiesFromDB.length} curiosities`);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to DB: ", err);
  });