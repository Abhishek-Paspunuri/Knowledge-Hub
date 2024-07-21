import React, { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import { useSelector, useDispatch } from 'react-redux';
import Admin from './Admin';
import User from './User';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const user = useSelector((state) => state.login);

  return (
    <>
      <div className={styles.homeContainer}>
        <ToastContainer />
        <Navbar />
        <div className={styles.homeInnerContainer}>
          {/* {JSON.stringify(user)} */}
          {/* <Sidebar /> */}
          {user.isLoggedIn ? (user.data?.isAdmin ? <Admin /> : <User />) : <Dashboard />}
        </div>
      </div>
    </>
  );
}

export default Home;
