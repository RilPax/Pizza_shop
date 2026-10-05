import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  clearUserError,
  loginUserThunk,
  registerUserThunk,
} from "../../store/slices/user-slice";
import { Icon } from "../icon/Icon";
import { Logo } from "../logo/Logo";
import styles from "./auth-form.module.css";

interface AuthFormProps {
  type: "register" | "login";
}

export const AuthForm = ({ type }: AuthFormProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { loading, error } = useAppSelector((state) => state.user);
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = type === "login";

  useEffect(() => {
    dispatch(clearUserError());
  }, [dispatch, type]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLogin) dispatch(loginUserThunk({ mail, password }));
    else dispatch(registerUserThunk({ name, mail, password }));
  };

  return (
    <div className={styles.page}>
      <aside className={styles.visual}>
        <div className={styles.visualContent}>
          <p className={styles.visualTitle}>
            Горячая пицца
            <br />
            за 30 минут
          </p>
          <p className={styles.visualText}>
            Зарегистрируйтесь и получите скидку 10% на первый заказ по промокоду <strong>PIZZA10</strong>
          </p>
        </div>
      </aside>

      <div className={styles.formSide}>
        <div className={styles.top}>
          <Logo />
          <Link to="/" className={styles.back}>
            <Icon name="arrowLeft" size={18} />
            На главную
          </Link>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.title}>{isLogin ? "С возвращением!" : "Создать аккаунт"}</h1>
          <p className={styles.subtitle}>
            {isLogin
              ? "Войдите, чтобы оформить заказ"
              : "Пара секунд — и можно заказывать"}
          </p>

          {!isLogin && (
            <label className={styles.label}>
              Имя
              <input
                className="field"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                required
                placeholder="Как к вам обращаться"
                autoComplete="name"
              />
            </label>
          )}
          <label className={styles.label}>
            Почта
            <input
              className="field"
              onChange={(e) => setMail(e.target.value)}
              value={mail}
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </label>
          <label className={styles.label}>
            Пароль
            <input
              className="field"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
              minLength={isLogin ? undefined : 6}
              placeholder={isLogin ? "Ваш пароль" : "Минимум 6 символов"}
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </label>

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={loading}>
            {loading ? "Секундочку..." : isLogin ? "Войти" : "Зарегистрироваться"}
          </button>

          <p className={styles.switch}>
            {isLogin ? "Ещё нет аккаунта?" : "Уже есть аккаунт?"}
            <Link to={isLogin ? "/register" : "/login"} replace state={location.state}>
              {isLogin ? "Зарегистрироваться" : "Войти"}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
