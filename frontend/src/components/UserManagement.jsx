import React from 'react'
import styles from '../styles/Home.module.css';
import Navbar from './Navbar';
import AdminSidebar from './AdminSidebar';
import mngrStyles from '../styles/UserManagement.module.css';
import { useState } from 'react';

import { useGetAllApprovalStatusQuery, useGrantApprovalMutation, useLazyRevokeApprovalQuery } from '../rtk-query/ApprovalApi';
import { useSelector } from 'react-redux';

const UserManagement = () => {
    let [selected, setSelected] = useState(true)
    let { data: allApprovalsList } = useGetAllApprovalStatusQuery();

    let [grantApproval, { isLoading }] = useGrantApprovalMutation();
    let [revokeApproval, { isRevokeLoading }] = useLazyRevokeApprovalQuery();

    let selector = useSelector((state) => state);

    const handleGrantApproval = (userId) => {
        let reqData = {
            UserId: userId,
            ApprovedBy: selector.login.data?.userId
        }
        grantApproval(reqData);
    }

    const handleRevokeApproval = (userId) => {
        revokeApproval(userId);
    }

    return (
        <>
            {selector.login.data?.isAdmin &&
                <div className={styles.homeContainer}>
                    <Navbar />
                    <div className={styles.homeInnerContainer}>
                        <AdminSidebar />
                        <div className={mngrStyles.mngrContainer}>
                            <div className={mngrStyles.btnContainer}>
                                <button onClick={() => setSelected(true)} style={{ borderRadius: "10px 0px 0px 0px", backgroundColor: selected ? '#205a93' : '#e5f8fa', color: selected ? 'white' : 'black' }} className={mngrStyles.approvalBtn}>
                                    Approval Request for User
                                </button>
                                <button onClick={() => setSelected(false)} style={{ borderRadius: "0px 10px 0px 0px", backgroundColor: !selected ? '#205a93' : '#e5f8fa', color: !selected ? 'white' : 'black' }} className={mngrStyles.approvalBtn}>
                                    Approval Request for Admin
                                </button>
                            </div>
                            {/* {JSON.stringify(allApprovalsList)} */}
                            <div className={mngrStyles.tableContainer}>
                                <table className="table table-striped">
                                    <thead>
                                        <tr className=''>
                                            <th scope="col" style={{ width: "25%", textAlign: "center" }}>User Name</th>
                                            <th scope="col" style={{ width: "15%", textAlign: "center" }}>Role</th>
                                            <th scope="col" style={{ width: "30%", textAlign: "center" }}>Approval Status</th>
                                            <th scope="col" style={{ width: "30%", textAlign: "center" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allApprovalsList?.map((item, index) => {
                                            return (
                                                item.role === (selected ? "user" : "admin") &&
                                                <tr>
                                                    <td style={{ width: "25%", textAlign: "center" }}>
                                                        <h6>
                                                            {item.profileName}
                                                        </h6>
                                                    </td>
                                                    <td style={{ width: "15%", textAlign: "center" }}>
                                                        <h6>
                                                            {item.role}
                                                        </h6>
                                                    </td>
                                                    <td style={{ width: "30%", textAlign: "center" }}>
                                                        {item.isApproved ?
                                                            <div className='d-flex justify-content-center'>
                                                                <h6 style={{ backgroundColor: "#95eb95", padding: "5px", borderRadius: "5px" }}>
                                                                    Approved
                                                                </h6>
                                                            </div>
                                                            :
                                                            <div className='d-flex justify-content-center'>
                                                                <h6 style={{ backgroundColor: "#e6eb95", padding: "5px", borderRadius: "5px" }}>
                                                                    Pending
                                                                </h6>
                                                            </div>
                                                        }
                                                    </td>
                                                    <td style={{ width: "30%", textAlign: "center" }}>
                                                        {!item.isApproved &&
                                                            <button onClick={() => handleGrantApproval(item.userId)} className="btn btn-success" style={{
                                                                marginRight: "10px",
                                                                width: "fit-content",
                                                                height: "30px",
                                                                padding: "0px 10px"
                                                            }}>
                                                                Approve
                                                            </button>}
                                                        <button onClick={() => handleRevokeApproval(item.userId)} className="btn btn-danger" style={{
                                                            marginRight: "10px",
                                                            width: "fit-content",
                                                            height: "30px",
                                                            padding: "0px 10px"
                                                        }}>
                                                            {item.isApproved ? "Revoke" : "Reject"}
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div >
            }
        </>
    )
}

export default UserManagement
