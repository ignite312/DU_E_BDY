'use client'
import React, { useState } from "react";
import katex from 'katex';
import 'katex/dist/katex.min.css';
import {useEffect, useRef } from 'react';


export default function UploadMaterial() {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the submission here (e.g., send data to backend)
        console.log("File:", file);
        console.log("Description:", description);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white text-black p-4">
                <h2 className="text-lg font-bold mb-4">Upload Material</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="file" className="block text-sm font-bold mb-2">Upload File (PDF or Image):</label>
                        <input type="file" id="file" accept=".pdf,image/*" onChange={handleFileChange} className="w-full border border-gray-300 rounded px-3 py-2 bg-white" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-bold mb-2">Description:</label>
                        <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} rows={4} className="w-full border border-gray-300 rounded px-3 py-2 bg-white" />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Submit</button>
                </form>
            </div>
        </div>
    );
}
