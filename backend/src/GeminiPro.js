const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

// use this class to generate 
class GeminiPro{
    constructor(){
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({
            model: "gemini-pro"
        });
    }

    async Create_Written_Question(total_questions, subject, topics, difficulty) {
        const result = await this.model.generateContent(`Generate ${total_questions} question on
        Subject: ${subject},
        Topics: ${topics.join(', ')}
        put their difficulty to ${difficulty} out of 3
        Write them in the format:
        Question {number_of_question}: A ball is thrown at a velocity of 12m/s at an angle of 32 degrees with the horizontal. What are the ball's horizontal and vertical velocities?
        Strictly: Do not say anything extra`);
        const response = await result.response;
        const text = response.text();
        return text;
    }
}

module.exports = GeminiPro;