const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv/config");

const app = express();
//APP DEPENDENCIES
app.use(express.json());
app.use(cors());

//MONGODB CONNECTION
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(console.error);

//IMPORTED ROUTES
const userRoute = require("./routes/User");
app.use("/user", userRoute);
const todoRoute = require("./routes/Todo");
app.use("/todo", todoRoute);

app.listen(3001, () => console.log("Server Started on port 3001"));