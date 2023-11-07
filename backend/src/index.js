require('dotenv').config(); // Load environment variables from .env
const connectDB = require("./db/db");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.get("/", (request, response) => {
    response.send("Hi there");
});

app.listen(PORT, () => {
    console.log("Listen on the port 8000...");
});