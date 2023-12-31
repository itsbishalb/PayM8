require('dotenv').config(); // Load environment variables from .env
const connectDB = require("./db/db");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const { authRouter } = require("./routes/auth");
const depositRouter  = require("./routes/deposit");
const withdrawRouter  = require("./routes/withdraw");
const moneyTransactions = require('./routes/moneytransactions')
const user = require('./routes/user');


const transactionRouter = require("./routes/transactionHistory");

connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
    response.send("Hi there");
});

app.use("/api/", authRouter);
app.use("/api/transactions", transactionRouter);


app.use("/api/deposit", depositRouter);
app.use("/api/withdraw", withdrawRouter);
app.use('/api/send', moneyTransactions);
app.use('/api/user', user);
app.listen(PORT, () => {
    console.log("Listen on the port 8000...");
});