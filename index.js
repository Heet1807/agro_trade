const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const user = require('./routers/users');
const conn = require('./db/conn')
const auth = require('./routers/auth');
const image = require('./routers/image');


const app = express();

if(!config.get('jwtPrivateKey')) {
    console.error('Something went wrong...........');
    process.exit(1);
}
console.log(config.get('jwtPrivateKey'));

app.use(express.json());
app.use('/users', user);
app.use('/auth',auth);
app.use('/image',image);

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Listening on port ${port}`));