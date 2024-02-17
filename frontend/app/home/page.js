import Link from "next/link"

export default function home() {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
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