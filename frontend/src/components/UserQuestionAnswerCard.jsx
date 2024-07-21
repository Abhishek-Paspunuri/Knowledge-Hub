import React from 'react'

import { RiDeleteBin5Fill } from 'react-icons/ri';
import { FaEdit } from "react-icons/fa";
import { Modal, Button } from 'react-bootstrap';

import { useDeleteQuestionsMutation, useEditQuestionsMutation, useToggleConversationMutation } from '../rtk-query/QuestionsApi';

import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';



const UserQuestionAnswerCard = (props) => {

    let [showModal, setShowModal] = React.useState(false);

    let { queId, queTitle, question, modifiedDate, views, isConvoEnded } = props;

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
        <div className='mb-3'>
            <div class="card">
                <div class="card-header d-flex justify-content-between">
                    <div>Views : {views}</div>
                    <div>Modified Date : {modifiedDate}</div>
                    {isConvoEnded ?
                        <button onClick={toggleResumeConversation} style={{ color: "white", backgroundColor: "rgb(237 203 86)", padding: "3px", borderRadius: "3px", border: "none", fontSize: "15px", fontWeight:"500", padding:"0px 5px 0px 5px" }}>
                            Resume Conversation
                        </button> :
                        <button onClick={toggleResumeConversation} style={{ color: "white", backgroundColor: "rgb(243 92 92)", padding: "3px", borderRadius: "3px", border: "none", fontSize: "15px", fontWeight:"500", padding:"0px 5px 0px 5px" }}>
                            End Conversation
                        </button>
                    }
                </div>
                <div className='d-flex'>
                    <div class="card-body" style={{ width: "93%" }}>
                        <h5 class="card-title">{queTitle}</h5>
                        <p class="card-text">{question}</p>
                    </div>
                    <div className='d-flex align-content-end' style={{
                        display: "flex",
                        flexWrap: "wrapReverse",
                        marginLeft: "auto",
                        alignItems: "center",
                        width: "7%"
                    }}>
                        <button onClick={handleEditQuestion} className='mx-2' style={{ margin: "5px", border: "none", backgroundColor: "white", width: "20px", height: "20px" }}>
                            <FaEdit style={{ color: "orange", width: "20px", height: "20px" }} />
                        </button>
                        <button className='mx-2 mb-1' onClick={handleDeleteQuestion} style={{ margin: "5px", border: "none", backgroundColor: "white", width: "25px", height: "22px" }}>
                            <RiDeleteBin5Fill style={{ color: "red", width: "25px", height: "22px" }} />
                        </button>
                    </div>
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

export default UserQuestionAnswerCard;
