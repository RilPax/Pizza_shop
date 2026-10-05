import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchProductsThunk } from "../../store/slices/products-slice";
import { CategoryTabs, Icon, ProductCard, ProductsError, SkeletonGrid } from "../../components";
import { CATEGORIES } from "../../utils/constants";
import type { TCategory, TProduct } from "../../utils/types";
import styles from "./menu.module.css";

type TSort = "popular" | "price-asc" | "price-desc";

const SORTS: Record<TSort, { label: string; compare: (a: TProduct, b: TProduct) => number }> = {
  popular: {
    label: "По популярности",
    compare: (a, b) => Number(Boolean(b.popular)) - Number(Boolean(a.popular)),
  },
  "price-asc": { label: "Сначала дешевле", compare: (a, b) => a.price - b.price },
  "price-desc": { label: "Сначала дороже", compare: (a, b) => b.price - a.price },
};

const isCategory = (value: string | null): value is TCategory =>
  CATEGORIES.some((c) => c.id === value);

export const Menu = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.products);
  const favoriteIds = useAppSelector((state) => state.favorites.ids);
  const [params, setParams] = useSearchParams();

  const rawCategory = params.get("category");
  const category = isCategory(rawCategory) ? rawCategory : null;
  const query = params.get("q") ?? "";
  const onlyFavorites = params.get("fav") === "1";
  const rawSort = params.get("sort") as TSort | null;
  const sort: TSort = rawSort && rawSort in SORTS ? rawSort : "popular";

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  const updateParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products
      .filter((p) => !category || p.category === category)
      .filter((p) => !onlyFavorites || favoriteIds.includes(p.id))
      .filter(
        (p) =>
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
      .sort(SORTS[sort].compare);
  }, [products, category, onlyFavorites, favoriteIds, query, sort]);

  // Без выбранной категории показываем меню, разбитое по разделам
  const groups = category
    ? [{ id: category, title: "", items: filtered }]
    : CATEGORIES.map((c) => ({
        id: c.id,
        title: `${c.emoji} ${c.title}`,
        items: filtered.filter((p) => p.category === c.id),
      })).filter((g) => g.items.length > 0);

  const pageTitle = onlyFavorites
    ? "Избранное"
    : category
      ? CATEGORIES.find((c) => c.id === category)?.title
      : "Меню";

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.head}>
        <h1 className={styles.title}>{pageTitle}</h1>

        <div className={styles.controls}>
          <div className={styles.search}>
            <Icon name="search" size={18} className={styles.searchIcon} />
            <input
              type="search"
              className="field"
              placeholder="Найти блюдо"
              aria-label="Поиск по меню"
              value={query}
              onChange={(e) => updateParam("q", e.target.value)}
            />
          </div>

          <select
            className={`field ${styles.select}`}
            value={sort}
            onChange={(e) => updateParam("sort", e.target.value === "popular" ? null : e.target.value)}
            aria-label="Сортировка"
          >
            {Object.entries(SORTS).map(([value, { label }]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <button
            type="button"
            className={`${styles.favToggle} ${onlyFavorites ? styles.favToggleActive : ""}`}
            onClick={() => updateParam("fav", onlyFavorites ? null : "1")}
            aria-pressed={onlyFavorites}
          >
            <Icon name="heart" size={18} filled={onlyFavorites} />
            Избранное
            {favoriteIds.length > 0 && <span className={styles.favCount}>{favoriteIds.length}</span>}
          </button>
        </div>
      </div>

      <CategoryTabs
        active={category}
        onChange={(c) => updateParam("category", c === category ? null : c)}
        className={styles.tabs}
      />

      {error ? (
        <ProductsError />
      ) : loading && products.length === 0 ? (
        <SkeletonGrid count={8} className={styles.grid} />
      ) : filtered.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyEmoji} aria-hidden="true">{onlyFavorites ? "💔" : "🔍"}</span>
          <p className={styles.emptyTitle}>
            {onlyFavorites ? "В избранном пока пусто" : "Ничего не нашлось"}
          </p>
          <p className={styles.emptyText}>
            {onlyFavorites
              ? "Нажмите на сердечко у любимой пиццы, чтобы она появилась здесь."
              : "Попробуйте изменить запрос или выбрать другую категорию."}
          </p>
          <button type="button" className="btn btn-outline" onClick={() => setParams({}, { replace: true })}>
            Показать всё меню
          </button>
        </div>
      ) : (
        groups.map((group) => (
          <section key={group.id} className={styles.group} aria-label={group.title || pageTitle}>
            {group.title && <h2 className={styles.groupTitle}>{group.title}</h2>}
            <div className={styles.grid}>
              {group.items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
};
