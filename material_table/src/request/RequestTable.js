import React, { useMemo, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
//import MOCK_DATA from './MOCK_DATA.json';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Tab, Tabs } from "@mui/material";
import { EmployeeTable } from "./EmployeeTable";
import "typeface-inter";
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

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    backgroundColor: "#4285F4", // Change this to the desired background color
    padding: theme.spacing(2),
  },
  tableBackground: {
    backgroundColor: "#4285F4", // Change this to the desired background color
    width: "89%",
    margin: "0 auto",
  },
  tabsColor: {
    backgroundColor: "#FFFFFF", // Change this to the desired background color
    width: "89%",
    margin: "0 auto",
  },
  scrollbtnColor: {
    backgroundColor: "#3f51b5 !important",
    color: "#3f51b5",
    "&:hover": {
      backgroundColor: "#3f51b5 !important",
    },
  },
}));

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
      { Header: "Vendor ID", accessorKey: "vendorId" },
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
        accessorKey: "training_AccreditionIndicator",
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

  // State variable to keep track of the data that is displayed in the table
  const [data, setData] = useState([]);
  // State variable to keep track of the open state of the delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  // State variable to keep track of the row that is being deleted
  const [rowToDelete, setRowToDelete] = useState(null);
  // State variable to keep track of the row that is being edited
  const [editRow, setEditRow] = useState(null);
  // State variable to keep track of the updated request data
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

  const classes = useStyles();

  const handleDeleteClick = (row) => {
    setRowToDelete(row);
    setDeleteDialogOpen(true);
  };

  // This function is called when the user clicks the 'Delete' button in the delete dialog
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

  // Function handles edit request on the frontend and backend
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

  // Function handles scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Function handles tab changes
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className={classes.tableContainer}>
      {/* Tab bar */}
      <h1
        style={{
          color: "white",
          fontSize: "28px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        Requests and Employees Information Stored in Postgresql Database Tables
      </h1>
      <Box>
        <Tabs
          className={classes.tabsColor}
          value={activeTab}
          onChange={handleTabChange}
        >
          <Tab label="Request Table" />
          <Tab label="Employee Table" />
        </Tabs>
      </Box>
      {activeTab === 0 && (
        <div className={classes.tableBackground}>
          <MaterialReactTable columns={COLUMNS} data={data} />
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
                  label="Course Name"
                  type="text"
                  value={updatedRequest.courseName}
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      courseName: e.target.value,
                    })
                  }
                />
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
                <TextField
                  margin="dense"
                  label="Vendor Telephone Number"
                  type="text"
                  value={updatedRequest.vendor_Telephone_Number}
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      vendor_Telephone_Number: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Vendor Email Address"
                  type="text"
                  value={updatedRequest.vendor_Email_Address}
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      vendor_Email_Address: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Vendor Website"
                  type="text"
                  value={updatedRequest.vendor_Website}
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      vendor_Website: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Vendor POC"
                  type="text"
                  value={updatedRequest.vendor_POC}
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      vendor_POC: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Training Start Date"
                  type="text"
                  value={updatedRequest.training_StartDate}
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      training_StartDate: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Training End Date"
                  type="text"
                  value={updatedRequest.training_EndDate}
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      training_EndDate: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Training Duty Hours"
                  type="text"
                  value={updatedRequest.training_DutyHours}
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      training_DutyHours: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Training Non-Duty Hours"
                  type="text"
                  value={updatedRequest.training_NonDutyHours}
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      training_NonDutyHours: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Training Purpose Type"
                  type="text"
                  value={updatedRequest.training_PurposeType}
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      training_PurposeType: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Training Type Code"
                  type="text"
                  value={updatedRequest.training_TypeCode}
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      training_TypeCode: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Training Sub Type Code"
                  type="text"
                  value={updatedRequest.training_SubTypeCode}
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      training_SubTypeCode: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Training Delivery Type Code"
                  type="text"
                  value={updatedRequest.training_DeliveryTypeCode}
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      training_DeliveryTypeCode: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Training Designation Type Code"
                  type="text"
                  value={updatedRequest.training_DesignationTypeCode}
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      training_DesignationTypeCode: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Training Credit"
                  type="text"
                  value={updatedRequest.training_Credit}
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      training_Credit: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Training Credit Type Code"
                  type="text"
                  value={updatedRequest.training_CreditTypeCode}
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      training_CreditTypeCode: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Training Accreditation Indicator"
                  type="text"
                  value={updatedRequest.training_AccreditionIndicator}
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      training_AccreditionIndicator: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Continued Service Agreement Expiration Date"
                  type="text"
                  value={
                    updatedRequest.continued_Service_Agreement_ExpirationDate
                  }
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      continued_Service_Agreement_ExpirationDate:
                        e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Training Source Type Code"
                  type="text"
                  value={updatedRequest.training_Source_TypeCode}
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      training_Source_TypeCode: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Individual or Group Training"
                  type="text"
                  value={updatedRequest.individual_or_Group_Training}
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      individual_or_Group_Training: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Student Membership ID"
                  type="text"
                  value={updatedRequest.student_Membership_ID}
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      student_Membership_ID: e.target.value,
                    })
                  }
                />
                <TextField
                  margin="dense"
                  label="Skill Learning Objective"
                  type="text"
                  value={updatedRequest.skill_Learning_Objective}
                  onChange={(e) =>
                    setUpdatedRequest({
                      ...updatedRequest,
                      skill_Learning_Objective: e.target.value,
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
          {/*Button to scroll to the top of the form so the user can submit another request*/}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              className={classes.scrollbtnColor}
              onClick={scrollToTop}
            >
              scrollToTop
            </Button>
          </Box>
        </div>
      )}
      {activeTab === 1 && (
        <>
          <EmployeeTable />
        </>
      )}
    </div>
  );
};
