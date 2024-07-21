import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import styles from '../styles/Answer.module.css'

import { FaUserEdit } from "react-icons/fa";
import NoAnswerFound from './NoAnswerFound';
import { MdDateRange } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { FaEye } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";

import { useGetApprovalStatusQuery } from '../rtk-query/ApprovalApi';
import { usePostAnswerMutation } from '../rtk-query/AnswersApi';
import { useEditAnswerMutation } from '../rtk-query/AnswersApi';
import { useDeleteAnswerMutation } from '../rtk-query/AnswersApi';
import { useGetAnswersQuery } from '../rtk-query/AnswersApi';



const Answers = () => {

    const ansRef = useRef();
    const postAnsRef = useRef();

    let dispatch = useDispatch();

    let user = useSelector((state) => state.login);

    let [question, setQuestion] = useState({});

    let [shouldEdit, setShouldEdit] = useState({
        shouldEdit: false,
        ansId: ""
    });

    let params = useParams();

    let fetchQueByid = async () => {
        let response = await fetch(`http://localhost:5096/api/questions/GetQuestion/${params.queId}`);
        let data = await response.json();
        setQuestion(data[0]);
    }

    let AddViewToTheQue = async () => {
        let reqData = {
            "QueId": params.queId,
            "UserId": user.data?.userId
        }
        await fetch(`http://localhost:5096/api/View/addView`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reqData)
        });
    }

    let handlePostAnswer = async () => {
        if (ansRef.current.value !== "") {
            let reqData = {
                "QueId": params.queId,
                "Ans": ansRef.current.value,
                "UserId": user.data?.userId
            }
            postAnswer(reqData);
            ansRef.current.value = "";
        }
        else {
            alert("Please enter answer to post");
        }
    }

    let handleEditAnswer = (answerId) => {
        setShouldEdit({
            shouldEdit: true,
            ansId: answerId
        });
        const filteredAnswers = answersData.filter(answer => answer.ansId === answerId);
        if (filteredAnswers.length > 0) {
            ansRef.current.value = filteredAnswers[0].ans;
            ansRef?.current?.focus();
        }
    }

    let handleSubmitEditAnswer = async () => {
        if (ansRef.current.value !== "") {
            let reqData = {
                AnsId: shouldEdit.ansId,
                QueId: params.queId,
                Ans: ansRef.current.value,
                UserId: user.data?.userId,
                IsActive: true
            }

            editAnswer(reqData);
            ansRef.current.value = "";
            setShouldEdit({
                shouldEdit: false,
                ansId: ""
            });
        }
        else {
            alert("Please edit answer to update existing answer");
        }
    }

    let handleDeleteAnswer = async (answerId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            deleteAnswer(answerId);
            setShouldEdit({
                shouldEdit: false,
                ansId: ""
            });
        }
    }

    useEffect(() => {
        fetchQueByid();
        AddViewToTheQue();
    }, [dispatch, params.queId]);

    const { data: approvalStatus, error, isLoading } = useGetApprovalStatusQuery(user.data?.userId);

    const [postAnswer, { data, error: postError, isLoading: postLoading }] = usePostAnswerMutation();

    const [editAnswer, { data: editData, error: editError, isLoading: editLoading }] = useEditAnswerMutation();

    const [deleteAnswer, { data: deleteData, error: deleteError, isLoading: deleteLoading }] = useDeleteAnswerMutation();

    const { data: answersData, error: answersError, isLoading: answersLoading } = useGetAnswersQuery(params.queId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <Navbar />
            <div className='d-flex'>
                <Sidebar />
                <div className={styles.ansContainer}>
                    <div className={styles.ansHeader}>
                        <h6>
                            <FaUserEdit style={{ margin: "0px 5px 3px 0px" }} />
                            Author: <span>{question.profileName}</span>
                        </h6>
                        <h6>
                            <FaEye style={{ margin: "0px 5px 3px 0px" }} />
                            Views: <span>{question.viewsCount}</span>
                        </h6>
                        <h6>
                            <MdDateRange style={{ margin: "0px 5px 3px 0px" }} />
                            Posted on: <span>{question.modifiedOn?.split('T')[0]}</span>
                        </h6>
                    </div>

                    <hr style={{ margin: "0px 0px 10px 0px" }} />
                    <div className={styles.queAnsBox}>
                        <h4>{question.questionTitle}</h4>
                        <h5>{question.question1}</h5>
                    </div>


                    <div className={styles.ansBox}>

                        {/* {JSON.stringify(question)} */}

                        {answersData?.length != 0 ?
                            answersData?.map((answer) => (
                                <div className='d-flex' key={answer.ansId}>
                                    <div className={styles.liner}>
                                        <div className={styles.linerBox}></div>
                                    </div>
                                    <div className={styles.ansBlock}>
                                        {answer.ans}
                                        <div style={{ width: "105%", height: '0.5%', margin: '10px', backgroundColor: "gray", marginLeft: "-10px" }} />
                                        <div className={styles.ansStats}>
                                            <h6>Answered By :
                                                <span style={{ fontStyle: "normal" }}> {answer.answeredBy} </span>
                                            </h6>
                                            <h6>Modified on :
                                                <span style={{ fontStyle: "normal" }}> {answer.editedOn?.split("T")[0]} </span>
                                            </h6>
                                        </div>
                                    </div>
                                    {
                                        ((answer.userId === user.data?.userId && approvalStatus) || localStorage.getItem('IsAdmin')==='true') &&
                                        <>
                                            <button onClick={() => handleEditAnswer(answer.ansId)} style={{ border: "none", backgroundColor: "white", width: "30px", height: "30px", margin: "25px 0px 0px 10px" }}>
                                                <FaEdit style={{ height: "20px", width: "20px", color: "orange" }} />
                                            </button>
                                            <button onClick={() => handleDeleteAnswer(answer.ansId)} style={{ border: "none", backgroundColor: "white", width: "30px", height: "30px", margin: "25px 0px 0px 10px" }}>
                                                <RiDeleteBin5Fill style={{ height: "35px", width: "20px", color: "rgb(249, 76, 76)" }} />
                                            </button>
                                        </>
                                    }

                                </div>


                            )) : <NoAnswerFound />}

                        {
                            question.isConvoEnded ?
                                <div className={styles.convoEnded}>
                                    <GoAlertFill className={styles.alertIcon}/>
                                    <h5>Conversation for this question has been ended</h5>
                                </div>
                                :
                                
                                <div style={{ width: "50%" }}>
                                    <div className={styles.ansForm}>
                                        <textarea className="form-control" placeholder="Post your answer here" id="floatingTextarea" style={{ height: "150px" }} ref={ansRef}></textarea>
                                    </div>
                                    {approvalStatus ?
                                        <div className='d-flex flex-row-reverse' >
                                            {shouldEdit.shouldEdit ?
                                                <button className={styles.editBtn} onClick={handleSubmitEditAnswer}>Edit Answer</button> :
                                                <button className={styles.postBtn} ref={postAnsRef} onClick={handlePostAnswer}>Post Answer</button>
                                            }
                                        </div> :
                                        <div className='d-flex flex-row-reverse my-2' >
                                            <span style={{ backgroundColor: "rgb(252, 233, 199)", padding: "5px", borderRadius: "5px", fontWeight: "500", fontStyle: "italic" }}>
                                                Not Approved to post answer
                                            </span>
                                        </div>}
                                </div>
                        }
                    </div>
                </div>
            </div >
        </>
    )
}

export default Answers;
