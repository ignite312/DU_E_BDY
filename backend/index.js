const express = require('express');
const bodyparser= require('body-parser');
const cors = require('cors');
const gpt = require('./src/gpt');
const GeminiPro = require('./src/GeminiPro');
const mysqlDB = require('./src/mysqlDB');

const PORT = 8000;
const gpt_Module = new gpt();
const gemini = new GeminiPro();
const newDB = new mysqlDB();

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

app.post('/create-new-post', (req, res) => {
    try{
        const user = req.body.username;
        const description = req.body.description;
        const problems = req.body.problems;
        const resultsarray = problems.split('\n\n');
        for(let i = 0; i < resultsarray.length; i++){
            newDB.addDescQuestion(user, resultsarray[i], "", subjectName, selectedTopics.join(' '), difficultyLevel);
        }
        newDB.addNewPost(user, description, problems);
        return res.json(200);
    } catch(err){
        console.error('Error creating new post: ', err);
        return res.status(400);
    }
});

app.post('/get-posts', (req, res)=>{
    try{
        const user = req.body.username;
        const results = newDB.GETALLPOSTSUSER(user);
    } catch(err){
        console.error('Error creating question: ', err);
        return res.status(400);
    }
});

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
    if(err){
        console.error('Error creating server: ', err);
        return;
    }
    else{
        console.log('Server running on: localhost:8000');
    }
});