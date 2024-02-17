const mysql = require('mysql2/promise'); // Import the promise-based version

class mysqlDB {
    constructor() {
        try{
            this.dbConfig = {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE
            };
            this.connection = mysql.createPool(this.dbConfig); // Use createPool for better performance
            console.log('Successfully connected to database');

            // Define all the relevant sql queries in variables
            this.ADDQUESTIONQUERY = 'call addquestion(?, ?, ?, ?, ?, ?)';
            this.ADDNEWPOSTQUERY = 'call addpost(?, ?, ?)';
            this.GETALLPOSTSUSER = 'SELECT * FROM POSTS where creator = ? ORDER BY posttime DESC';
        } catch(err){
            console.error('Error in mysqlDB construction: ', err);
            throw err;
        }
    }

    async addDescQuestion(creator, description, solution, subject, tags, difficulty){
        try{
            const [rows, fields] = await this.connection.execute(this.ADDQUESTIONQUERY, [creator, description, solution, subject, tags, difficulty]);
            console.log([creator, description, solution, subject, tags, difficulty]);
            console.log('Successfully added question');
        } catch(err){
            console.error('Error adding desc_question: ', err);
        }
    }

    async addNewPost(user, description, problems){
        try{
            const [rows, fields] = await this.connection.execute(this.ADDNEWPOSTQUERY, [user, description, problems]);
            console.log('Successfully added new post');
        } catch(err){
            console.error('Error adding new post to DB: ', err);
        }
    }

    async getAllPostsUser(username){
        try{
            const [rows, fields] = await this.connection.execute(this.GETALLPOSTSUSER, [username]);
            console.log('Successfully retrieved all posts', rows);
            return rows;
        } catch(err){
            console.error('Error getting all posts: ', err);
            return [];
        }
    }
}

module.exports = mysqlDB;
