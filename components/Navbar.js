import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.logo}>
          DUV-DUV <span className={styles.gap}>GAP</span>
        </div>
        <a href="#contact" className={styles.cta}>KURSGA YOZILISH</a>
      </div>
    </nav>
  );
}
