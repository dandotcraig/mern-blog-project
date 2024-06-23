const express = require('express');
const cors = require('cors');
const app = express();
const User = require('./models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET;

app.use(cors({credentials:true, origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI);


app.post('/register',async (request, response) => {
    const {username, password} = request.body;
    try {
        const UserDoc = await User.create({
            username, 
            password:bcrypt.hashSync(password, salt),
        });
        response.json(UserDoc);
    } catch (error) {
        response.status(400).json(error)
    }
});

app.post('/login', async (request, response) => {
    const {username, password} = request.body;
    const UserDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, UserDoc.password)
    if (passOk) {
        jwt.sign({username, id:UserDoc._id}, secret, {}, (error, token) => {
            if (error) throw error;
            response.cookie('token', token).json('ok');
        })
    } else {
        response.status(400).json('wrong user info')
    }
});

app.get('/profile', (request, response) => {
    const {token} = request.cookies;
    jwt.verify(token, secret, {}, (error, info) => {
        if (error) throw error;
        response.json(info)
    });
    response.json(request.cookies)
});

app.listen(4000);