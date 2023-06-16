import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Grid,
  Box,
  IconButton,
  Tooltip,
  Dialog,
  Slide,
  Select,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import store from "store";
import { getFormList, batchApproveForm } from "../datasource/form";
import CustomNoRowsOverlay from "./CustomNoRowsOverlay";
import Alert from "./Alert";
import FilterListIcon from "@mui/icons-material/FilterList";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import locale from "date-fns/locale/en-US";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormList = () => {
  let filterBody = {
    form_type: "",
    office: "",
    submission_year: "",
    submission_month: "",
    meeting_period: null,
  };
  const [checked, setChecked] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [list, setList] = useState([]);
  const [fixedList, setFixedList] = useState([]);
  const [filter, setFilter] = useState(false);
  const [filterParams, setFilterParams] = useState(filterBody);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertData, setAlertData] = useState({
    type: "",
    title: "",
    content: "",
  });

  const navigate = useNavigate();
  const content = "Are you sure to approve all checked forms?";

  const buildAlert = (data) => {
    setAlertData({
      type: data.type,
      title: data.title,
      content: data.content,
    });
    setAlertOpen(true);
  };

  const filterSave = () => {
    setList(
      fixedList
        .filter((obj) =>
          filterParams.form_type === ""
            ? true
            : filterParams.form_type === obj.form_type
        )
        .filter((obj) =>
          filterParams.office === "" ? true : filterParams.office === obj.office
        )
        .filter((obj) =>
          filterParams.submission_year === ""
            ? true
            : filterParams.submission_year === obj.submission_date.split("/")[0]
        )
        .filter((obj) =>
          filterParams.submission_month === ""
            ? true
            : filterParams.submission_month ===
              obj.submission_date.split("/")[1]
        )
        .filter((obj) =>
          !filterParams.meeting_period
            ? true
            : filterParams.meeting_period.getTime() >=
                new Date(obj.meeting_period_from).getTime() &&
              filterParams.meeting_period.getTime() <=
                new Date(obj.meeting_period_to).getTime()
        )
    );
  };

  const filterReset = () => {
    setFilterParams(filterBody);
    setList(fixedList);
  };

  const getForms = async () => {
    setLoading(true);
    try {
      const response = await getFormList(
        store.get("full_access") ? "Y" : "N",
        store.get("username")
      );
      setList(response);
      setFixedList(response);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchFormList = async () => {
      await getForms();
    };
    fetchFormList();
  }, [flag]);

  const handleFilterChange = (e) => {
    setFilterParams({ ...filterParams, [e.target.name]: e.target.value });
  };

  const goToFormDetials = (id, form_type_seq) => {
    navigate(`/form/${form_type_seq}/${id}`);
  };

  const columns = [
    {
      field: "id",
      headerName: "",
      renderCell: (params) => (
        <Box>
          <Tooltip title="Form Details">
            <IconButton
              size="small"
              onClick={() => {
                goToFormDetials(params.row.id, params.row.form_type_seq);
              }}
            >
              <ReadMoreIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
    {
      field: "form_type",
      headerName: "Form Type",
      minWidth: 150,
    },
    {
      field: "office",
      headerName: "Office",
      minWidth: 180,
    },
    {
      field: "title",
      headerName: "Title",
      minWidth: 500,
    },
    { field: "meeting_period", headerName: "Meeting Period", minWidth: 300 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 180,
    },
    {
      field: "submission_date",
      headerName: "Submission Date",
      minWidth: 250,
    },
    {
      field: "create_by",
      headerName: " Creator",
      minWidth: 200,
    },
  ];
  const openApproveConfirmDialog = () => {
    if (checked.length > 0) {
      setConfirmOpen(true);
    }
  };

  const handleApprove = async () => {
    let data = {
      form_id: checked,
      username: store.get("username"),
      status: "Approve",
    };
    const response = await batchApproveForm(data);
    buildAlert({
      // Alert Type: success, info, warning, error
      type: "success",
      title: "成功提示",
      content: response,
    });
    setFlag((prev) => !prev);
  };
  return (
    <Fragment>
      <Alert
        open={alertOpen}
        alertType={alertData.type}
        alertTitle={alertData.title}
        alertContent={alertData.content}
        handleClose={() => setAlertOpen(false)}
      />
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
      <Box sx={{ p: 3, height: "750px" }}>
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={() => {
            setFilter((prev) => !prev);
          }}
        >
          Filter Panel
        </Button>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          sx={{ color: "#5f6971" }}
        >
          Form List
        </Typography>
        <br />
        {filter && (
          <Box sx={{ border: "1px solid #99ceed", height: "25%", p: 2 }}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-select-small">Form Type</InputLabel>
                  <Select
                    // size="small"
                    id="outlined-multiline-static"
                    label="Form Type"
                    value={filterParams.form_type}
                    onChange={handleFilterChange}
                    name={`form_type`}
                  >
                    {["Form 1", "Form 2"].map((name, index) => (
                      <MenuItem key={index} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-select-small">Office</InputLabel>
                  <Select
                    // size="small"
                    id="outlined-multiline-static"
                    label="Office"
                    value={filterParams.office}
                    onChange={handleFilterChange}
                    name={`office`}
                  >
                    {["ITO", "DAAO"].map((name, index) => (
                      <MenuItem key={index} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-select-small">
                    Submission(Year)
                  </InputLabel>
                  <Select
                    // size="small"
                    id="outlined-multiline-static"
                    label="Submission(Year)"
                    value={filterParams.submission_year}
                    onChange={handleFilterChange}
                    name={`submission_year`}
                  >
                    {["2022", "2023"].map((name, index) => (
                      <MenuItem key={index} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-select-small">
                    Submission(Month)
                  </InputLabel>
                  <Select
                    // size="small"
                    id="outlined-multiline-static"
                    label="Submission(Month)"
                    value={filterParams.submission_month}
                    onChange={handleFilterChange}
                    name={`submission_month`}
                  >
                    {[
                      "01",
                      "02",
                      "03",
                      "04",
                      "05",
                      "06",
                      "07",
                      "08",
                      "09",
                      "10",
                      "11",
                      "12",
                    ].map((name, index) => (
                      <MenuItem key={index} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={locale}
                >
                  <DatePicker
                    required
                    label="Meeting Period "
                    value={filterParams.meeting_period || null}
                    sx={{ width: "100%" }}
                    onChange={(date) =>
                      setFilterParams({
                        ...filterParams,
                        meeting_period: date,
                      })
                    }
                    inputFormat="yyyy/mm/dd"
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={1}>
                <Button variant="outlined" onClick={filterSave}>
                  Save
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button variant="outlined" onClick={filterReset}>
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {store.get("full_access") && (
          <Button variant="outlined" onClick={openApproveConfirmDialog}>
            Approve Checked Form
          </Button>
        )}

        <br />
        <DataGrid
          rows={list}
          columns={columns}
          loading={loading}
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
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          checkboxSelection={store.get("full_access")}
          isRowSelectable={(params) => params.row.status === "Pending"}
          onRowSelectionModelChange={(item) => setChecked(item)}
          disableRowSelectionOnClick
          pageSize={10}
          getRowHeight={() => "auto"}
          density="compact"
        />
      </Box>
    </Fragment>
  );
};

export default FormList;
