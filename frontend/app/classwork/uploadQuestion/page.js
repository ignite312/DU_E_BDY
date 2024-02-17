'use client'
import React, { useState } from "react";
import katex from 'katex';
import 'katex/dist/katex.min.css';

export default function UploadMaterial() {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Set the selected file
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const text = e.target.result;
                // Log the text content of the file
                console.log("File content:", text);
            };
            reader.readAsText(file); // Read the file as text
        }
        // Log the description for completeness
        // console.log("Description:", description);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white text-black p-4">
                <h2 className="text-lg font-bold mb-4">Upload Question</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="file" className="block text-sm font-bold mb-2">Upload File (TXT):</label>
                        <input type="file" id="file" accept=".txt" onChange={handleFileChange} className="w-full border border-gray-300 rounded px-3 py-2 bg-white" />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Upload</button>
                </form>
            </div>
        </div>
    );
}
