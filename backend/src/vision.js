const fs = require('fs');
const axios = require('axios');

// OpenAI API Key
// const apiKey = "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";
const apiKey = process.env.OPENAI_API_KEY;

// Function to encode the image
function encodeImage(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  return Buffer.from(imageBuffer).toString('base64');
}

class vision{
    constructor(){
        this.headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          };
    }

    async TextFromImage(problemset, imagePath) {
        try {
            
            // Getting the base64 string
            const base64Image = encodeImage(imagePath);
            const payload = {
                "model": "gpt-4-vision-preview",
                "messages": [
                  {
                    "role": "user",
                    "content": [
                      {
                        "type": "text",
                        "text": `Here's a problemset: ${problemset}
                        And in the image is a students' answer script
        
                        Assess the students' answer assuming each question is worth 10.
                        An unrelated answer amounts to 0 in that question
                        Strictly: GIVE a JSON string of the format
                        {
                            Assessments: [
                                'your description on how the student did in the first problem',
                                'your description on how the student did in the second problem',
                                .
                                .
                                .
                            ],
                            Marks: [
                                'Q1: marks on q1 out of 10',
                                'Q2: marks on q2 out of 10',
                                .
                                .
                                .
                            ],
                            TotalMarks: total of of the marks in each question
                        }
                        Strictly: Do not say any extra words
                        DO NOT STRAY FROM THE JSON FORMAT
                        `
                      },
                      {
                        "type": "image_url",
                        "image_url": {
                          "url": `data:image/jpeg;base64,${base64Image}`
                        }
                      }
                    ]
                  }
                ],
                "max_tokens": 4096
              };
              
          const response = await axios.post("https://api.openai.com/v1/chat/completions", payload, { headers });
          console.log(response.data.choices[0].message.content);
          return response.data.choices[0].message.content;
        } catch (error) {
            console.error("Error loading image response: ");
          return "";
        }
      }
}

module.exports = vision;