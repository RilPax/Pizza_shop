import { Link } from "react-router-dom";
import { CATEGORIES, CONTACTS } from "../../utils/constants";
import { Icon } from "../icon/Icon";
import { Logo } from "../logo/Logo";
import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer} id="contacts">
      <div className={`container ${styles.grid}`}>
        <div className={styles.about}>
          <Logo light />
          <p className={styles.text}>
            Горячая пицца из свежих ингредиентов с доставкой по всему Ташкенту.
            Готовим с любовью с 2020 года.
          </p>
          <div className={styles.socials}>
            <a href="https://t.me/" target="_blank" rel="noreferrer" aria-label="Telegram" className={styles.social}>
              <Icon name="send" size={18} />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className={styles.social}>
              <Icon name="instagram" size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className={styles.title}>Меню</h3>
          <ul className={styles.links}>
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link to={`/menu?category=${c.id}`}>{c.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={styles.title}>Информация</h3>
          <ul className={styles.links}>
            <li><Link to="/#promo">Акции</Link></li>
            <li><Link to="/#delivery">Доставка и оплата</Link></li>
            <li><Link to="/#about">О нас</Link></li>
            <li><Link to="/profile">Личный кабинет</Link></li>
          </ul>
        </div>

        <div>
          <h3 className={styles.title}>Контакты</h3>
          <ul className={styles.contacts}>
            <li>
              <Icon name="phone" size={18} />
              <a href={CONTACTS.phoneHref}>{CONTACTS.phone}</a>
            </li>
            <li>
              <Icon name="mapPin" size={18} />
              <span>{CONTACTS.address}</span>
            </li>
            <li>
              <Icon name="clock" size={18} />
              <span>{CONTACTS.hours}</span>
            </li>
            <li>
              <Icon name="mail" size={18} />
              <a href={`mailto:${CONTACTS.mail}`}>{CONTACTS.mail}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© {new Date().getFullYear()} PizzaShop. Все права защищены.</p>
        <div className={styles.payments}>
          <span>Наличные</span>
          <span>Карты</span>
          <span>Click</span>
          <span>Payme</span>
        </div>
      </div>
    </footer>
  );
};
