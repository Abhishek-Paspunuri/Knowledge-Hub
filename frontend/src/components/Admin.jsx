import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import userStyles from '../styles/User.module.css';
import QuestionAnswerCard from './QuestionAnswerCard';
import { Modal, Button } from 'react-bootstrap';


import { useGetApprovalStatusQuery } from '../rtk-query/ApprovalApi';
import { useGetQuestionsByUserIdQuery, useGetQuestionsQuery } from '../rtk-query/QuestionsApi';
import UserQuestionAnswerCard from './UserQuestionAnswerCard';
import AdminSidebar from './AdminSidebar';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Admin = () => {

  let [shouldDisplayMyQuestion, setShouldDisplayMyQuestion] = useState(false);

  const handleNotify = () => {
    toast.error( <h6 style={{marginTop:"5px", color:"black"}} >You are not approved to post a question. Please contact the admin.</h6>);
  };

  const handleClear = () => {
    dispatch(notificationActions.clear());
  };

  // Modal

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const queTitleRef = useRef(null);
  const queRef = useRef(null);


  const user = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.login?.isLoggedIn) {
      localStorage.setItem('BearerToken', user.login.data?.token);
      localStorage.setItem('IsAdmin', user.login.data?.isAdmin);
    }
  }, [user]);


  const { data: approvalStatus } = useGetApprovalStatusQuery(user.login.data?.userId);

  const { data: questionsByUserId } = useGetQuestionsByUserIdQuery(user.login.data?.userId);

  const { data: allQuestions } = useGetQuestionsQuery();

  const handlePostQuestion = () => {
    console.log(approvalStatus);
    if (approvalStatus) {
      setShowModal(true);
    }
    else {
      handleNotify();
      setTimeout(() => {
        handleClear();
      }, 2000);
    }
  }

  const handleConfirmPostQuestion = () => {
    setShowModal(false);
    dispatch(postQuestion({
      UserId: user.login.data?.userId,
      QuestionTitle: queTitleRef.current.value,
      Question1: queRef.current.value
    }));
  }

  return (
    <>
      <AdminSidebar />
      <div className={userStyles.userContainer}>
        <div className='d-flex justify-content-between'>
          <h4 style={{ color: "gray" }}>
            Hello, <i style={{ color: "darkblue" }}>{user.login.data?.profileName}</i>
          </h4>
          <div className='d-flex flex-wrap-reverse mx-1'>
            <Link to="/allUser" className='btn btn-warning mx-2' style={{ fontWeight: "600", color:"white" }}>
              User Management
            </Link>
            <button onClick={() => setShouldDisplayMyQuestion(!shouldDisplayMyQuestion)} className='btn btn-success mx-2' style={{ fontWeight: "600" }}>
              {shouldDisplayMyQuestion ? 'All Questions' : 'My Questions'}
            </button>
            <button onClick={handlePostQuestion} className='btn btn-success' style={{ backgroundColor: "rgb(15, 102, 149)", fontWeight: "600" }}>
              Post Question
            </button>
          </div>
        </div>

        {
          shouldDisplayMyQuestion ?
            <div className={userStyles.queBlock}>
              {questionsByUserId && questionsByUserId.map((question) => (
                <UserQuestionAnswerCard key={question.queId} queId={question.queId} queTitle={question.questionTitle} question={question.question1} views={question.viewsCount} modifiedDate={question.modifiedOn.toString().split('T')[0]} isConvoEnded={question.isConvoEnded} />
              ))}
              {/* {JSON.stringify(questionsByUserId)} */}
            </div>
            :
            <div className={userStyles.queBlock}>
              {/* {JSON.stringify(allQuestions)} */}
              {allQuestions && allQuestions.map((question) => (
                <QuestionAnswerCard key={question.queId} queId={question.queId} queTitle={question.questionTitle} question={question.question1} views={question.viewsCount} profileName={question.profileName} isConvoEnded={question.isConvoEnded} modifiedDate={question.modifiedOn.toString().split('T')[0]} />
              ))}
            </div>
        }

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Post your Question here</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ display: 'flex', flexDirection: 'column' }}>
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Question Title</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={queTitleRef} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Question</label>
                <textarea className="form-control" placeholder="Leave a question here" id="floatingTextarea" style={{ height: "100px" }} ref={queRef}></textarea>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleConfirmPostQuestion}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Admin;