import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchProductsThunk } from "../../store/slices/products-slice";
import { CategoryTabs, Icon, ProductCard, ProductsError, SkeletonGrid } from "../../components";
import type { IconName } from "../../components/icon/Icon";
import { POPULAR_TITLES } from "../../utils/constants";
import type { TCategory } from "../../utils/types";
import styles from "./home.module.css";

const FEATURES: { icon: IconName; title: string; text: string }[] = [
  { icon: "truck", title: "Быстрая доставка", text: "От 30 минут по Ташкенту" },
  { icon: "leaf", title: "Свежие ингредиенты", text: "Только качественные продукты" },
  { icon: "shield", title: "Безопасная оплата", text: "Наличные, карты, Click, Payme" },
  { icon: "headphones", title: "Поддержка 24/7", text: "Всегда на связи" },
];

const STATS = [
  { value: "50 000+", label: "довольных клиентов" },
  { value: "4.9", label: "средняя оценка" },
  { value: "30 мин", label: "среднее время доставки" },
  { value: "12", label: "районов Ташкента" },
];

const PROMO_CODE = "PIZZA10";

export const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useAppSelector((state) => state.products);
  const [category, setCategory] = useState<TCategory>("pizza");
  const [isCopied, setCopied] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  const popular = products
    .filter((p) => p.category === category)
    .sort((a, b) => Number(Boolean(b.popular)) - Number(Boolean(a.popular)))
    .slice(0, 4);

  const copyPromo = async () => {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Буфер обмена недоступен (например, без HTTPS) — просто ничего не делаем
    }
  };

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Свежая и вкусная пицца</p>
            <h1 className={styles.heroTitle}>
              Любимая пицца
              <br />
              с доставкой
              <br />
              <span>в Ташкенте</span>
            </h1>
            <p className={styles.heroText}>
              Горячая пицца из свежих ингредиентов.{" "}
              <br />
              Быстрая доставка и отличные вкусы.
            </p>
            <div className={styles.heroActions}>
              <Link to="/menu" className="btn btn-primary btn-lg">
                Заказать сейчас
                <Icon name="arrowRight" size={20} />
              </Link>
              <Link to="/menu" className="btn btn-outline btn-lg">
                <Icon name="list" size={20} />
                Смотреть меню
              </Link>
            </div>
          </div>

          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeIcon}>
              <Icon name="truck" size={26} />
            </span>
            <span>
              Быстрая доставка
              <strong>от 30 минут</strong>
            </span>
          </div>
        </div>
      </section>

      <div className="container">
        <CategoryTabs active={category} onChange={setCategory} className={styles.tabs} />

        {/* Популярное + промо */}
        <div className={styles.showcase}>
          <section>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>{POPULAR_TITLES[category]}</h2>
              <Link to={`/menu?category=${category}`} className={styles.more}>
                Смотреть всё
                <Icon name="arrowRight" size={16} />
              </Link>
            </div>

            {error ? (
              <ProductsError />
            ) : loading && products.length === 0 ? (
              <SkeletonGrid className={styles.grid} />
            ) : (
              <div className={styles.grid}>
                {popular.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>

          <aside className={styles.promos} id="promo" aria-label="Акции">
            <div className={styles.combo}>
              <div className={styles.comboContent}>
                <h3 className={styles.comboTitle}>
                  Выгодные
                  <br />
                  комбо-наборы
                </h3>
                <p className={styles.comboText}>
                  Пицца + напиток + закуска
                  <br />
                  по специальной цене
                </p>
                <button
                  type="button"
                  className={styles.comboButton}
                  onClick={() => navigate("/menu?category=combo")}
                >
                  Подробнее
                  <Icon name="arrowRight" size={16} />
                </button>
              </div>
              <img src="/images/combo-banner.jpg" alt="" className={styles.comboImage} />
            </div>

            <div className={styles.discount}>
              <div className={styles.discountContent}>
                <h3 className={styles.discountTitle}>
                  Скидка 10%
                  <br />
                  на первый заказ
                </h3>
                <p className={styles.discountText}>Используйте промокод при оформлении</p>
                <button
                  type="button"
                  className={styles.code}
                  onClick={copyPromo}
                  aria-label={`Скопировать промокод ${PROMO_CODE}`}
                >
                  <span className={styles.codeValue}>{PROMO_CODE}</span>
                  <span className={styles.codeIcon}>
                    <Icon name={isCopied ? "check" : "copy"} size={18} />
                  </span>
                </button>
                <span className={styles.copied} aria-live="polite">
                  {isCopied ? "Скопировано!" : ""}
                </span>
              </div>
              <img src="/images/promo.jpg" alt="" className={styles.discountImage} />
            </div>
          </aside>
        </div>
      </div>

      {/* Преимущества */}
      <section className={styles.features} id="delivery" aria-label="Преимущества">
        <div className={`container ${styles.featuresGrid}`}>
          {FEATURES.map((f) => (
            <div key={f.title} className={styles.feature}>
              <span className={styles.featureIcon}>
                <Icon name={f.icon} size={28} />
              </span>
              <div>
                <p className={styles.featureTitle}>{f.title}</p>
                <p className={styles.featureText}>{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* О нас */}
      <section className={`container ${styles.about}`} id="about">
        <div className={styles.aboutImageWrap}>
          <img src="/images/products/napoli.jpg" alt="Пицца из нашей печи" className={styles.aboutImage} loading="lazy" />
        </div>
        <div>
          <p className={styles.eyebrow}>О нас</p>
          <h2 className={styles.sectionTitle}>Готовим пиццу, которую любим сами</h2>
          <p className={styles.aboutText}>
            Тесто замешиваем каждое утро и даём ему созреть 24 часа. Моцарелла,
            томаты и зелень — от проверенных фермеров. Пицца выпекается при 400°C
            и приезжает к вам горячей в термосумке.
          </p>
          <dl className={styles.stats}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.stat}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
};
