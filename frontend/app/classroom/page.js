import Link from "next/link"

export default function Classroom() {
    return (
        <div>
            <h1>Welcome to the Classroom</h1>
            <p>This is your site's landing page.</p>
            <nav>
                <ul>
                    <li>
                        <Link href="/">
                            Back to main
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}