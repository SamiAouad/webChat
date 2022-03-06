const express = require('express')
const router = express.Router();

const db = require('database/db.js')
const multer = require('multer');
const path = require("path");

let storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({
    storage: storage
});

router.post('login', (req, res) => {
    console.log(req.body);
})