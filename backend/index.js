const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const gpt = require('./src/gpt');
// const GeminiPro = require('./src/GeminiPro');
const mysqlDB = require('./src/mysqlDB');
const fs = require('fs');
const fileReader = require('./src/fileReader');
const vision = require('./src/vision');
const multer = require('multer');
const path = require('path');


function isJsonString(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (error) {
        return false;
    }
}

const PORT = 8000;
const gpt_Module = new gpt();
// const gemini = new GeminiPro();
const newDB = new mysqlDB();
const filereader = new fileReader();
const vision_module = new vision();
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const app = express();

app.use(bodyparser.json());
app.use(cors());

app.post('/create-question', async (req, res) => {
    try {
        console.log('Received request: ', req.body);
        const { totalQuestions, subjectName, selectedTopics, difficultyLevel } = req.body;
        console.log('selected tops: ', req.body.selectedTopics);
        const results = await gpt_Module.Create_Written_Question(parseInt(totalQuestions), subjectName, selectedTopics, difficultyLevel);
        return res.status(200).json({
            results: results
        });
    } catch (err) {
        console.error('Error creating question: ', err);
        return res.status(400);
    }
});

app.post('/create-new-post', async (req, res) => {
    try {
        const user = req.body.username;
        const subjectName = req.body.subjectName;
        const selectedTopics = req.body.selectedTopics;
        const difficultyLevel = req.body.difficultyLevel;
        const description = req.body.description;
        const problems = req.body.problems;
        console.log(typeof (problems));
        for (let i = 0; i < problems.length; i++) {
            console.log(problems[i]);
            await newDB.addDescQuestion(user, problems[i], "", subjectName, selectedTopics.join(' '), difficultyLevel);
        }
        await newDB.addNewPost(user, description, problems);
        return res.status(200);
    } catch (err) {
        console.error('Error creating new post: ', err);
        return res.status(400);
    }
});

app.post('/get-posts', async (req, res) => {
    try {
        const user = req.body.username;
        const results = await newDB.getAllPostsUser(user);
        console.log("got all posts", results);
        return res.status(200).json(results);
    } catch (err) {
        console.error('Error creating question: ', err);
        return res.status(400);
    }
});

app.post('/create-questions-using-pdf', async (req, res) => {
    try {
        console.log('Received request: ', req.body);
        const { totalQuestions, subjectName, selectedTopics, difficultyLevel, text } = req.body;
        // filereader.readfile(filepath);
        console.log('selected tops: ', req.body.selectedTopics);
        const results = await gpt_Module.Create_Written_Question_PDF(parseInt(totalQuestions), subjectName, selectedTopics, difficultyLevel, text);
        return res.status(200).json({
            results: results
        });
    } catch (err) {
        console.error('Error creating question: ', err);
        return res.status(400);
    }
});

app.post('/assessment', async (req, res) => {
    try {
        console.log(req.body);
        const { problemset, answerscript } = req.body;
        let results;
        while (!isJsonString(results)) { results = await gpt_Module.Make_New_Assessment(problemset, answerscript); }
        return res.status(200).json({
            results: JSON.parse(results)
        });
    } catch (err) {
        console.error('Error making assessment: ', err);
        return res.status(400);
    }
});

app.post('/assessment-image', upload.single('image'), async (req, res) => {
    try {
        // console.log(req.body, "Aise");
        // const { problemset, _ } = req.body;
        const file = req.file;
        const problemset = req.body.json_data;

        if (!file) {
            return res.status(400).json({
                error: "No images"
            });
        }
        console.log('AIse to file');

        const imageBuffer = file.buffer;
        const imageName = `${Date.now()}_${req.file.originalname}`;
        const imagePath = path.join(__dirname, 'src', imageName);

        // Writing the image to a file
        await fs.writeFile(imagePath, imageBuffer, (error) => {
            if (error) {
                console.log('Error writing image: ', error);
                res.status(500).json({ error: "Failed saving file" });
            }
            else{
                console.log('Successfully downloaded image');
            }
        });

        // let results;
        // while (!isJsonString(results)) {
        const results = await vision_module.TextFromImage(problemset, imagePath);
        // }

        return res.status(200).json({
            results: results
        });
    } catch (err) {
        console.error('Error making assessment: ', err);
        return res.status(400);
    }
});

// app.post('/pdf-upload')

// app.post('/create-question-gemini', async (req, res) => {
//     try{
//         console.log('Received request: ', req.body);
//         const {totalQuestions, subjectName, selectedTopics, difficultyLevel} = req.body;
//         console.log('selected tops: ', req.body.selectedTopics);
//         const results = await gemini.Create_Written_Question(parseInt(totalQuestions), subjectName, selectedTopics, difficultyLevel);
//         const resultsarray =
//         return res.status(200).json({results: results.split('\n\n')});
//     } catch(err){
//         console.error('Error creating question: ', err);
//         return res.status(400);
//     }
// });

app.listen(PORT, (err) => {
    if (err) {
        console.error('Error creating server: ', err);
        return;
    }
    else {
        console.log('Server running on: localhost:8000');
    }
});