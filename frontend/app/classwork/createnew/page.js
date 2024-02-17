'use client'
import React, { useState } from "react";
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



export default function Classwork() {
    const [totalQuestions, setTotalQuestions] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [difficultyLevel, setDifficultyLevel] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [responseError, setResponseError] = useState(null);
    const [responsePreview, setResponsePreview] = useState(null);
    const [isFinalPreview, setIsFinalPreview] = useState(false);
    const [editableQuestions, setEditableQuestions] = useState([]);

    useEffect(() => {
        if (responsePreview) {
            const questions = responsePreview.split("\n\n").map((content, index) => ({
                id: index,
                content,
                isEditing: false,
                editedContent: content,
            }));
            setEditableQuestions(questions);
        }
    }, [responsePreview]);

    const toggleFinalPreview = () => setIsFinalPreview(!isFinalPreview);

    const toggleEdit = (index) => {
        setEditableQuestions(current =>
            current.map((q, i) => ({
                ...q,
                isEditing: i === index ? !q.isEditing : q.isEditing,
            }))
        );
    };

    const handleEditChange = (index, value) => {
        setEditableQuestions(current =>
            current.map((q, i) => (i === index ? { ...q, editedContent: value } : q))
        );
    };

    const saveEdit = (index) => {
        setEditableQuestions(current =>
            current.map((q, i) => {
                if (i === index) {
                    return { ...q, content: q.editedContent, isEditing: false };
                }
                return q;
            })
        );
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            totalQuestions,
            subjectName,
            selectedTopics,
            difficultyLevel
        };

        try {
            setSubmitting(true);
            const response = await fetch("http://10.100.161.41:8000/create-question", {
                method: "POST",
                headers:  {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log("Form submitted successfully!");
                console.log("Response Data:", responseData);
                setResponsePreview(responseData.results); // Set the response data for preview
                setResponseError(null); // Reset any previous error
            } else {
                const errorMessage = await response.text();
                console.error("Failed to submit form data:", errorMessage);
                setResponseError(errorMessage);
                setResponsePreview(null); // Clear any previous preview data
            }
        } catch (error) {
            console.error("Error submitting form data:", error);
            setResponseError("An error occurred while processing your request.");
            setResponsePreview(null); // Clear any previous preview data
        } finally {
            setSubmitting(false);
        }
    };
    const MathPreview = ({ content }) => {
        const [html, setHtml] = useState("");

        useEffect(() => {
            try {
                const parts = content.split(/\$(.*?)\$/); // Split by $ signs and capture the equation parts
                const htmlString = parts.map((part, index) => {
                    if (index % 2 === 0) {
                        // Not an equation, keep as is
                        return part;
                    } else {
                        try {
                            // Render equation using KaTeX
                            return katex.renderToString(part, { throwOnError: false });
                        } catch (error) {
                            console.error("KaTeX rendering error:", error);
                            // Display error message if KaTeX fails
                            return `<span class="text-red-500">Error rendering equation: ${part}</span>`;
                        }
                    }
                }).join(''); // Join all parts together
                setHtml(htmlString);
            } catch (error) {
                console.error("Error processing equations:", error);
                setHtml(`<span class="text-red-500">Error processing equations</span>`);
            }
        }, [content]);

        return <div dangerouslySetInnerHTML={{ __html: html }} />;
    };

    const generatePDF = () => {
        // Specify the element you want to capture. You can use a ref or document.getElementById
        const input = document.getElementById('divToPrint');

        html2canvas(input)
            .then((canvas) => {

                // The following parameters: 'p', 'mm', 'a4' set the PDF to portrait, use millimeters, and format to A4 size
                const pdf = new jsPDF({
                    orientation: 'p',
                    unit: 'mm',
                    format: 'a4'
                });

                // Add the image to the PDF. The parameters 0, 0 specify the x,y coordinates on the PDF to place the image
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                // Download the PDF
                pdf.save('download.pdf');
            });
    }


    // Dummy function for uploading questions
    const uploadQuestions = () => {
        console.log("Uploading questions...");
        // console.log(editableQuestions);
        const upload = async () => {
            let array = []
            for(let i = 0; i < editableQuestions.length; i++){
                array.push(editableQuestions[i].editedContent);
            }
            const resp = await fetch("http://10.100.161.41:8000/create-new-post", {
                method: "POST",
                headers:  {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: "emon",
                    subjectName: subjectName,
                    selectedTopics: selectedTopics,
                    difficultyLevel: difficultyLevel,
                    description: "",
                    problems: array
                })
            });
            if(!resp.ok){
                console.log("Kisui oise na")
            }
        }
        upload();
    };

    return (
        <div className="bg-white text-black flex justify-center items-center h-screen">
            <div className="p-4 w-80">
                <h1 className="text-2xl font-bold mb-4">Question Set Creation</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 ">
                        <label className="block text-sm font-bold mb-2" htmlFor="totalQuestions">Total Questions:</label>
                        <input type="number" id="totalQuestions" value={totalQuestions} onChange={(event) => setTotalQuestions(event.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 bg-white" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="subjectName">Subject Name:</label>
                        <select id="subjectName" value={subjectName} onChange={(event) => setSubjectName(event.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 bg-white">
                            <option value="">Select subject</option>
                            <option value="math">Math</option>
                            <option value="science">Science</option>
                            <option value="history">History</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Topics:</label>
                        <select multiple value={selectedTopics} onChange={(event) => setSelectedTopics(Array.from(event.target.selectedOptions, (option) => option.value))} className="w-full border border-gray-300 rounded px-3 py-2 bg-white">
                            {subjectName === "math" && (
                                <>
                                    <option value="algebra">Algebra</option>
                                    <option value="geometry">Geometry</option>
                                    <option value="trigonometry">Trigonometry</option>
                                    <option value="calculus">Calculus</option>
                                    <option value="statistics">Statistics</option>
                                </>
                            )}
                            {subjectName === "science" && (
                                <>
                                    <option value="biology">Biology</option>
                                    <option value="chemistry">Chemistry</option>
                                    <option value="physics">Physics</option>
                                    <option value="astronomy">Astronomy</option>
                                    <option value="earth science">Earth Science</option>
                                </>
                            )}
                            {subjectName === "history" && (
                                <>
                                    <option value="ancient history">Ancient History</option>
                                    <option value="medieval history">Medieval History</option>
                                    <option value="renaissance">Renaissance</option>
                                    <option value="world wars">World Wars</option>
                                    <option value="colonialism and imperialism">Colonialism and Imperialism</option>
                                </>
                            )}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="difficultyLevel">Difficulty Level:</label>
                        <select id="difficultyLevel" value={difficultyLevel} onChange={(event) => setDifficultyLevel(event.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 bg-white">
                            <option value="">Select difficulty level</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div className="flex justify-center ">
                        <button type="submit" disabled={submitting} className={`${submitting ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded`}>{submitting ? "Submitting..." : "Submit"}</button>
                    </div>
                </form>
                {responseError && <p className="text-red-500">{responseError}</p>}

            </div>

            <div className="h-full overflow-y-scroll p-4 w-3/4 ">
                <h2 className="text-xl font-bold mb-4">{isFinalPreview ? 'Final Preview' : 'Preview'}</h2>
                <ul className="list-disc pl-4" style={{ listStyleType: "none" }}>
                    {editableQuestions.map((question, index) => (
                        <li key={index} className="mb-4">
                            <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4"> {/* Added classes for the card and border */}
                                {isFinalPreview || !question.isEditing ? (
                                    <MathPreview content={question.content} />
                                ) : (
                                    <>
                                        <textarea value={question.editedContent} onChange={(e) => handleEditChange(index, e.target.value)}
                                            className="border border-gray-300 rounded px-3 py-2 mb-2 bg-white w-full" /> {/* Adjusted classes for full width */}
                                        <button onClick={() => saveEdit(index)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">Save</button>
                                    </>
                                )}
                                {!isFinalPreview && (
                                    <div className="mt-2"> {/* Added div for buttons alignment */}
                                        <button onClick={() => toggleEdit(index)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded mr-2">
                                            {question.isEditing ? 'Cancel' : 'Edit'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>

                {!isFinalPreview && (
                    <button onClick={toggleFinalPreview} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                        Show Final Preview
                    </button>
                )}
                {isFinalPreview && (
                    <div className="flex flex-row items-center justify-center space-x-4"> {/* Added justify-center for center alignment and space-x-4 for spacing */}
                        <button onClick={generatePDF} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4">
                            Create PDF
                        </button>
                        <button onClick={uploadQuestions} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4">
                            Upload Questions
                        </button>
                        <button onClick={toggleFinalPreview} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">
                            Back to Edit
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}