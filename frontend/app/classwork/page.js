"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { CiCirclePlus } from "react-icons/ci";
import katex from 'katex';
import 'katex/dist/katex.min.css';

const MathPreview = ({ content }) => {
    const [html, setHtml] = useState("");

    useEffect(() => {
        let htmlString = '';
        try {
            const parts = content.split(/\$(.*?)\$/).map((part, index) => {
                if (index % 2 === 0) {
                    return part; // Regular text
                } else {
                    try {
                        return katex.renderToString(part, {
                            throwOnError: false,
                        });
                    } catch (error) {
                        console.error("KaTeX rendering error:", error);
                        return `<span class="text-red-500">Error rendering equation: ${part}</span>`;
                    }
                }
            });

            htmlString = parts.join('');
        } catch (error) {
            console.error("Error processing equations:", error);
            htmlString = `<span class="text-red-500">Error processing equations</span>`;
        }
        setHtml(htmlString);
    }, [content]);

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
};


export default function Classwork() {
    const [posts, setposts] = useState([]);
    const [totalmarks, settotalmarks] = useState({});
    const [file, setFile] = useState(null);
    const [image, setimage] = useState(null);
    const [linkInput, setLinkInput] = useState(null); // Added state for link input
    const [description, setDescription] = useState("");
    const [myStr, setmyStr] = useState("");
    const [assessment, setassessment] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch("http://192.168.225.64:8000/get-posts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: "emon"
                    })
                });
                const responseData = await resp.json();
                setposts(responseData);
            } catch (err) {
                console.error('Error getting posts: ', err);
            }
        };
        fetchData();
    }, []);
    const parseProblems = (problems) => {
        try {
            return JSON.parse(problems);
        } catch {
            // If JSON.parse fails, assume it's a single string
            return [problems]; // Wrap in array for consistent handling
        }
    };
    const handleFileChange = (event, problemset) => {
        console.log(event);
        setFile(event.target.files[0]); // Set the selected file
        // setFile(event.target.file[1]);
        console.log(file);
        setmyStr(problemset);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const text = e.target.result;
                // Log the text content of the file
                // console.log("Problems : ", problemset);
                console.log(myStr); // this is the question to be send for checking script
                console.log("File content:", text); // this is the answer we need to check based on the question
                const fetchData = async () => {
                    try {
                        const resp = await fetch("http://192.168.225.64:8000/assessment", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                problemset: myStr,
                                answerscript: text
                            })
                        });
                        const responseData = await resp.json();
                        console.log(responseData);
                        let tmarks = totalmarks;
                        const arr = JSON.parse(myStr);
                        let ttal = arr.length * 10;
                        tmarks = {
                            obtained: responseData.results.TotalMarks,
                            total: ttal
                        };
                        settotalmarks(tmarks);
                        setassessment(responseData);
                        console.log(totalmarks);

                        alert(tmarks.obtained + ' / ' + tmarks.total);
                    } catch (err) {
                        console.error('Error getting posts: ', err);
                    }
                }
                fetchData();

            };
            reader.readAsText(file); // Read the file as text
        }
        else if (linkInput) {
            const fetchData = async () => {
                try {
                    const resp = await fetch("http://192.168.225.64:8000/assessment-image", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            problemset: myStr,
                            url: linkInput
                        })
                    });
                    const responseData = await resp.json();
                    console.log(responseData);
                    let tmarks = totalmarks;
                    const arr = JSON.parse(myStr);
                    let ttal = arr.length * 10;
                    tmarks = {
                        obtained: responseData.results,
                        total: ttal
                    };
                    settotalmarks(tmarks);
                    setassessment(responseData);
                    console.log(totalmarks);

                    alert(tmarks.obtained + ' / ' + tmarks.total);
                } catch (err) {
                    console.error('Error getting posts: ', err);
                }
            }
            fetchData();
        }
        // Log the description for completeness
        // console.log("Description:", description);
    };

    const handleImageChange = (event, problemset) => {
        // setimage(event.target.file);
        setmyStr(problemset);
        const file = event.target.files[0]; // Check if files array is defined

        if (file) {
            // Proceed with handling the file
            // ...
            console.log("file got it");
            setimage(file);
        } else {
            console.error('No file selected');
        }
    }



    const handleImageSubmit = async (event) => {
        event.preventDefault();
        if (!image) {
            return;
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('json_data', JSON.stringify({ problemset: myStr }));
        // Log the description for completeness
        // console.log("Description:", description);
        try {
            // Send the formData to the server using an HTTP request, for example, using fetch
            const response = await fetch("http://192.168.225.64:8000/assessment-image", {
                method: "POST",
                body: formData
            });

            const responseData = await resp.json();
            console.log(responseData);
            let tmarks = totalmarks;
            const arr = JSON.parse(myStr);
            let ttal = arr.length * 10;
            tmarks = {
                obtained: responseData.results,
                total: ttal
            };
            settotalmarks(tmarks);
            setassessment(responseData);
            console.log(totalmarks);

            alert(tmarks.obtained + ' / ' + tmarks.total);
        } catch (err) {
            console.error('Error getting posts: ', err);
        }
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch("http://192.168.225.64:8000/get-posts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: "emon"
                    })
                });
                const responseData = await resp.json();
                console.log(responseData);
                setposts(responseData);
                console.log(responseData);
            } catch (err) {
                console.error('Error getting posts: ', err);
            }
        }
        fetchData();
    }, []);
    const renderMathEquation = (equation) => {
        try {
            // Render equation using KaTeX
            return katex.renderToString(equation, { throwOnError: false });
        } catch (error) {
            console.error("KaTeX rendering error:", error);
            // Display error message if KaTeX fails
            return `<span class="text-red-500">Error rendering equation: ${equation}</span>`;
        }
    };

    return (
        <div className="bg-white text-black flex flex-col min-h-screen">
            <div className="flex justify-end p-4">
                <div>
                    <Link href="/classwork/createnew">
                        <div className="btn btn-outline text-black">
                            <CiCirclePlus style={{ fontSize: '2em' }} />
                            Create New Question
                        </div>
                    </Link>
                </div>

            </div>
            <div className="flex flex-1 justify-center items-center flex-col"> {/* Center the content */}
                <h1 className="title" style={{ fontSize: '2.5rem' }}>All of Past Questions</h1>
                {/* Render posts */}
            </div> 
            <div className="flex justify-center flex-1 px-4">
                <div className="w-full max-w-4xl">
                    <ul className="space-y-8">
                        {posts.map((post, index) => (
                            <li key={post.id} className="bg-gray-100 p-6 rounded-lg shadow">
                                <h1 className="text-lg font-bold text-gray-800 mb-4">Author: {post.creator}</h1>
                                {parseProblems(post.problems).map((problem, idx) => (
                                    <div key={idx} className="mb-2 p-4 border-2 border-gray-200 rounded-lg bg-white shadow-sm">
                                        <MathPreview content={problem} />
                                    </div>
                                ))}
                                <h1 className="text-sm text-gray-600 mt-4">Date Created: {new Date(post.posttime).toLocaleString()}</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="mt-4">
                                        <label htmlFor={`file-${index}`} className="block text-sm font-bold mb-1">Upload Txt (.txt):</label>
                                        <input type="file" id={`file-${index}`} accept=".txt" onChange={(event) => handleFileChange(event, post.problems)} className="w-full border border-gray-300 rounded px-3 py-2 bg-white" />
                                    </div>
                                    <button type="submit" className="mt-4 btn btn-neutral text-white font-bold py-2 px-4 rounded">Check Script</button>
                                </form>

                                <div className="divider">OR</div>

                                <form onSubmit={handleImageSubmit}>
                                    <div className="mt-4">
                                        <label htmlFor={`file-${index}`} className="block text-sm font-bold mb-1">Upload Image(.png):</label>
                                        <input type="file" id={`file-${index}`} accept=".png" onChange={(event) => handleImageChange(event, post.problems)} className="w-full border border-gray-300 rounded px-3 py-2 bg-white" />
                                    </div>
                                    <button type="submit" className="mt-4 btn btn-primary  text-white font-bold py-2 px-4 rounded">Upload your solution</button>
                                </form>

                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

