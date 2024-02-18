import Link from "next/link";
import LoginNav from "@/app/components/LoginNav";
import styles from "@/app/Home.module.css"; // Import a CSS module for styling

export default function Home() {
  return (
    <div className={styles.container}>

      <main className={styles.mainContent}>
        <div className={styles.contentCenter}>
        <h1>Welcome to Your Tutoring Assistant App</h1>
        <h2>Your one-stop solution for seamless tutoring experiences</h2>
          <p>
            Whether you're a student seeking help or a tutor offering your expertise,
            our tutoring assistant app is here to simplify the learning process.
          </p>

          <p>
            Explore a variety of subjects, find qualified tutors, and enhance your
            educational journey with our user-friendly platform.
          </p>

          <Link href="/signup">
            <p className={styles.getStartedButton}>Get Started</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
