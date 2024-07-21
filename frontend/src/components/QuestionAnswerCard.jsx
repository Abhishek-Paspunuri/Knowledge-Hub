import React from 'react'
import styles from '../styles/QuestionAnswerCard.module.css'
import { FaRegEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { FaEdit } from "react-icons/fa";
import { Modal, Button } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
import { useDeleteQuestionsMutation, useEditQuestionsMutation, useToggleConversationMutation } from '../rtk-query/QuestionsApi';
import { useSelector } from 'react-redux';

const QuestionAnswerCard = (props) => {
    let { queId, queTitle, question, modifiedDate, views, isConvoEnded, profileName } = props;

    let [showModal, setShowModal] = React.useState(false);

    let queRef = useRef();
    let queTitleRef = useRef();

    let user = useSelector((state) => state);

    let [deleteQuestion, { isDeleteLoading }] = useDeleteQuestionsMutation();
    let [editQuestion, { isEditLoading }] = useEditQuestionsMutation();
    let [toggleConversation, { isToggleLoading }] = useToggleConversationMutation();



    let handleEditQuestion = () => {
        setShowModal(true);
        console.log('heyy');
        if (queRef.current && queTitleRef.current) {
            queRef.current.value = question;
            queTitleRef.current.value = queTitle;
        } else {
            console.error('Refs are not attached to DOM elements.');
        }
    }

    let handleSubmitEditQue = () => {
        setShowModal(false);
        let reqData = {
            QueId: queId,
            UserId: user.login.data?.userId,
            QuestionTitle: queTitleRef.current.value,
            Question1: queRef.current.value,
            Views: views,
            IsActive: true,
            IsConvoEnded: isConvoEnded,
            ModifiedOn: new Date(),
            ModifiedBy: user.login.data?.userId
        }
        editQuestion(reqData);
    }

    let handleDeleteQuestion = () => {
        deleteQuestion(queId);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const toggleResumeConversation = () => {
        toggleConversation(queId);
    }

    useEffect(() => {
        if (showModal) {
            if (queTitleRef.current && queRef.current) {
                queTitleRef.current.value = queTitle;
                queRef.current.value = question;
            }
        }
    }, [showModal]);

    return (
        <div className={styles.queCard}>
            <div className={styles.queCardUp}>
                <h6 > <i>Author</i> - <span>{profileName}</span></h6>
                <h6 > <i>Posted on</i>  - <span>{modifiedDate}</span></h6>
                {localStorage.getItem('IsAdmin')==='true' ? 
                    isConvoEnded ?
                        <button onClick={toggleResumeConversation} className={styles.resumeConvoBtn}>
                            Resume Conversation
                        </button> :
                        <button onClick={toggleResumeConversation} className={styles.endConvoBtn}>
                            End Conversation
                        </button>
                    :
                    null}
            </div>
            <div className={styles.queCardDown}>
                <Link to={{ pathname: `/answers/${queId}`, myState: { question, queTitle } }} className={styles.title}>{queTitle}</Link>
                <div className='d-flex'>
                    <p className={styles.question}>
                        {question}
                    </p>
                    {
                        localStorage.getItem('IsAdmin')==='true' ?
                            <div className='d-flex justify-content-between' style={{ width: "15%", marginRight: "15px" }}>
                                <button onClick={handleEditQuestion} className='mx-2' style={{ margin: "-3px 5px 5px 5px", border: "none", backgroundColor: "white", width: "20px", height: "20px" }}>
                                    <FaEdit style={{ color: "orange", width: "20px", height: "20px" }} />
                                </button>
                                <button className='mx-2 mb-1' onClick={handleDeleteQuestion} style={{ margin: "-3px 5px 5px 5px", border: "none", backgroundColor: "white", width: "25px", height: "22px" }}>
                                    <RiDeleteBin5Fill style={{ color: "red", width: "25px", height: "22px" }} />
                                </button>

                                <div className='d-flex'>
                                    <FaRegEye style={{ marginRight: "5px", marginTop: "5px", color: "darkblue" }} />
                                    <p className={styles.view}> {views} </p>
                                </div>
                            </div>
                            :
                            <div className='d-flex'>
                                <FaRegEye style={{ marginRight: "5px", marginTop: "5px", color: "darkblue" }} />
                                <p className={styles.view}> {views} </p>
                            </div>
                    }
                </div>
            </div>

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
                    <Button variant="primary" onClick={handleSubmitEditQue}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default QuestionAnswerCard
