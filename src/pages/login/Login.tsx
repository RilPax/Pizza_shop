import { Link } from "react-router";
import { AuthForm } from "../../components";
import styles from "./login.module.css";

export const Login = () => {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← На главную
      </Link>
      <AuthForm type="login" />
    </div>
  );
};
