

const express = require("express");
const app = express();
const PORT = 8000;
app.get("/", (request, response) => {
    response.send("Hi there");
});

app.listen(PORT, () => {
    console.log("Listen on the port 8000...");
});