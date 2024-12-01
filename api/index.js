import express from 'express';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(import.meta.dirname, 'uploads')));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, import.meta.dirname + "/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
  });

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(8800, () => {
    console.log("Connected")
});

