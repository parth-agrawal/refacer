import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';


const app = express();
const apikey = "fuNfYFNWsXrkC7Oh9MppmxxHNzi8bZsk"
const api_base_url = "https://api.apilayer.com/face_pixelizer/url?url="

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())


app.get('/', (req, res) => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", apikey);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    // TODO Grab arbitrary files off of your local machine
    const todo = 'https://kaigeffen.com/assets/bio.jpg'
    const api_url = `${api_base_url}${todo}`

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

const URL = "http://localhost"
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on ${URL}:${PORT}`)
})


app.post('/upload', (req, res) => {
    const prompt = req.body.prompt;
    const file = req.body.file;

    res.send('received file: ' + file)


    console.log(file)
})