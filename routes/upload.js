const express = require('express');
const router = express.Router();

const { uploadAvatar } = require('../controllers/upload');

router.post('/', uploadAvatar);
