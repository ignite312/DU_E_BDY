"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { CiCirclePlus } from "react-icons/ci";

export default function Classwork() {
    const [posts, setposts] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try{
                const resp = await fetch("http://10.100.161.41:8000/get-posts", {
                    method: "POST",
                    headers:  {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: "emon"
                    })
                });
                const responseData = await resp.json();
                console.log(responseData);
                setposts(responseData);
            } catch(err){
                console.error('Error getting posts: ', err);
            }
        }
        fetchData();
    }, []);
    // const posts = [
    //     {
    //         id: 1,
    //         responseData: {
    //             description: "kutta",
    //             problems: "nai"
    //         }
    //     },
    //     {
    //         id: 2,
    //         responseData: {
    //             description: "bilai",
    //             problems: "ase"
    //         }
    //     }
    // ];
    
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

            <div className="flex justify-center  flex-1">
                <div className="w-1/2">
                    {posts.map((post) => (
                        <ul className="questions-list space-y-4" key={post.id}>
                            <li>
                                <div className="bg-gray-100 p-4 rounded-md shadow-md">
                                    <h1>{post.creator}</h1>
                                    <h2>{post.description}</h2>
                                    <p>{post.problems}</p>
                                    {/* <p>{post.responseData}</p> */}
                                </div>
                            </li>
                            {/* Add more question cards here */}
                        </ul>
                    ))
                    }
                </div>
            </div>
        </div>
    );
}