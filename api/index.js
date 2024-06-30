const express = require('express');
const cors = require('cors');
const app = express();
const User = require('./models/User');
const Post = require('./models/Post.js')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');


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
            response.cookie('token', token).json({
                id:UserDoc._id,
                username,
            });
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
    // response. (request.cookies)
});

app.post('/logout', (request, response) => {
    response.cookie('token', '').json('ok');
});

app.post('/post', uploadMiddleware.single('file'), async (request, response) => {
    const {originalname, path} = request.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath );

    const {token} = request.cookies;
    jwt.verify(token, secret, {}, async (error, info) => {
        if (error) throw error;
        const {title, summary, content} = request.body;
        const postDoc = await Post.create({
            title, 
            summary,
            content,
            cover: newPath,
            author: info.id,
        });
        response.json(postDoc);
        response.json(info)
    });
});

app.get('/post', async (request, response) => {
    response.json(await Post.find().populate('author', ['username']));
});


app.listen(4000);