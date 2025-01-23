const express = require('express');
const multer = require('multer');
const { getEmailLayout, uploadImage, uploadEmailConfig, renderAndDownloadTemplate } = require('../controllers/emailController');

const router = express.Router();

// Configure multer for image uploads
const upload = multer({ dest: 'public/uploads/' });

router.get('/getEmailLayout', getEmailLayout);
router.post('/uploadImage', upload.single('image'), uploadImage);
router.post('/uploadEmailConfig', uploadEmailConfig);
router.post('/renderAndDownloadTemplate', renderAndDownloadTemplate);

module.exports = router;
