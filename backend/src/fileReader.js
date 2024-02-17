const axios = require('axios');
const fs = require('fs');
const path = require('path');


class fileReader{
    // async readfile(filepath){
    //     const response = await axios({
    //         method: 'GET',
    //         url: `http://localhost:3000/${filepath}`, // URL to your Next.js API route
    //         responseType: 'arraybuffer' // Important for binary content like PDFs
    //     });
    //     return response.data;
    // }

    async readfile(filepath){
        return fs.readFile("../database/materials/baler.pdf", 'utf-8', (err, data) => {
            if(err){
                console.log(err);
                return '';
            }
            else{
                return data;
            }
        });
    }
}

module.exports = fileReader;