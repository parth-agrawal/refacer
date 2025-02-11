import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const app = express();
const apikey = "fuNfYFNWsXrkC7Oh9MppmxxHNzi8bZsk";
const api_base_url = "https://api.apilayer.com/face_pixelizer/url?url=";

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware setup for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/uploadPhoto', upload.single('imageFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded', rewef: req });
    }

    const file = req.file; // Uploaded file object
    const imageUrl = `https://refacer.onrender.com/uploads/${file.filename}`;
    const api_url = `${api_base_url}${imageUrl}`;

    var myHeaders = new Headers();
    myHeaders.append("apikey", apikey);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    debugger;

    fetch(api_url, requestOptions)
        .then(response => response.text())
        .then(jsonString => {
            const resultObject = JSON.parse(jsonString);
            const resultUrl = resultObject.result;
            console.log(resultUrl)
            res.send(resultUrl);
        })
        .catch(error => res.status(400).send({
            message: imageUrl
        }));
});

// Serve static files from the 'uploads/' directory
app.use('/uploads', express.static(uploadDir));

// Start the server
export const SERVER_URL = process.env.SERVER_URL
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${SERVER_URL}:${PORT}`);
});