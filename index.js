const express = require('express');
const mongoose = require('mongoose');
const user = require('./routers/users');
const conn = require('./db/conn')

const app = express();

app.use(express.json());
app.use('/api/users', user);

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Listening on port ${port}`));