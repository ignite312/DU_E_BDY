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
                Question {number_of_question}: A ball is thrown at a velocity of $12m/s$ at an angle of $32^o$ with the horizontal. What are the ball's horizontal and vertical velocities?
                Strictly: Do not say anything extra
                Strictly: wrap every equation and math notations in dollar signs as in latex equations
                `
            }],
            model: "gpt-4-0125-preview",
        });

        // console.log(completion.choices[0].message.content);
        return completion.choices[0].message.content;
    }
    async Create_Written_Question_PDF(total_questions, subject, topics, difficulty, data) {
        console.log("EINENENENENENE");
        const completion = await this.openai.chat.completions.create({
            messages: [{ role: "system", content: `Generate ${total_questions} questions based on the following problems
                ${data}

                These might be related to:
                Subject: ${subject},
                Topics: ${topics.join(', ')}

                If not related ignore:
                Subject: ${subject},
                Topics: ${topics.join(', ')}
                
                put their difficulty to ${difficulty} out of 3
                Write them in the format:
                Question {number_of_question}: A ball is thrown at a velocity of $12m/s$ at an angle of $32^o$ with the horizontal. What are the ball's horizontal and vertical velocities?
                Strictly: Do not say anything extra
                Strictly: wrap every equation and math notations in dollar signs as in latex equations
                `
            }],
            model: "gpt-4-0125-preview",
        });

        // console.log(completion.choices[0].message.content);
        return completion.choices[0].message.content;
    }
    async Make_New_Assessment(problemset, answerscript){
        const completion = await this.openai.chat.completions.create({
            messages: [{ role: "system", content: `Here's a problemset: ${problemset}
                Here's an answer script: ${answerscript}

                Assess the students' answer assuming each question is worth 10.
                Strictly: Just give a JSON string of the format
                {
                    Assessments: [
                        'your description on how the student did in the first problem',
                        'your description on how the student did in the second problem',
                        .
                        .
                        .
                    ],
                    Marks: [
                        Q1: marks on q1 out of 10,
                        Q2: marks on q2 out of 10,
                        .
                        .
                        .
                    ],
                    TotalMarks: total of of the marks in each question
                }
                Strictly: Do not say any extra words
                `
            }],
            model: "gpt-4-0125-preview",
        });

        // console.log(completion.choices[0].message.content);
        return completion.choices[0].message.content;
    }
}

module.exports = gpt;