'use strict';

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const verifyUser = require('./authorize.js');

const PORT = process.env.PORT || 3001;
const DB_URL = process.env.DB_URL ;

const app = express();

app.use(cors());
app.use(express.json());
app.use(verifyUser);

const mongoose = require('mongoose');

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Mongoose connected'));

app.post('/food',);
app.get('/food',);
app.get('/', );
app.put('/', );
app.delete('/', );

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
