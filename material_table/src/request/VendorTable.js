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

export const VendorTable = () => {
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
    vendorId: null,
    vendor_Name: null,
    vendor_Mailing_Address: null,
    vendor_Telephone_Number: null,
    vendor_Email_Address: null,
    vendor_Website: null,
    vendor_POC: null,
  });
  // State variable to keep track of the row being edited and the updated values of the request.
  const [editRow, setEditRow] = useState(null);
  const [updatedRequest, setUpdatedRequest] = useState({});

  // Retrieve data from the backend API to display data in the request table
  useEffect(() => {
    fetch("http://localhost:5201/api/Vendors/")
      .then((resp) => resp.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  // Function handles create request on the frontend and backend
  const handleCreateRequest = async () => {
    try {
      // Send a POST request to the backend API to create a new row in the database
      const response = await fetch("http://localhost:5201/api/Vendors/", {
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
        vendorId: null,
        vendor_Name: null,
        vendor_Mailing_Address: null,
        vendor_Telephone_Number: null,
        vendor_Email_Address: null,
        vendor_Website: null,
        vendor_POC: null,
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
        `http://localhost:5201/api/Vendors/${rowToDelete.original.vendorId}`,
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
          (item) => item.vendorId !== rowToDelete.original.vendorId
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
        `http://localhost:5201/api/Vendors/${editRow.original.vendorId}`,
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
          if (item.vendorId === editRow.original.vendorId) {
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
              name="vendorId"
              label="Vendor ID"
              type="text"
              value={newRequest.vendorId}
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
