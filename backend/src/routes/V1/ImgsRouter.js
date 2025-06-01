const express = require('express');
const router = express.Router();
const { UploadSingle, upload, GetImage } = require('../../functions/UpLoad');

router.use(express.json());

router.post('/upload', upload, UploadSingle);
router.get('/:filename', GetImage)

module.exports = router;