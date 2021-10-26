import useStore from "../../store/store";

import styles from "./UserBox.module.scss";

function UserBox() {
  const user = useStore((store) => store.user);

  return (
    <div className={styles.UserBox}>
      <div className={styles.InfoBox}>
        <span className={styles.Name}>{user?.name}</span>
        <span className={styles.Email}>{user?.email}</span>
      </div>

      <img
        src={user?.picture || ""}
        width="40"
        height="40"
        className={styles.ProfilePicture}
        alt="profile"
      />
    </div>
  );
}

export default UserBox;
