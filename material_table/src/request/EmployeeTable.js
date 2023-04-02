import React, { useMemo, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
//import MOCK_DATA from './MOCK_DATA.json';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Checkbox, FormControlLabel } from "@mui/material";
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

export const EmployeeTable = () => {
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

      { Header: "Employee ID", accessorKey: "employeeId" },
      { Header: "Agency Code", accessorKey: "agency_Code" },
      {
        Header: "First Name",
        accessorKey: "first_Name",
      },
      {
        Header: "Last Name",
        accessorKey: "last_Name",
      },
      { Header: "Middle Initial", accessorKey: "middle_Initial" },
      { Header: "Home Address", accessorKey: "home_Address" },
      { Header: "Home Telephone", accessorKey: "home_Telephone" },
      { Header: "Position Level", accessorKey: "position_Level" },
      {
        Header: "Organization Mailing Address",
        accessorKey: "organization_Mailing_Address",
      },
      { Header: "Office Telephone", accessorKey: "office_Telephone" },
      { Header: "Work Email Address", accessorKey: "work_Email_Address" },
      { Header: "Position Title", accessorKey: "position_Title" },
      {
        Header: "Is Special Accommodation Needed",
        accessorKey: "isSpecialAccomodationNeeded",
        // Allows the user to see the checkbox that indicates that special accomodation is needed
        Cell: ({ row }) => (
          <Checkbox
            checked={row.original.isSpecialAccomodationNeeded}
            disabled
          />
        ),
      },
      {
        Header: "Special Accomodation Details",
        accessorKey: "specialAccomodation_Details",
      },
      { Header: "Education Level", accessorKey: "education_Level" },
      { Header: "Pay Plan", accessorKey: "pay_Plan" },
      {
        Header: "Series",
        accessorKey: "series",
      },
      {
        Header: "Grade",
        accessorKey: "grade",
      },
      { Header: "Step", accessorKey: "step" },
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

  // Retrieve data from the backend API to display data in the request table
  useEffect(() => {
    fetch("http://localhost:5201/api/Employees/")
      .then((resp) => resp.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  const classes = useStyles();

  const handleDeleteClick = (row) => {
    setRowToDelete(row);
    setDeleteDialogOpen(true);
  };

  // Function handles delete requests
  const handleConfirmDelete = async () => {
    try {
      // Send a DELETE request to the backend API to delete the row with the given ID
      const response = await fetch(
        `http://localhost:5201/api/Employees/${rowToDelete.original.employeeId}`,
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
          (item) => item.employeeId !== rowToDelete.original.employeeId
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
        `http://localhost:5201/api/Employees/${editRow.original.employeeId}`,
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
          if (item.employeeId === editRow.original.employeeId) {
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

  return (
    <>
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
                label="Agency Code"
                type="text"
                value={updatedRequest.agency_Code}
                onChange={(e) =>
                  setUpdatedRequest({
                    ...updatedRequest,
                    agency_Code: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="First Name"
                type="text"
                value={updatedRequest.first_Name}
                onChange={(e) =>
                  setUpdatedRequest({
                    ...updatedRequest,
                    first_Name: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Last Name"
                type="text"
                value={updatedRequest.last_Name}
                onChange={(e) =>
                  setUpdatedRequest({
                    ...updatedRequest,
                    last_Name: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Middle Initial"
                type="text"
                value={updatedRequest.middle_Initial}
                onChange={(e) =>
                  setUpdatedRequest({
                    ...updatedRequest,
                    middle_Initial: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Home Address"
                type="text"
                value={updatedRequest.home_Address}
                onChange={(e) =>
                  setUpdatedRequest({
                    ...updatedRequest,
                    home_Address: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Home Telephone"
                type="text"
                value={updatedRequest.home_Telephone}
                onChange={(e) =>
                  setUpdatedRequest({
                    ...updatedRequest,
                    home_Telephone: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Position Level"
                type="text"
                value={updatedRequest.position_Level}
                onChange={(e) =>
                  setUpdatedRequest({
                    ...updatedRequest,
                    position_Level: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Organization Mailing Address"
                type="text"
                value={updatedRequest.organization_Mailing_Address}
                onChange={(e) =>
                  setUpdatedRequest({
                    ...updatedRequest,
                    organization_Mailing_Address: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Office Telephone"
                type="text"
                value={updatedRequest.office_Telephone}
                onChange={(e) =>
                  setUpdatedRequest({
                    ...updatedRequest,
                    office_Telephone: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Work Email Address"
                type="text"
                value={updatedRequest.work_Email_Address}
                onChange={(e) =>
                  setUpdatedRequest({
                    ...updatedRequest,
                    work_Email_Address: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Position Title"
                type="text"
                value={updatedRequest.position_Title}
                onChange={(e) =>
                  setUpdatedRequest({
                    ...updatedRequest,
                    position_Title: e.target.value,
                  })
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      updatedRequest.isSpecialAccomodationNeeded || false
                    }
                    onChange={(e) =>
                      setUpdatedRequest({
                        ...updatedRequest,
                        isSpecialAccomodationNeeded: e.target.checked,
                      })
                    }
                  />
                }
                label="Is Special Accommodation Needed?"
              />
              <TextField
                margin="dense"
                label="Special Accomodation Details"
                type="text"
                value={updatedRequest.specialAccomodation_Details}
                onChange={(e) =>
                  setUpdatedRequest({
                    ...updatedRequest,
                    specialAccomodation_Details: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Education Level"
                type="text"
                value={updatedRequest.education_Level}
                onChange={(e) =>
                  setUpdatedRequest({
                    ...updatedRequest,
                    education_Level: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Pay Plan"
                type="text"
                value={updatedRequest.pay_Plan}
                onChange={(e) =>
                  setUpdatedRequest({
                    ...updatedRequest,
                    pay_Plan: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Series"
                type="text"
                value={updatedRequest.series}
                onChange={(e) =>
                  setUpdatedRequest({
                    ...updatedRequest,
                    series: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Grade"
                type="text"
                value={updatedRequest.grade}
                onChange={(e) =>
                  setUpdatedRequest({
                    ...updatedRequest,
                    grade: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Step"
                type="text"
                value={updatedRequest.step}
                onChange={(e) =>
                  setUpdatedRequest({
                    ...updatedRequest,
                    step: e.target.value,
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
    </>
  );
};
