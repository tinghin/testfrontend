import React, { Fragment, useState } from "react";
import {
  Typography,
  Button,
  Grid,
  Box,
  IconButton,
  Tooltip,
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import store from "store";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormList = () => {
  const [checked, setChecked] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const content = "Are you sure to approve all checked forms?";

  const rows = [
    {
      id: "1",
      form_type: "Form 1",
      title: "Daily Meeting",
      description: "Test test Test",
      status: "Pending",
      submission_date: "9/6/2023",
      createuser: "Andy",
    },
    {
      id: "2",
      form_type: "Form 2",
      title: "Daily Meeting 2",
      description: "Test test Test",
      status: "Completed",
      submission_date: "9/6/2023",
      createuser: "Andy",
    },
  ];

  const handleRemoveOpen = () => {};
  const columns = [
    {
      field: "id",
      headerName: "",
      renderCell: (params) => (
        <Box>
          <Tooltip title="Form Details">
            <IconButton size="small" onClick={handleRemoveOpen}>
              <ReadMoreIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
    {
      field: "form_type",
      headerName: "Form Type",
      flex: 1,
      minWidth: 50,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      minWidth: 50,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 50,
    },
    {
      field: "submission_date",
      headerName: "Submission Date",
      flex: 1,
      minWidth: 50,
    },
    {
      field: "createuser",
      headerName: " Creator",
      flex: 1,
      minWidth: 50,
    },
  ];
  const openApproveConfirmDialog = () => {
    if (checked.length > 0) {
      setConfirmOpen(true);
    }
  };
  const handleApprove = () => {};
  return (
    <Fragment>
      <Dialog
        open={confirmOpen}
        maxWidth={"sm"}
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        disableEnforceFocus
      >
        <DialogTitle id="alert-dialog-slide-title">{content}</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">
            取消
          </Button>
          <Button
            onClick={() => {
              handleApprove();
              setConfirmOpen(false);
            }}
            color="primary"
          >
            確認
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ p: 3 }}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          // sx={{ fontFamily: "monospace" }}
        >
          Form List
        </Typography>
        <br />
        {store.get("full_access") && (
          <Button variant="outlined" onClick={openApproveConfirmDialog}>
            Approve Checked Form
          </Button>
        )}
        <DataGrid
          rows={rows}
          columns={columns}
          sx={(theme) => ({
            "& .MuiDataGrid-columnHeader": {
              lineHeight: "1rem",
              height: 50,
              "& .MuiCheckbox-root": {
                color: theme.palette.primary.main,
              },
            },
            "& .MuiDataGrid-columnsContainer": {
              backgroundColor:
                theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
            },

            "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
              borderRight: `1px solid ${
                theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
              }`,
            },
            "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
              borderBottom: `1px solid ${
                theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
              }`,
            },
            "& .MuiDataGrid-cell": {
              color:
                theme.palette.mode === "light"
                  ? "rgba(0,0,0,.85)"
                  : "rgba(255,255,255,0.85)",
              fontFamily: [
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
              ].join(","),
              WebkitFontSmoothing: "auto",
              letterSpacing: "normal",

              "& .MuiDataGrid-iconSeparator": {
                display: "none",
              },
              "& .MuiDataGrid-colCell, .MuiDataGrid-cell": {
                borderRight: `1px solid ${
                  theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
                }`,
              },
              "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
                borderBottom: `1px solid ${
                  theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
                }`,
              },
              "& .MuiDataGrid-cell": {
                color:
                  theme.palette.mode === "light"
                    ? "rgba(0,0,0,.85)"
                    : "rgba(255,255,255,0.65)",
              },
            },
          })}
          disableColumnFilter
          checkboxSelection={store.get("full_access")}
          isRowSelectable={(params) => params.row.status === "Pending"}
          onRowSelectionModelChange={(item) => setChecked(item)}
          disableRowSelectionOnClick
          density="compact"
        ></DataGrid>
      </Box>
    </Fragment>
  );
};

export default FormList;
