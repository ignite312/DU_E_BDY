"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { CiCirclePlus } from "react-icons/ci";
import katex from 'katex';
import 'katex/dist/katex.min.css';

export default function Classwork() {
    const [posts, setposts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch("http://10.100.161.41:8000/get-posts", {
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
        <div className="bg-white text-black flex flex-col h-screen">
            <div className="flex justify-end p-4">
                <div>
                    <Link href="/classwork/createnew">

                        <div className="btn btn-outline text-black">
                            <CiCirclePlus style={{ fontSize: '2em' }} />
                            Create New Question
                        </div>
                    </Link>
                </div>
                <div className="ml-2">
                    <Link href="/classwork/uploadQuestion">
                        <div className="btn btn-outline text-black">
                            <CiCirclePlus style={{ fontSize: '2em' }} />
                            Upload Question
                        </div>
                    </Link>
                </div>
            </div>

            <div className="flex justify-center flex-1">
    <div className="w-1/2">
    <ul className="questions-list space-y-4">
        {posts.map((post) => (
            <li key={post.id}>
                <div className="bg-gray-100 p-4 rounded-md shadow-md">
                    <h1 className="text-lg font-bold text-gray-800 mb-2">Author: {post.creator}</h1>
                    {/* Split the problems by comma and render each problem in a separate line */}
                    {post.problems.substring(2, post.problems.length - 2).split("\",\"").map((problem, index) => (
                        <p key={index} className="text-sm text-gray-600">{problem}</p>
                    ))}
                    <h1 className="text-sm text-gray-600 mt-2">Date Created: {post.posttime}</h1>
                </div>
            </li>
        ))}
    </ul>
</div>
</div>



        </div>
    );
}