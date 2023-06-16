import React, { Fragment, useState } from "react";
import {
  Typography,
  Grid,
  Box,
  MenuItem,
  Select,
  InputLabel,
  Button,
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Alert from "../Alert";
import BackDrop from "../../components/BackDrop";
import store from "store";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { insertForm1Details, insertform2Details } from "../../datasource/form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import locale from "date-fns/locale/en-US";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewForm = () => {
  const [formDetails, setFormDetails] = useState({
    username: store.get("username"),
    office: "ITO",
    form_type: "Form 1",
    form_type_seq: 1,
    title: "",
    description: "",
    submission_date: new Date(),
    meeting_period_from: null,
    meeting_period_to: null,
  });
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);
  const [backdropOpen, setBackDropOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertData, setAlertData] = useState({
    type: "",
    title: "",
    content: "",
  });
  const content = "Are you sure to submit the form?";
  const saveContent = "Are you sure to save the form as draft? ";
  const handleFormChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };
  const buildAlert = (data) => {
    setAlertData({
      type: data.type,
      title: data.title,
      content: data.content,
    });
    setAlertOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmOpen(true);
  };

  const handleSaveForm = async () => {
    setBackDropOpen(true);
    formDetails.form_type_seq = formDetails.form_type === "Form 1" ? 1 : 2;
    formDetails.status = "Draft";
    try {
      let response;
      switch (formDetails.form_type_seq) {
        case 1:
          response = await insertForm1Details(formDetails);
          break;
        case 2:
          response = await insertform2Details(formDetails);
          break;
        default:
          return;
      }
      buildAlert({
        // Alert Type: success, info, warning, error
        type: "success",
        title: "成功提示",
        content: response,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      buildAlert({
        // Alert Type: success, info, warning, error
        type: "error",
        title: "錯誤提示",
        content: `Error on creating the form`,
      });
      console.log(err);
    } finally {
      setBackDropOpen(false);
    }
  };

  const handleSubmitForm = async () => {
    setBackDropOpen(true);
    formDetails.form_type_seq = formDetails.form_type === "Form 1" ? 1 : 2;
    formDetails.status = "Pending";
    try {
      let response;
      switch (formDetails.form_type_seq) {
        case 1:
          response = await insertForm1Details(formDetails);
          break;
        case 2:
          response = await insertform2Details(formDetails);
          break;
        default:
          return;
      }
      buildAlert({
        // Alert Type: success, info, warning, error
        type: "success",
        title: "成功提示",
        content: response,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      buildAlert({
        // Alert Type: success, info, warning, error
        type: "error",
        title: "錯誤提示",
        content: `Error on creating the form`,
      });
      console.log(err);
    } finally {
      setBackDropOpen(false);
    }
  };
  return (
    <Fragment>
      <BackDrop open={backdropOpen} text={`Processing`} />
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
              handleSubmitForm();
              setConfirmOpen(false);
            }}
            color="primary"
          >
            確認
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmSaveOpen}
        maxWidth={"sm"}
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        disableEnforceFocus
      >
        <DialogTitle id="alert-dialog-slide-title">{saveContent}</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmSaveOpen(false)} color="primary">
            取消
          </Button>
          <Button
            onClick={() => {
              handleSaveForm();
              setConfirmSaveOpen(false);
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
          sx={{ color: "#5f6971" }}
        >
          New Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Typography component="h1" variant="h6" sx={{ color: "#5f6971" }}>
              Personal Information
            </Typography>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%", margin: "8px 0" }}>
                <TextField
                  size="small"
                  id="outlined-multiline-static"
                  label={`Creator`}
                  value={formDetails.username}
                  // onChange={handleUserNameChange}
                  name={`username`}
                  sx={{ width: "100%" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%", margin: "8px 0" }}>
                <TextField
                  // required
                  size="small"
                  id="outlined-multiline-static"
                  label={`Office`}
                  value={formDetails.office}
                  onChange={handleFormChange}
                  name={`office`}
                  sx={{ width: "100%" }}
                  InputProps={{
                    readOnly: true,
                  }}
                  // multiline
                  // rows={3}
                />
              </FormControl>
            </Grid>
            <Typography component="h1" variant="h6" sx={{ color: "#5f6971" }}>
              Form Details
            </Typography>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%", margin: "8px 0" }}>
                <InputLabel id="demo-select-small">Form Type</InputLabel>
                <Select
                  size="small"
                  id="outlined-multiline-static"
                  label="Form Type"
                  value={formDetails.form_type}
                  onChange={handleFormChange}
                  name={`form_type`}
                  sx={{ width: "100%" }}
                  InputProps={{
                    readOnly: true,
                  }}
                >
                  {["Form 1", "Form 2"].map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%", margin: "8px 0" }}>
                <TextField
                  required
                  size="small"
                  id="outlined-multiline-static"
                  label={`Title`}
                  value={formDetails.title}
                  onChange={handleFormChange}
                  name={`title`}
                  sx={{ width: "100%" }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%", margin: "8px 0" }}>
                <TextField
                  required
                  size="small"
                  id="outlined-multiline-static"
                  label={`Description`}
                  value={formDetails.description}
                  onChange={handleFormChange}
                  name={`description`}
                  sx={{ width: "100%" }}
                  multiline
                  rows={3}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={locale}
              >
                <DatePicker
                  required
                  label="Meeting Period From "
                  value={formDetails.meeting_period_from || null}
                  sx={{ width: "100%" }}
                  onChange={(date) =>
                    setFormDetails({
                      ...formDetails,
                      meeting_period_from: date,
                    })
                  }
                  inputFormat="yyyy/mm/dd"
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={locale}
              >
                <DatePicker
                  label="Meeting Period To"
                  value={formDetails.meeting_period_to || null}
                  sx={{ width: "100%" }}
                  onChange={(date) =>
                    setFormDetails({ ...formDetails, meeting_period_to: date })
                  }
                  inputFormat="yyyy/mm/dd"
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={locale}
              >
                <DatePicker
                  required
                  label="Submisstion Date"
                  value={formDetails.submission_date || null}
                  sx={{ width: "100%" }}
                  onChange={(date) =>
                    setFormDetails({ ...formDetails, submission_date: date })
                  }
                  inputFormat="yyyy/mm/dd"
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="outlined"
                onClick={() => {
                  setConfirmSaveOpen(true);
                }}
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Button variant="outlined" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Fragment>
  );
};

export default NewForm;
