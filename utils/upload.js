//upload.js
const multer = require("multer");
const path = require("path");

const fileFilter = (req, file, cb) => {
  try {
    // 확장자 필터링
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true); // 해당 mimetype만 받겠다는 의미
    } else {
      // 다른 mimetype은 저장되지 않음
      req.fileValidationError = "jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다.";
      cb(null, false);
    }
  } catch (err) {
    // Handle any potential errors here
    console.error("Error in fileFilter:", err);
    cb(err); // Pass the error to the callback
  }
};

const storage = multer.diskStorage({
    //폴더위치 지정
    destination: (req, file, done) => {
      done(null, path.join(__dirname, "../images"));
    },
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname);
      // aaa.txt => aaa+&&+129371271654.txt
      const fileName = path.basename(file.originalname, ext) + Date.now() + ext;
      done(null, fileName);
    },
});
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});


module.exports = upload;