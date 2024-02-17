import React from "react";
import Link from 'next/link';

export default function Classwork() {
    return (
        <div className="bg-white text-black flex flex-col h-screen">
            <div className="flex justify-end p-4">
                <div>
                    <Link href="/classwork/createnew">
                        <div className="btn btn-outline text-black">
                            Create New Question
                        </div>
                    </Link>
                </div>
                <div className="ml-2">
                    <Link href="/classwork/upload">
                        <div className="btn btn-outline text-black">
                            Upload Question
                        </div>
                    </Link>
                </div>
            </div>

            <div className="flex justify-center  flex-1">
                <div className="w-1/2">
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