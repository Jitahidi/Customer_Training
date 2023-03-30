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
    fetch("http://localhost:5201/api/Vendors/")
      .then((resp) => resp.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

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

  // Function handles scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
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
      {/*Button to scroll to the top of the form so the user can submit another request*/}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={scrollToTop}>Add New Request</Button>
      </Box>
    </>
  );
};
