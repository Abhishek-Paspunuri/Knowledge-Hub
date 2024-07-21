import React from 'react'
import styles from '../styles/Navbar.module.css'
import KNlogo from '../assets/KNlogo.jpeg'
import userLogo from '../assets/user-logo.png'
import { Link } from 'react-router-dom'

import { IoIosLogOut } from "react-icons/io";

import { logoutUser } from '../redux/slice/login'
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {

  let user = useSelector((state) => state);

  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log("Logout");
    dispatch(logoutUser());
    localStorage.clear();
  }

  return (
    <div className={styles.navbarContainer}>
      <Link to="/">
        <img src={KNlogo} alt="" style={{ width: "2.8vw", height: "2.8vw", borderRadius: "50%" }} />
      </Link>
      <h3 className={styles.logoName}>
        Knowledge
        <b>
          <span style={{ color: "darkblue", marginLeft: "2px" }}>Nest </span>
        </b>
      </h3>
      <Link to="/aboutUs" className={styles.navbarLinks}>About Us</Link>
      <Link className={styles.navbarLinks} >Contact Us</Link>
      <div className={styles.userInfo}>
        <img src={userLogo} alt="logo" style={{ width: "2vw", height: "2vw", marginRight: "10px" }} />
        <h6 style={{ color: "gray", marginTop: "5px" }}>
          <i>{user.login?.isLoggedIn ? user.login.data?.profileName : 'Anonymous'}</i>
        </h6>

        {user.login?.isLoggedIn && <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout <IoIosLogOut style={{ fontSize: "large" }} />
        </button>}
      </div>
    </div>
  )
}

export default Navbar
