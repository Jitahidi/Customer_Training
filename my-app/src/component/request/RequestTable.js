import React, { useMemo, useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
//import MOCK_DATA from './MOCK_DATA.json';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';


export const RequestTable = () => {

  const COLUMNS = useMemo (() => [
      { Header: "Request ID", accessorKey: "requestId" },
      { Header: "Vendor Name", accessorKey: "vendor_Name" },
      { Header: "Vendor Mailing Address", accessorKey: "vendor_Mailing_Address" },
      { Header: "Vendor Telephone Number", accessorKey: "vendor_Telephone_Number" },
      { Header: "Vendor Email Address", accessorKey: "vendor_Email_Address" },
      { Header: "Vendor Website", accessorKey: "vendor_Website" },
      { Header: "Vendor POC", accessorKey: "vendor_POC" },
      { Header: "Course Name", accessorKey: "vourseName" },
      { Header: "Course ID", accessorKey: "courseId" },
      { Header: "Training Start Date", accessorKey: "training_StartDate" },
      { Header: "Training End Date", accessorKey: "training_EndDate" },
      { Header: "Training Duty Hours", accessorKey: "training_DutyHours" },
      { Header: "Training Non-Duty Hours", accessorKey: "training_NonDutyHours" },
      { Header: "Training Purpose Type", accessorKey: "training_PurposeType" },
      { Header: "Training Type Code", accessorKey: "training_TypeCode" },
      { Header: "Training Sub-Type Code", accessorKey: "training_SubTypeCode" },
      { Header: "Training Delivery Type Code", accessorKey: "training_DeliveryTypeCode" },
      { Header: "Training Designation Type Code", accessorKey: "training_DesignationTypeCode" },
      { Header: "Training Credit", accessorKey: "training_Credit" },
      { Header: "Training Credit Type Code", accessorKey: "training_CreditTypeCode" },
      { Header: "Training Accreditation Indicator", accessorKey: "training_AccreditionIdicator" },
      { Header: "Continued Service Agreement Expiration Date", accessorKey: "continued_Service_Agreement_ExpirationDate" },
      { Header: "Training Source Type Code", accessorKey: "training_Source_TypeCode" },
      { Header: "Individual or Group Training", accessorKey: "individual_or_Group_Training" },
      { Header: "Student Membership ID", accessorKey: "student_Membership_ID" },
      { Header: "Skill Learning Objective", accessorKey: "skill_Learning_Objective" },
      { Header: "Vendors", accessorKey: "vendors" },
      { Header: "Courses", accessorKey: "courses" }
    ], 
    [],
  );

  //const DATA = useMemo(() => MOCK_DATA, [])  
  const [data, setData] = useState([])
  
  useEffect(() => {
    fetch("http://localhost:5201/api/Requests/")
    .then(resp => resp.json())
    .then(data => setData(data))
    .catch(error => console.log(error));
  }, [])
  
  return (
    <MaterialReactTable
      columns = {COLUMNS}
      data = {data}
      
      
    
    />
  );
};

