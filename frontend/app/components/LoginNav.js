import Link from 'next/link';
import { FaChalkboardTeacher } from 'react-icons/fa';
import Image from 'next/image'; // Import the next/image component

const LoginNav = () => {
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <Image src="/testcraft.webp" alt="Your image" width={50} height={50} className="mr-2" />

                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <Link href="/app/classroom">
                                    Materials
                                </Link>
                            </li>
                            <li>
                                <Link href="/app/classwork">
                                    Problem Set
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Link href="/" className="btn btn-ghost text-xl">
                        Test-Craft
                    </Link>
                </div>
                <div className="navbar-end">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link href="/classroom">
                                Materials
                            </Link>
                        </li>
                        <li>
                            <Link href="/classwork">
                                Problem Set
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LoginNav;
