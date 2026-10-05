import { Link } from "react-router-dom";
import styles from "./logo.module.css";

interface LogoProps {
  light?: boolean;
}

export const Logo = ({ light = false }: LogoProps) => (
  <Link to="/" className={`${styles.logo} ${light ? styles.light : ""}`} aria-label="PizzaShop — на главную">
    <svg className={styles.mark} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M6 8c14 0 27 6 36 16L10 42Z" fill="#ffb21a" />
      <path d="M6 8c14 0 27 6 36 16l-4 3C31 18 20 13 6 13Z" fill="#e31d24" />
      <circle cx="17" cy="22" r="3" fill="#e31d24" />
      <circle cx="25" cy="27" r="2.6" fill="#e31d24" />
      <circle cx="15" cy="32" r="2.4" fill="#e31d24" />
    </svg>
    <span className={styles.text}>
      <span className={styles.accent}>Pizza</span>Shop
    </span>
  </Link>
);
