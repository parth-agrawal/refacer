import bodyParser from 'body-parser';
import express from 'express';
const multer = require('multer'); // Middleware for handling multipart/form-data (file uploads)
const path = require('path');
const fs = require('fs');
import cors from 'cors';


const app = express();
const apikey = "fuNfYFNWsXrkC7Oh9MppmxxHNzi8bZsk"
const api_base_url = "https://api.apilayer.com/face_pixelizer/url?url="


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())



// Middleware setup for handling file uploads (Image gets sent)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

const upload = multer({ storage: storage });

// TODO Change get to post in client
app.post('/', upload.single('imageFile'), (req, res) => {
    const file = req.file // Uploaded file object

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Assuming the file is saved in the 'uploads/' directory
    const imageUrl = `https://example.com/uploads/${file.filename}`; // Replace with your domain and path

    // The url for the api endpoint
    const api_url = `${api_base_url}${imageUrl}`

    // Form the message to send the api endpoint

    var myHeaders = new Headers();
    myHeaders.append("apikey", apikey);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    fetch(api_url, requestOptions)
        .then(response => response.text())
        .then(jsonString => {
            const resultObject = JSON.parse(jsonString)

            // Get the URL for the now blurred image
            const resultUrl = resultObject.result

            // Send that as the response
            res.send(resultUrl)
        })
        .catch(error => res.status(400).send({
            message: error
        }));
})

// Serve static files from the 'uploads/' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
const URL = "http://localhost"
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${URL}:${PORT}`)
})


app.post('/upload', (req, res) => {
    const prompt = req.body.prompt;
    const file = req.body.file;

    res.send('received file: ' + file)


    console.log(file)
})