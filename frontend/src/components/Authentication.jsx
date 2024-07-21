import React, { useState, useRef } from 'react';
import styles from '../styles/Authentication.module.css';
import dashboardLogo from '../assets/dashboardLogo.png';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slice/login';
import { TbBulbFilled } from "react-icons/tb";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Authentication = () => {

  let selector = useSelector((state) => state.login);

  const handleNotify = () => {
    const payload = {
      message: 'You have successfully registered!',
      isActive: true,
    };
    dispatch(notificationActions.notify(payload));
  };

  const handleClear = () => {
    dispatch(notificationActions.clear());
  };


  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const profileNameRef = useRef(null);

  const [isLogin, setIsLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [role, setRole] = useState('admin');

  const dispatch = useDispatch();

  const handleModalSubmit = async () => {
    handleCloseModal();

    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    let profileName;

    if (isLogin && email && password) {
      dispatch(loginUser({ email, password })).then((data) => {
        console.log(JSON.stringify(selector));
        if (data.type === "loginUser/fulfilled") {
          toast.success(<h6 style={{ marginTop: "5px", color: "black" }} >Login Successful!</h6>);
        }
        else {
          toast.error(<h6 style={{ marginTop: "5px", color: "black" }} >Login Failed!</h6>);
        }
      });
    }
    else if (!isLogin && email && password && profileNameRef.current.value) {
      profileName = profileNameRef.current.value;
      handleNotify();
      setTimeout(() => {
        handleClear();
      }, 2000);
      registerUser({ email, password, profileName });
    }
    else {
      alert("Please fill all the fields");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const registerUser = (data) => {
    fetch("http://localhost:5096/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to register user');
        }
        return response.json();
      })

      .then(data => {
        console.log(data);
        fetch("http://localhost:5096/api/approval/addApprovals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ UserId: data.userId, Role: role }),
        })
      })

      .catch(error => {
        console.error('Error:', error);
      });
  }

  const handleSignup = () => {
    setIsLogin(false);
    setShowModal(true);
  };

  const handleLogin = () => {
    setIsLogin(true);
    setShowModal(true);
  }

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };
  
  return (
    <>
      <div className={styles.authenticationContainer}>
        <div className={styles.quote}>
          <h2>
            Knowledge <span style={{ color: 'darkblue' }}>shared</span> is{' '}
          </h2>
          <h2>
            Knowledge <span style={{ color: 'darkblue' }}>multiplied</span>
            <TbBulbFilled style={{ color: "darkorange", margin: "-10px 0px 0px 10px" }} />
          </h2>
          <div className={styles.buttonsContainer}>
            <button className={styles.signup} onClick={handleSignup}>
              SignUp
            </button>
            <button className={styles.login} onClick={handleLogin}>Login</button>
          </div>
        </div>
        <img src={dashboardLogo} alt="" style={{ width: '30%' }} />
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Following Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="my-3" style={{ marginLeft: '50px' }}>
            <label style={{ fontSize: '18px', marginRight: '61px' }}>Email:</label>
            <input type="email" ref={emailRef} style={{ marginLeft: "19px" }} />
          </div>
          <div className="mb-3" style={{ marginLeft: '50px' }}>
            <label style={{ fontSize: '18px', marginRight: '14px' }}>Password:</label>
            <input type="password" ref={passwordRef} style={{ marginLeft: "34px" }} />
          </div>
          {!isLogin && <div className="mb-3" style={{ marginLeft: '50px' }}>
            <label style={{ fontSize: '18px', marginRight: '20px' }}>Profile Name:</label>
            <input type="text" ref={profileNameRef} />
          </div>}
          {!isLogin && <div className="mb-3" style={{ marginLeft: '50px' }}>
            <label style={{ fontSize: '18px', marginRight: '20px' }}>Role:</label>
            <select value={role} onChange={handleRoleChange} style={{ marginLeft: "69px" }}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Authentication;
