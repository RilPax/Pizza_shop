import { useAppDispatch, useAppSelector } from "../../store/store";
import { logoutUserThunk } from "../../store/slices/user-slice";
import styles from "./profile.module.css";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className={styles.profile}>
      <h2 className={styles.title}>Профиль</h2>
      <div className={styles.info}>
        <span className={styles.label}>Имя:</span>
        <span className={styles.value}>{user?.name}</span>
      </div>
      <div className={styles.info}>
        <span className={styles.label}>Почта:</span>
        <span className={styles.value}>{user?.mail}</span>
      </div>
      <button
        className={styles.logoutButton}
        onClick={() => dispatch(logoutUserThunk())}
      >
        Выйти
      </button>
    </div>
  );
};
