const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const globalError = require('./middlewares/errorMiddleware');
dotenv.config( {path: 'config.env' });
const dbConnection = require("./config/database");
const questionRoute = require("./routes/questionRoute")
const ApiError = require("./utils/apiError");

dbConnection();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads/profileImage')));

if (process.env.NODE_ENV == "development") {
    app.use(morgan("dev"));
    console.log(process.env.NODE_ENV);
}

app.use("/question",questionRoute);

app.all("*name", (req, res, next) => {
    //Create error and send it to error handling middleware
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

  //Global error handling middleware for express
app.use(globalError);


const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});

//handle rejection outside express
process.on("unhandledRejection", (err) => {
    console.error(`unhandledRejection: ${err.name} | ${err.message}`);
    server.close(() => {
    console.error(`Shutting down...`);
    process.exit(1);
    });
});