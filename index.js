const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const decodeRoute = require('./routes/decodeRoute');
const apiRoute = require('./routes/apiRoute');
const userRoute = require('./routes/userRoute');
//const parseResponse = require('./utilities/parseResponse');

dotenv.config({
    path: './config.env'
});

const app = express();

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	limit: 1000, // Limit each IP to 1000 requests per window
});

// MIDDLEWARES
app.use(limiter);
app.use(cors());
app.use(helmet());
app.use(express.json());

const DB_URL = process.env.DB_URL.replace('<password>', process.env.DB_PASSWORD);
mongoose.connect(DB_URL).then( () => {
    console.log("DB Connection success!");
}).catch( (err) => {
    console.log(err);
});

app.get(`/health`, (req,res)=> {
    //res.status(200).json( parseResponse('success', 'I\'M UP!') );
    res.status(200).send();
});

//ROUTES
app.use('/', decodeRoute);
app.use(`/api/${process.env.VERSION}/`, apiRoute);
app.use('/users', userRoute);


//SERVER
app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`);
});