import { CiSearch } from "react-icons/ci";
import styles from "./Navbar.module.css";

import { IoIosNotifications } from "react-icons/io";
import avatar from "../../assets/avatar.png";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.greeting}>
        <h2>Banks</h2>
      </div>

      <div className={styles.topRightContainer}>
        <div className={styles.searchContainer}>
          <CiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
          />
        </div>

        <div className={styles.rightSection}>
          <div className={styles.notification}>
            <IoIosNotifications className={styles.bellIcon} />
            <span className={styles.badge}>1</span>
          </div>
          <img src={avatar} alt="avatar" className={styles.avatar} />
          <div className={styles.userName}>
            <span>Jone</span>
            <span>Doe</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
