import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { logout } from "../../store/slices/user-slice";

export const Header = () => {
  const { isAuth, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <Link to="/">Магазин</Link>
      <nav>
        <Link to="/basket">Корзина</Link>
        {isAuth ? (
          <>
            <Link to="/profile">{user?.name}</Link>
            <button onClick={() => dispatch(logout())}>Выйти</button>
          </>
        ) : (
          <Link to="/login">Войти</Link>
        )}
      </nav>
    </header>
  );
};
