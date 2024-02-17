'use client'
// Preview.js
import React from "react";

export default function Preview({ questions }) {
    if (!questions || !questions.results) {
        return <div>No questions to display</div>;
    }

    return (
        <div>
            <h1>Preview</h1>
            <ul>
                {questions.results.split("\n\n").map((question, index) => (
                    <li key={index}>{question}</li>
                ))}
            </ul>
        </div>
    );
}

