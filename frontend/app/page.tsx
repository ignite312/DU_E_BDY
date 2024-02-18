import Link from "next/link";
import LoginNav from "@/app/components/LoginNav";
import styles from "@/app/Home.module.css"; // Import a CSS module for styling
import Image from 'next/image'; // Import the next/image component

export default function Home() {
  return (
    <div className={styles.container}>

      <main className={styles.mainContent}>
        <div className={styles.imageContainer}>
          <Image src="/testcraft.webp" alt="Your image" width={120} height={120} />
        </div>        <h1 className={styles.heading}>Hey, Welcome to Our Tutoring Assistant App</h1>
        <h2 className={styles.subHeading}>Your one-stop solution for seamless tutoring experiences</h2>
        <p className={styles.description}>
          Whether you're a student seeking help or a tutor offering your expertise,
          our tutoring assistant app is here to simplify the learning process.
        </p>

        <Link href="/classwork">
          <button className={styles.getStartedButton}>Get Started</button>
        </Link>
      </main>
    </div>
  );
}
