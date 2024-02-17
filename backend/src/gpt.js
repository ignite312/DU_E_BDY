const OpenAI = require('openai');
const dotenv = require('dotenv');
dotenv.config();
class gpt{
    constructor(){
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
    }

    async Create_Written_Question(total_questions, subject, topics, difficulty) {
        const completion = await this.openai.chat.completions.create({
            messages: [{ role: "system", content: `Generate ${total_questions} question on
                Subject: ${subject},
                Topics: ${topics.join(', ')}
                put their difficulty to ${difficulty} out of 3
                Write them in the format:
                Question {number_of_question}: A ball is thrown at a velocity of 12m/s at an angle of 32 degrees with the horizontal. What are the ball's horizontal and vertical velocities?
                Strictly: Do not say anything extra`
            }],
            model: "gpt-4-0125-preview",
        });

        // console.log(completion.choices[0].message.content);
        return completion.choices[0].message.content;
    }
}

module.exports = gpt;