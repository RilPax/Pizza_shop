import { useState, type SyntheticEvent } from "react";
import { useAppDispatch } from "../../store/store";
import { Link } from "react-router";
import {
  loginUserThunk,
  registerUserThunk,
} from "../../store/slices/user-slice";
import styles from "./auth-form.module.css";

interface AuthFormProps {
  type: "register" | "login";
}

export const AuthForm = ({ type }: AuthFormProps) => {
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (type === "login") dispatch(loginUserThunk({ mail, password }));
    else dispatch(registerUserThunk({ name, mail, password }));

    setMail("");
    setName("");
    setPassword("");
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {type === "register" && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            required
            placeholder="Введите имя"
          />
        )}
        <input
          onChange={(e) => setMail(e.target.value)}
          value={mail}
          type="email"
          placeholder="Введите почту"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          required
          placeholder="Введите пароль"
        />
        <button type="submit">
          {type === "login" ? "Войти" : "Зарегистрироваться"}
        </button>
        <div className={styles.switch}>
          <span>
            {type === "login"
              ? "Еще не зарегистрированы?"
              : "Уже есть аккаунт?"}
          </span>
          <Link to={type === "login" ? "/register" : "/login"}>
            {type === "login" ? "Зарегистрироваться" : "Войти"}
          </Link>
        </div>
      </form>
    </div>
  );
};
