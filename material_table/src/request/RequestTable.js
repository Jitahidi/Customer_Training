import React, { useMemo, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
//import MOCK_DATA from './MOCK_DATA.json';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Tab, Tabs } from "@mui/material";
import { EmployeeTable } from "./EmployeeTable";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

export const RequestTable = () => {
  const COLUMNS = useMemo(
    () => [
      {
        Header: "Actions",
        accessorKey: "actions",
        Cell: ({ row }) => (
          <>
            <Tooltip title="Delete">
              <DeleteIcon
                style={{ color: "red" }}
                onClick={() => handleDeleteClick(row)}
              />
            </Tooltip>
            <Tooltip title="Edit">
              <EditIcon
                style={{ color: "grey" }}
                onClick={() => handleEditClick(row)}
              />
            </Tooltip>
          </>
        ),
      },

      { Header: "Request ID", accessorKey: "requestId" },
      { Header: "Vendor Name", accessorKey: "vendor_Name" },
      {
        Header: "Vendor Mailing Address",
        accessorKey: "vendor_Mailing_Address",
      },
      {
        Header: "Vendor Telephone Number",
        accessorKey: "vendor_Telephone_Number",
      },
      { Header: "Vendor Email Address", accessorKey: "vendor_Email_Address" },
      { Header: "Vendor Website", accessorKey: "vendor_Website" },
      { Header: "Vendor POC", accessorKey: "vendor_POC" },
      { Header: "Course Name", accessorKey: "courseName" },
      { Header: "Course ID", accessorKey: "courseId" },
      { Header: "Training Start Date", accessorKey: "training_StartDate" },
      { Header: "Training End Date", accessorKey: "training_EndDate" },
      { Header: "Training Duty Hours", accessorKey: "training_DutyHours" },
      {
        Header: "Training Non-Duty Hours",
        accessorKey: "training_NonDutyHours",
      },
      { Header: "Training Purpose Type", accessorKey: "training_PurposeType" },
      { Header: "Training Type Code", accessorKey: "training_TypeCode" },
      { Header: "Training Sub-Type Code", accessorKey: "training_SubTypeCode" },
      {
        Header: "Training Delivery Type Code",
        accessorKey: "training_DeliveryTypeCode",
      },
      {
        Header: "Training Designation Type Code",
        accessorKey: "training_DesignationTypeCode",
      },
      { Header: "Training Credit", accessorKey: "training_Credit" },
      {
        Header: "Training Credit Type Code",
        accessorKey: "training_CreditTypeCode",
      },
      {
        Header: "Training Accreditation Indicator",
        accessorKey: "training_AccreditionIdicator",
      },
      {
        Header: "Continued Service Agreement Expiration Date",
        accessorKey: "continued_Service_Agreement_ExpirationDate",
      },
      {
        Header: "Training Source Type Code",
        accessorKey: "training_Source_TypeCode",
      },
      {
        Header: "Individual or Group Training",
        accessorKey: "individual_or_Group_Training",
      },
      { Header: "Student Membership ID", accessorKey: "student_Membership_ID" },
      {
        Header: "Skill Learning Objective",
        accessorKey: "skill_Learning_Objective",
      },
    ],
    []
  );

  // const DATA = useMemo(() => MOCK_DATA, [])
  const [data, setData] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  // keeps track of whether the delete confirmation dialog is open or closed:
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  // Keeps track of the row that the user wants to delete
  const [rowToDelete, setRowToDelete] = useState(null);
  const [newRequest, setNewRequest] = useState({
    requestId: null,
    vendor_Name: null,
    vendor_Mailing_Address: null,
    vendor_Telephone_Number: null,
    vendor_Email_Address: null,
    vendor_Website: null,
    vendor_POC: null,
    courseName: null,
    courseId: null,
    training_StartDate: null,
    training_EndDate: null,
    training_DutyHours: null,
    training_NonDutyHours: null,
    training_PurposeType: null,
    training_TypeCode: null,
    training_SubTypeCode: null,
    training_DeliveryTypeCode: null,
    training_DesignationTypeCode: null,
    training_Credit: null,
    training_CreditTypeCode: null,
    training_AccreditionIdicator: null,
    continued_Service_Agreement_ExpirationDate: null,
    training_Source_TypeCode: null,
    individual_or_Group_Training: null,
    student_Membership_ID: null,
    skill_Learning_Objective: null,
  });
  // State variable to keep track of the row being edited and the updated values of the request.
  const [editRow, setEditRow] = useState(null);
  const [updatedRequest, setUpdatedRequest] = useState({});
  // State variable to keep track of the active tab
  const [activeTab, setActiveTab] = useState(0);

  // Retrieve data from the backend API to display data in the request table
  useEffect(() => {
    fetch("http://localhost:5201/api/Requests/")
      .then((resp) => resp.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  // Function handles create request on the frontend and backend
  const handleCreateRequest = async () => {
    try {
      // Send a POST request to the backend API to create a new row in the database
      const response = await fetch("http://localhost:5201/api/Requests/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRequest),
      });

      if (!response.ok) {
        throw new Error("Failed to create request");
      }

      // Add the request to the table
      setData([...data, newRequest]);
      setCreateModalOpen(false);
      setNewRequest({
        requestId: null,
        vendor_Name: null,
        vendor_Mailing_Address: null,
        vendor_Telephone_Number: null,
        vendor_Email_Address: null,
        vendor_Website: null,
        vendor_POC: null,
        courseName: null,
        courseId: null,
        training_StartDate: null,
        training_EndDate: null,
        training_DutyHours: null,
        training_NonDutyHours: null,
        training_PurposeType: null,
        training_TypeCode: null,
        training_SubTypeCode: null,
        training_DeliveryTypeCode: null,
        training_DesignationTypeCode: null,
        training_Credit: null,
        training_CreditTypeCode: null,
        training_AccreditionIdicator: null,
        continued_Service_Agreement_ExpirationDate: null,
        training_Source_TypeCode: null,
        individual_or_Group_Training: null,
        student_Membership_ID: null,
        skill_Learning_Objective: null,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // This is function handles changes in the input fields for creating a new request.
  const handleNewRequestChange = (e) => {
    const { name, value } = e.target;
    setNewRequest({ ...newRequest, [name]: value });
  };

  const handleDeleteClick = (row) => {
    setRowToDelete(row);
    setDeleteDialogOpen(true);
  };
  // Function handles delete request on the frontend and backend
  const handleConfirmDelete = async () => {
    try {
      // Send a DELETE request to the backend API to delete the row with the given ID
      const response = await fetch(
        `http://localhost:5201/api/Requests/${rowToDelete.original.requestId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete request");
      }

      // We are filtering out the row we want to delete from the 'data' array and updating
      // the state of 'data' to the filtered array.
      setData((prevState) =>
        prevState.filter(
          (item) => item.requestId !== rowToDelete.original.requestId
        )
      );
      setDeleteDialogOpen(false);
      setRowToDelete(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (row) => {
    // Opens the edit request dialog
    setEditRow(row);
    // Contains the original data that was passed in as part of the data array when the table was created.
    setUpdatedRequest(row.original);
  };

  // Function handles update request on the frontend and backend
  const handleUpdateRequest = async () => {
    try {
      const response = await fetch(
        `http://localhost:5201/api/Requests/${editRow.original.requestId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRequest),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update request");
      }

      // Update the request in the table
      setData((prevState) => {
        const updatedData = prevState.map((item) => {
          if (item.requestId === editRow.original.requestId) {
            return updatedRequest;
          }
          return item;
        });
        return updatedData;
      });
      // Closes edit request dialog
      setEditRow(null);
      setUpdatedRequest({});
    } catch (error) {
      console.error(error);
    }
  };
  // Function handles tab changes
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const employeeTable = () => {
    return <div>Another table goes here</div>;
  };

  const courseVendorTable = () => {
    return <div>Another table goes here</div>;
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Request Table" />
          <Tab label="Employee Table" />
          <Tab label="Course/Vendor Table" />
        </Tabs>
      </Box>
      {activeTab === 0 && (
        <>
          <MaterialReactTable columns={COLUMNS} data={data} />
          {/* Dialog box for creating new row */}
          <Dialog
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            fullWidth
            maxWidth="xs"
          >
            <DialogTitle>Create New Request</DialogTitle>
            <DialogContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  autoFocus
                  margin="dense"
                  name="requestId"
                  label="Request ID"
                  type="text"
                  value={newRequest.requestId}
                  onChange={handleNewRequestChange}
                />
                <TextField
                  margin="dense"
                  name="vendor_Name"
                  label="Vendor Name"
                  type="text"
                  value={newRequest.vendor_Name}
                  onChange={handleNewRequestChange}
                />
                <TextField
                  margin="dense"
                  name="vendor_Mailing_Address"
                  label="Vendor Mailing Address"
                  type="text"
                  value={newRequest.vendor_Mailing_Address}
                  onChange={handleNewRequestChange}
                />
                {/* Add more text fields for other columns */}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setCreateModalOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateRequest}>Create</Button>
            </DialogActions>
          </Dialog>
          {/* Dialog box for editing row */}
          <Dialog
            open={editRow !== null}
            onClose={() => setEditRow(null)}
            fullWidth
            maxWidth="xs"
          >
            <DialogTitle>Edit Request</DialogTitle>
            <DialogContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  margin="dense"
                  label="Vendor Name"
                  type="text"
                  value={updatedRequest.vendor_Name}
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      vendor_Name: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Vendor Mailing Address"
                  type="text"
                  value={updatedRequest.vendor_Mailing_Address}
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      vendor_Mailing_Address: e.target.value,
                    })
                  }
                />
                {/* Add more text fields for other columns */}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditRow(null)}>Cancel</Button>
              <Button onClick={handleUpdateRequest}>Save</Button>
            </DialogActions>
          </Dialog>
          {/* Delete Confirmation */}
          <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
          >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete this request?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleConfirmDelete}>Delete</Button>
            </DialogActions>
          </Dialog>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => setCreateModalOpen(true)}>
              Add New Request
            </Button>
          </Box>
        </>
      )}
      {activeTab === 1 && (
        <>
          <EmployeeTable />
        </>
      )}
      {activeTab === 2 && (
        <>
          <courseVendorTable />
        </>
      )}
    </>
  );
};
