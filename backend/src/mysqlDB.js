const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

class mysqlDB {
    constructor() {
        try{
            this.dbConfig = {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE
            };
            this.connection = mysql.createConnection(this.dbConfig);
            this.connection.connect((err) => {
                if (err) {
                    console.error('Error connecting to database: ' + err.stack);
                    return;
                }
                console.log('Successfully connected to database: ' + this.connection.threadId);
            });


            // Define all the relevant sql queries in variables
            this.ADDQUESTIONQUERY = 'call addquestion(?, ?, ?, ?, ?, ?)';
            this.ADDNEWPOSTQUERY = 'call addpost(?, ?, ?)';
            this.GETALLPOSTSUSER = 'SELECT * FROM POSTS where creator = ? ORDER BY posttime DESC';
        } catch(err){
            if(err){
                console.error('Error in mysqlDB construction: ', err);
            }
            throw err;
        }
    }

    async addDescQuestion(creator, description, solution, subject, tags, difficulty){
        try{
            this.connection.query(this.ADDQUESTIONQUERY, [creator, description, solution, subject, tags, difficulty], (err, results, fields)=>{
                if(err){
                    console.error('Error inserting into desc_questions: ', err);
                }
                else{
                    console.log('Successfully added question');
                }
            });
        }catch(err){
            console.error('Error adding desc_question: ', err);
        }
    }

    async addNewPost(user, description, problems){
        try{
            this.connection.query(this.ADDNEWPOSTQUERY, [user, description, problems], (err, results, fields) => {
                if(err){
                    console.error('Error adding new post DB: ', err);
                }
                else{
                    console.log('Successfully addede new post');
                }
            });
        }catch(err){
            console.error('Error adding new post to DB: ', err);
        }
    }
    async getAllPostsUser(username){
        try{
            this.connection.query(this.GETALLPOSTSUSER, [username], (err, results, fields) => {
                if(err){
                    console.error('Error getting all posts: ', err);
                }
                else{
                    console.log('Successfully retrieved all posts');
                }
            });
        }catch(err){
            console.error('Error getting all posts: ', err);
        }
    }
}

module.exports = mysqlDB;
