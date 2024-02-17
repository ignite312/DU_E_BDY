'use client'
import React, { useState } from "react";
import Link from "next/link";

export default function Classwork() {
    // State variables to manage the form inputs
    const [totalQuestions, setTotalQuestions] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [difficultyLevel, setDifficultyLevel] = useState("");
    const [submitting, setSubmitting] = useState(false); // State variable to track form submission status

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            totalQuestions,
            subjectName,
            selectedTopics,
            difficultyLevel
        };
        console.log("Submitting Form Data:", JSON.stringify(formData));

    
        try {
            setSubmitting(true); // Set submitting state to true
            const response = await fetch("http://10.100.161.41:8000/create-question-gemini", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
    
            if (response.ok) {
                // Reset form inputs if submission is successful
                setTotalQuestions("");
                setSubjectName("");
                setSelectedTopics([]);
                setDifficultyLevel("");
    
                // Parse the JSON response and log it
                const responseData = await response.json();
                console.log("Form submitted successfully!");
                console.log("Response Data:", responseData); // Log the response data here
            } else {
                console.error("Failed to submit form data:", response.statusText);
            }
        } catch (error) {
            console.error("Error submitting form data:", error);
        } finally {
            setSubmitting(false);
        }
    };
    
    

    return (
        <div className="flex justify-center items-center h-full">
            <div className="p-4 w-80">
                <h1 className="text-2xl font-bold mb-4">Welcome to the Classwork</h1>

                {/* Form with inputs */}
                <form onSubmit={handleSubmit}>
                    {/* Input for total questions */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="totalQuestions">Total Questions:</label>
                        <input type="number" id="totalQuestions" value={totalQuestions} onChange={(event) => setTotalQuestions(event.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
                    </div>
                    {/* Selection for subject name */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="subjectName">Subject Name:</label>
                        <select id="subjectName" value={subjectName} onChange={(event) => setSubjectName(event.target.value)} className="w-full border border-gray-300 rounded px-3 py-2">
                            <option value="">Select subject</option>
                            <option value="math">Math</option>
                            <option value="science">Science</option>
                            <option value="history">History</option>
                        </select>
                    </div>
                    {/* Selection for topics */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Topics:</label>
                        <select multiple value={selectedTopics} onChange={(event) => setSelectedTopics(Array.from(event.target.selectedOptions, (option) => option.value))} className="w-full border border-gray-300 rounded px-3 py-2">
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
                    {/* Selection for difficulty level */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="difficultyLevel">Difficulty Level:</label>
                        <select id="difficultyLevel" value={difficultyLevel} onChange={(event) => setDifficultyLevel(event.target.value)} className="w-full border border-gray-300 rounded px-3 py-2">
                            <option value="">Select difficulty level</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    {/* Submit button */}
                    <div className="flex justify-end">
                        <button type="submit" disabled={submitting} className={`${submitting ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded`}>{submitting ? "Submitting..." : "Submit"}</button>
                    </div>
                </form>

                {/* Optional: Add a link using Next.js Link */}
                <div className="mt-4">
                    <Link href="/">Go back to homepage</Link>
                </div>
            </div>
        </div>
    );
}
