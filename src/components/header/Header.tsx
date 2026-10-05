import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { selectBasketCount } from "../../store/slices/basket-slice";
import { Icon } from "../icon/Icon";
import { Logo } from "../logo/Logo";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { to: "/", label: "Главная" },
  { to: "/menu", label: "Меню" },
  { to: "/#promo", label: "Акции" },
  { to: "/#delivery", label: "Доставка" },
  { to: "/#about", label: "О нас" },
  { to: "/#contacts", label: "Контакты" },
];

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user, isAuth } = useAppSelector((state) => state.user);
  const basketCount = useAppSelector(selectBasketCount);
  const favoritesCount = useAppSelector((state) => state.favorites.ids.length);

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [isMenuOpen, setMenuOpen] = useState(false);

  // Закрываем мобильное меню при переходе
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash, location.search]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isActive = (to: string) => {
    const [path, hash = ""] = to.split("#");
    if (hash) return location.pathname === path && location.hash === `#${hash}`;
    if (path === "/") return location.pathname === "/" && !location.hash;
    return location.pathname.startsWith(path);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/menu?q=${encodeURIComponent(q)}` : "/menu");
  };

  const searchForm = (
    <form className={styles.search} onSubmit={handleSearch} role="search">
      <Icon name="search" size={18} className={styles.searchIcon} />
      <label className="sr-only" htmlFor="site-search">Поиск</label>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск пиццы, напитков, блюд..."
        className={styles.searchInput}
      />
    </form>
  );

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Logo />

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`} aria-label="Основная навигация">
          <div className={styles.mobileSearch}>{searchForm}</div>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`${styles.navLink} ${isActive(link.to) ? styles.active : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.desktopSearch}>{searchForm}</div>

        <div className={styles.actions}>
          <Link to="/menu?fav=1" className={styles.iconButton} aria-label={`Избранное: ${favoritesCount}`}>
            <Icon name="heart" size={22} />
            {favoritesCount > 0 && <span className={styles.badge}>{favoritesCount}</span>}
          </Link>
          <Link to="/basket" className={styles.iconButton} aria-label={`Корзина: ${basketCount}`}>
            <Icon name="cart" size={22} />
            {basketCount > 0 && <span className={styles.badge}>{basketCount}</span>}
          </Link>

          {isAuth ? (
            <Link to="/profile" className={styles.profile} title="Профиль">
              <span className={styles.avatar}>{user?.name?.[0]?.toUpperCase() ?? "?"}</span>
              <span className={styles.profileName}>{user?.name}</span>
            </Link>
          ) : (
            <Link to="/login" className={styles.login}>
              <Icon name="user" size={20} />
              <span>Войти</span>
            </Link>
          )}

          <button
            type="button"
            className={styles.burger}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMenuOpen}
          >
            <Icon name={isMenuOpen ? "close" : "menu"} size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};
