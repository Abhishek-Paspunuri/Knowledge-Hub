import React from 'react'
import styles from '../styles/QuestionCard.module.css'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuestionCard = (props) => {
  let { queId, queTitle, question, modifiedDate, views, profileName } = props;

  const dispatch = useDispatch();

  const handleNotify = () => {
    toast.info(<h6 style={{marginTop:"5px", color:"black"}} >Login to view the answers</h6>);
  };

  const handleClear = () => {
    dispatch(notificationActions.clear());
  };

  let handleClick = () => {
    handleNotify();
    setTimeout(() => {
      handleClear();
    }, 2000);
  }

  return (
    <div className={styles.queCard} onClick={handleClick}>
      <div className={styles.queCardLeft}>
        <h5 className={styles.title}>{queId}. {queTitle}</h5>
        <p className={styles.question}>
          {question}
        </p>
      </div>
      <div className={styles.queCardRight}>
        <h6 > <i>Author</i> - <span>{profileName}</span></h6>
        <h6 > <i>Views</i> - <span>{views}</span></h6>
        <h6 > <i>Posted on</i>  - <span>{modifiedDate}</span></h6>
        {/* <h6 style={{color:"darkblue"}} >Author - {profileName}</h6>
            <h6 style={{color:"red"}}>Views - {views}</h6>
            <h6 style={{color:"darkgreen"}}>Posted on - {modifiedDate}</h6> */}
      </div>
    </div>
  )
}

export default QuestionCard
