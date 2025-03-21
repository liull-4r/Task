import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";

import { FaChartBar } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FaUniversity } from "react-icons/fa"; // For Bank Management icon
import { CiCalendarDate } from "react-icons/ci";

import logo from "../../assets/logo.jpg";
import { GrTransaction } from "react-icons/gr";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };
  const [serviceOpen, setServiceOpen] = useState(false);
  const [transactionOpen, setTransactionOpen] = useState(false);

  return (
    <div className={styles.sidebar}>
      {/* <h1 className={styles.logo}> */}
      <NavLink to="/dashboard">
        <img src={logo} alt="logo" />
      </NavLink>

      <hr className={styles.break} />

      {/* Sidebar Menu */}
      <ul className={styles.menu}>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? ` ${styles.active}` : "")}
          >
            <MdOutlineDashboard className={styles.icon} />
            Dashboard
          </NavLink>
        </li>

        <li>
          <div
            onClick={() => setServiceOpen(!serviceOpen)}
            className={styles.dropdownHeader}
          >
            <FaChartBar className={styles.icon} />
            Service Management
            {serviceOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </div>

          {serviceOpen && (
            <ul className={styles.subMenu}>
              <li>
                <NavLink
                  to="/banks"
                  className={({ isActive }) =>
                    isActive ? `${styles.active}` : ""
                  }
                >
                  <FaUniversity className={styles.icon} /> Bank Management
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        <br />
        <li>
          <div
            onClick={() => setTransactionOpen(!transactionOpen)}
            className={styles.dropdownHeader}
          >
            <CiCalendarDate className={styles.icon} />
            Transaction Analytics
            {transactionOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </div>

          {transactionOpen && (
            <ul className={styles.subMenu}>
              <li>
                <NavLink
                  to="/transactions"
                  className={({ isActive }) =>
                    isActive ? `${styles.active}` : ""
                  }
                >
                  <GrTransaction className={styles.icon} /> Transaction
                  Management
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>

      <div className={styles.logout}>
        <button onClick={handleLogout}>
          <CiLogin className={styles.icon} />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
