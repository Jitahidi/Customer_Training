import React, { useMemo, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
//import MOCK_DATA from './MOCK_DATA.json';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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

  // const DATA = useMemo(() => MOCK_DATA, [])
  const [data, setData] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  // keeps track of whether the delete confirmation dialog is open or closed:
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  // Keeps track of the row that the user wants to delete
  const [rowToDelete, setRowToDelete] = useState(null);
  const [newRequest, setNewRequest] = useState({
    employeeId: null,
    agency_Code: null,
    first_Name: null,
    last_Name: null,
    middle_Initial: null,
    home_Address: null,
    home_Telephone: null,
    position_Level: null,
    organization_Mailing_Address: null,
    office_Telephone: null,
    work_Email_Address: null,
    position_Title: null,
    isSpecialAccomodationNeeded: false,
    specialAccomodation_Details: null,
    education_Level: null,
    pay_Plan: null,
    series: null,
    grade: null,
    step: null,
  });
  // State variable to keep track of the row being edited and the updated values of the request.
  const [editRow, setEditRow] = useState(null);
  const [updatedRequest, setUpdatedRequest] = useState({});
  // State variable to keep track of the active tab
  const [activeTab, setActiveTab] = useState(0);

  // Retrieve data from the backend API to display data in the request table
  useEffect(() => {
    fetch("http://localhost:5201/api/Employees/")
      .then((resp) => resp.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  // Function handles create request on the frontend and backend
  const handleCreateRequest = async () => {
    try {
      // Send a POST request to the backend API to create a new row in the database
      const response = await fetch("http://localhost:5201/api/Employees/", {
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
        employeeId: null,
        agency_Code: null,
        first_Name: null,
        last_Name: null,
        middle_Initial: null,
        home_Address: null,
        home_Telephone: null,
        position_Level: null,
        organization_Mailing_Address: null,
        office_Telephone: null,
        work_Email_Address: null,
        position_Title: null,
        isSpecialAccomodationNeeded: false,
        specialAccomodation_Details: null,
        education_Level: null,
        pay_Plan: null,
        series: null,
        grade: null,
        step: null,
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
  // Function handles tab changes
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
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
              name="employeeId"
              label="Employee ID"
              type="text"
              value={newRequest.employeeId}
              onChange={handleNewRequestChange}
            />
            <TextField
              margin="dense"
              name="agency_Code"
              label="Agency Code"
              type="text"
              value={newRequest.agency_Code}
              onChange={handleNewRequestChange}
            />
            <TextField
              margin="dense"
              name="first_Name"
              label="First Name"
              type="text"
              value={newRequest.first_Name}
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
          <Typography>Are you sure you want to delete this request?</Typography>
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
  );
};
