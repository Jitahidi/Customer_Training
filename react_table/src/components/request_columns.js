// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ReactTable from "react-table";
// import "react-table/react-table.css";

// function RequestTable() {
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const result = await axios.get("/api/requests");
//       setRequests(result.data);
//     }

//     fetchData();
//   }, []);

  export const COLUMNS = [
    { Header: "Request ID", accessor: "RequestId" },
    { Header: "Vendor Name", accessor: "Vendor_Name" },
    { Header: "Vendor Mailing Address", accessor: "Vendor_Mailing_Address" },
    { Header: "Vendor Telephone Number", accessor: "Vendor_Telephone_Number" },
    { Header: "Vendor Email Address", accessor: "Vendor_Email_Address" },
    { Header: "Vendor Website", accessor: "Vendor_Website" },
    { Header: "Vendor POC", accessor: "Vendor_POC" },
    { Header: "Course Name", accessor: "CourseName" },
    { Header: "Course ID", accessor: "CourseId" },
    { Header: "Training Start Date", accessor: "Training_StartDate" },
    { Header: "Training End Date", accessor: "Training_EndDate" },
    { Header: "Training Duty Hours", accessor: "Training_DutyHours" },
    { Header: "Training Non-Duty Hours", accessor: "Training_NonDutyHours" },
    { Header: "Training Purpose Type", accessor: "Training_PurposeType" },
    { Header: "Training Type Code", accessor: "Training_TypeCode" },
    { Header: "Training Sub-Type Code", accessor: "Training_SubTypeCode" },
    { Header: "Training Delivery Type Code", accessor: "Training_DeliveryTypeCode" },
    { Header: "Training Designation Type Code", accessor: "Training_DesignationTypeCode" },
    { Header: "Training Credit", accessor: "Training_Credit" },
    { Header: "Training Credit Type Code", accessor: "Training_CreditTypeCode" },
    { Header: "Training Accreditation Indicator", accessor: "Training_AccreditionIdicator" },
    { Header: "Continued Service Agreement Expiration Date", accessor: "Continued_Service_Agreement_ExpirationDate" },
    { Header: "Training Source Type Code", accessor: "Training_Source_TypeCode" },
    { Header: "Individual or Group Training", accessor: "Individual_or_Group_Training" },
    { Header: "Student Membership ID", accessor: "Student_Membership_ID" },
    { Header: "Skill Learning Objective", accessor: "Skill_Learning_Objective" }
  ]

  // return (
  //   <React
