import { CATEGORIES } from "../../utils/constants";
import type { TCategory } from "../../utils/types";
import styles from "./category-tabs.module.css";

interface CategoryTabsProps {
  active: TCategory | null;
  onChange: (category: TCategory) => void;
  className?: string;
}

export const CategoryTabs = ({ active, onChange, className = "" }: CategoryTabsProps) => (
  <div className={`${styles.tabs} ${className}`} role="tablist" aria-label="Категории">
    {CATEGORIES.map((category) => (
      <button
        key={category.id}
        type="button"
        role="tab"
        aria-selected={active === category.id}
        className={`${styles.tab} ${active === category.id ? styles.active : ""}`}
        onClick={() => onChange(category.id)}
      >
        <span className={styles.emoji} aria-hidden="true">{category.emoji}</span>
        {category.title}
      </button>
    ))}
  </div>
);
