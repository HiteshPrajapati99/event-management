import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(fs.existsSync("./uploads"));

    if (!fs.existsSync("./uploads")) {
      fs.mkdirSync("./uploads");
    }

    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });
