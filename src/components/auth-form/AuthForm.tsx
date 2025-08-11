import { useState, type SyntheticEvent } from "react";
import { useAppDispatch } from "../../store/store";
import { Link } from "react-router";
import {
  loginUserThunk,
  registerUserThunk,
} from "../../store/slices/user-slice";

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
    if (type === "login")
      dispatch(loginUserThunk({ mail: mail, password: password }));
    else
      dispatch(
        registerUserThunk({ name: name, mail: mail, password: password })
      );

    setMail("");
    setName("");
    setPassword("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {type == "register" && (
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
          placeholder="Введте почту"
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
      </form>
      <div>
        <span>
          {type === "login" ? "Еще не зарегистрированы?" : "Уже есть аккаунт?"}
        </span>
        <Link to={type === "login" ? "/register" : "/login"}>
          {type === "login" ? "Зарегистрироваться" : "Войти"}
        </Link>
      </div>
    </div>
  );
};
