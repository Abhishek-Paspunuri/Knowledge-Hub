import React, { useEffect } from 'react';
import styles from '../styles/Questionnaire.module.css';
import { fetchQuestions } from '../redux/slice/questions';
import { useDispatch, useSelector } from 'react-redux';
import QuestionCard from './QuestionCard';

const Questionnaire = () => {
  const dispatch = useDispatch();
  const { data: questions, isLoading, isError } = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading questions.</p>;

  return (
    <div className={styles.queContainer}>
        <h2 style={{margin:"20px"}}>Questions</h2>
        {/* {questions && JSON.stringify(questions)} */}
        {questions && questions.map((question) => (
          <QuestionCard key={question.queId} queId={question.queId} queTitle={question.questionTitle} question={question.question1} views={question.viewsCount} profileName={question.profileName} modifiedDate={question.modifiedOn.toString().split('T')[0]}/>
        ))}
    </div>
  );
};

export default Questionnaire;