const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const testRouter = require('./routes/test');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/test';
const PORT = process.env.PORT || 55505;

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(testRouter);

app.get('*', (req, res) => res.status(404).end());

async function start() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useFindAndModify: false,
        });

        app.listen(PORT, () => {
            console.log('Server started!');
        });
    } catch (e) {
        console.error(e);
    }
}

start();
