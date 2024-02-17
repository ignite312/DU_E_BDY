const express = require('express');
const bodyparser= require('body-parser');
const cors = require('cors');
const gpt = require('./src/gpt');
const GeminiPro = require('./src/GeminiPro')

const PORT = 8000;
const gpt_Module = new gpt();
const gemini = new GeminiPro();

const app = express();

app.use(bodyparser.json());
app.use(cors());

app.post('/create-question', async (req, res) => {
    try{
        console.log('Received request: ', req.body);
        const {totalQuestions, subjectName, selectedTopics, difficultyLevel} = req.body;
        console.log('selected tops: ', req.body.selectedTopics);
        const results = await gpt_Module.Create_Written_Question(parseInt(totalQuestions), subjectName, selectedTopics, difficultyLevel);
        return res.status(200).json({results: results});
    } catch(err){
        console.error('Error creating question: ', err);
        return res.status(400);
    }
});

app.post('/create-question-gemini', async (req, res) => {
    try{
        console.log('Received request: ', req.body);
        const {totalQuestions, subjectName, selectedTopics, difficultyLevel} = req.body;
        console.log('selected tops: ', req.body.selectedTopics);
        const results = await gemini.Create_Written_Question(parseInt(totalQuestions), subjectName, selectedTopics, difficultyLevel);
        return res.status(200).json({results: results.split('\n\n')});
    } catch(err){
        console.error('Error creating question: ', err);
        return res.status(400);
    }
});

app.listen(PORT, (err) => {
    if(err){
        console.error('Error creating server: ', err);
    }
    else{
        console.log('Server running on: localhost:8000');
    }
});