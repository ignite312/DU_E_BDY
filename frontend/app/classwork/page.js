'use client'
import React, { useState } from "react";
import 'katex/dist/katex.min.css';
import Link from 'next/link';


export default function Classwork() {
    return (
        <div className="bg-white text-black flex justify-center items-center h-screen">
            <div className="flex flex-col md:flex-row items-center w-full md:w-4/5">
            <ul className="menu menu-horizontal mb-4 md:mb-0 flex">
    <li className="mr-2 flex-grow">
        <Link href="/classwork/createnew">
            <div className="btn btn-outline text-black w-full border border-black flex justify-center items-center">
                Create New Question
            </div>
        </Link>
    </li>
    <li className="flex-grow">
        <Link href="/classwork/upload">
            <div className="btn btn-outline text-black w-full border border-black flex justify-center items-center">
                Upload Question
            </div>
        </Link>
    </li>
</ul>


                <div className="questions-container w-full md:w-3/4">
                    <ul className="questions-list space-y-4">
                        <li>
                            <div className="bg-gray-100 p-4 rounded-md shadow-md">
                                <p className="text-sm text-gray-600">ID: 1</p>
                                <p className="font-bold text-lg">Question 1 Description</p>
                                <p className="text-sm">Subject: Math</p>
                                <p className="text-sm">Date: 2024-02-17</p>
                            </div>
                        </li>
                        <li>
                            <div className="bg-gray-100 p-4 rounded-md shadow-md">
                                <p className="text-sm text-gray-600">ID: 2</p>
                                <p className="font-bold text-lg">Question 2 Description</p>
                                <p className="text-sm">Subject: Science</p>
                                <p className="text-sm">Date: 2024-02-18</p>
                            </div>
                        </li>
                        <li>
                            <div className="bg-gray-100 p-4 rounded-md shadow-md">
                                <p className="text-sm text-gray-600">ID: 3</p>
                                <p className="font-bold text-lg">Question 3 Description</p>
                                <p className="text-sm">Subject: History</p>
                                <p className="text-sm">Date: 2024-02-19</p>
                            </div>
                        </li>
                        {/* Add more question cards here */}
                    </ul>
                </div>
            </div>
        </div>
    );
}
