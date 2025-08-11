import { Link } from "react-router";
import { AuthForm } from "../../components";
import styles from "./register.module.css";

export const Register = () => {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← На главную
      </Link>
      <AuthForm type="register" />
    </div>
  );
};
