import Image from "next/image";
import Link from "next/link";
// import Navbar from "@/app/components/Navbar"
import LoginNav from "@/app/components/LoginNav"

export default function Home() {
  return (
    <div>
      hello World
      <nav>
        <ul>
          <li>
            <Link href="/home">
              Home
            </Link>
          </li>x
        </ul>
      </nav>
    </div>
  );
}
