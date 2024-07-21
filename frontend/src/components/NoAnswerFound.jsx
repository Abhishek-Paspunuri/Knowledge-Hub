import React from 'react'
import { BiError } from "react-icons/bi";

const NoAnswerFound = () => {
    return (
        <div className='d-flex flex-column align-items-center' style={{ color: "lightgray" }}>
            <BiError style={{ width: "200px", height: "200px" }} />
            <h4> <i> No answers found for this question. </i> </h4>
        </div>
    )
}

export default NoAnswerFound
