const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Cấu hình nơi lưu trữ và tên file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images')); // Thư mục lưu ảnh
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + ext);
    }
});

// Lọc file chỉ nhận ảnh (jpg, jpeg, png)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ chấp nhận file ảnh'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Giới hạn: 5MB
});

// Middleware xử lý upload ảnh
const UploadSingle = (req, res, next) => {

    console.log(req.file);

    if (!req.file) {
        return res.status(400).json({ error: 'Không có file được upload' });
    }

    res.json({
        message: 'Upload thành công',
        filePath: `/images/${req.file.filename}` // Đường dẫn public
    });
};

const GetImage = (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, `../public/images/${filename}`); // Đường dẫn tuyệt đối đến file trên server

    console.log(`Yêu cầu lấy file: ${filename}. Đường dẫn trên server: ${filePath}`);

    // Kiểm tra file có tồn tại không
    if (fs.existsSync(filePath)) {
        // Gửi file về cho client
        // Trình duyệt hoặc Postman sẽ tự động hiển thị ảnh nếu Content-Type đúng
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Lỗi khi gửi file:', err);
                if (!res.headersSent) { // Kiểm tra xem header đã được gửi chưa để tránh lỗi "Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
                    res.status(500).send('Lỗi khi gửi file.');
                }
            } else {
                console.log(`Đã gửi file ${filename} thành công.`);
            }
        });
    } else {
        console.log(`File ${filename} không tồn tại.`);
        res.status(404).send('File không tìm thấy.');
    }
}

module.exports = {
    upload: upload.single('image'), // 'image' là tên field trong form
    UploadSingle: UploadSingle,
    GetImage: GetImage
};
