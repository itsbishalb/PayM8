require('dotenv').config(); // Load environment variables from .env
const connectDB = require("./db/db");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const { authRouter } = require("./routes/auth");
connectDB();

app.use(express.json());


app.get("/", (request, response) => {
    response.send("Hi there");
});

app.use("/api/", authRouter);

app.listen(PORT, () => {
    console.log("Listen on the port 8000...");
});