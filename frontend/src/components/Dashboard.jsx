import React from 'react'
import styles from '../styles/Dashboard.module.css'
import Authentication from './Authentication'
import Questionnaire from './Questionnaire'

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
        <Authentication/>
        <Questionnaire/>
    </div>
  )
}

export default Dashboard
