import React, { Fragment, useState, useEffect } from "react";
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
import Alert from "../Alert";
import { useParams, useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import BackDrop from "../../components/BackDrop";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import store from "store";
import dayjs from "dayjs";
import { getform2Details, updateform2Status } from "../../datasource/form";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Form2 = () => {
  const [formDetails, setFormDetails] = useState();
  const { form_type_seq, form_id } = useParams();
  const [backdropOpen, setBackDropOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertData, setAlertData] = useState({
    type: "",
    title: "",
    content: "",
  });
  const [formExist, setFormExist] = useState(true);
  const [confirmApproveOpen, setConfirmApproveOpen] = useState(false);
  const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);
  const [confirmRejectOpen, setConfirmRejectOpen] = useState(false);
  const navigate = useNavigate();
  const getForm = async () => {
    try {
      setBackDropOpen(true);
      const response = await getform2Details(form_id);
      if (JSON.stringify(response) !== "{}") {
        setFormDetails(response);
        setBackDropOpen(false);
      } else {
        setFormExist(false);
        setBackDropOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const buildAlert = (data) => {
    setAlertData({
      type: data.type,
      title: data.title,
      content: data.content,
    });
    setAlertOpen(true);
  };
  useEffect(() => {
    const fetchFormDetails = async () => {
      await getForm();
    };
    fetchFormDetails();
  }, []);

  const handleForm = async (action) => {
    setBackDropOpen(true);
    let submitBody = {
      form_id: form_id,
      form_comment: formDetails.comment,
      status: action,
      username: store.get("username"),
    };
    try {
      const response = await updateform2Status(submitBody);
      buildAlert({
        // Alert Type: success, info, warning, error
        type: "success",
        title: "成功提示",
        content: response,
      });
      setBackDropOpen(false);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      buildAlert({
        // Alert Type: success, info, warning, error
        type: "error",
        title: "錯誤提示",
        content: `Error on updating the form`,
      });
      console.log(err);
    }
  };

  const approveContent = "Are you sure to approve the form?";
  const rejectContent = "Are you sure to reject the form?";
  const closeContent = "Are you sure to close the form?";
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
        open={confirmCloseOpen}
        maxWidth={"sm"}
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        disableEnforceFocus
      >
        <DialogTitle id="alert-dialog-slide-title">{closeContent}</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmCloseOpen(false)} color="primary">
            取消
          </Button>
          <Button
            onClick={() => {
              handleForm("Close");
              setConfirmCloseOpen(false);
            }}
            color="primary"
          >
            確認
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmApproveOpen}
        maxWidth={"sm"}
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        disableEnforceFocus
      >
        <DialogTitle id="alert-dialog-slide-title">
          {approveContent}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmApproveOpen(false)} color="primary">
            取消
          </Button>
          <Button
            onClick={() => {
              handleForm("Approve");
              setConfirmApproveOpen(false);
            }}
            color="primary"
          >
            確認
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmRejectOpen}
        maxWidth={"sm"}
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        disableEnforceFocus
      >
        <DialogTitle id="alert-dialog-slide-title">{rejectContent}</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmRejectOpen(false)} color="primary">
            取消
          </Button>
          <Button
            onClick={() => {
              handleForm("Reject");
              setConfirmRejectOpen(false);
            }}
            color="primary"
          >
            確認
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ p: 3 }}>
        {formDetails && formExist ? (
          <>
            <Typography
              component="h1"
              variant="h5"
              align="center"
              sx={{ color: "#5f6971" }}
            >
              Form 2
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <span>Reference Number: {form_id}</span>
              </Grid>
              <Grid item xs={12}>
                <span>Status: {formDetails.status}</span>
              </Grid>
              <Typography component="h1" variant="h6" sx={{ color: "#5f6971" }}>
                Personal Information
              </Typography>
              <Grid item xs={12}>
                <FormControl sx={{ width: "100%", margin: "8px 0" }}>
                  <TextField
                    size="small"
                    id="outlined-multiline-static"
                    label={`Creator`}
                    value={formDetails.create_by}
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
                    size="small"
                    id="outlined-multiline-static"
                    label={`Office`}
                    value={formDetails.office}
                    // onChange={handleUserNameChange}
                    name={`office`}
                    sx={{ width: "100%" }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </FormControl>
              </Grid>
              <Typography component="h1" variant="h6" sx={{ color: "#5f6971" }}>
                Form Details
              </Typography>
              {/* <Grid item xs={12}>
              <FormControl sx={{ width: "100%", margin: "8px 0" }}>
                <TextField
                  size="small"
                  id="outlined-multiline-static"
                  label={`Form Type`}
                  value={formDetails.form_type}
                  // onChange={handleFormChange}
                  InputProps={{
                    readOnly: true,
                  }}
                  name={`form_type`}
                  sx={{ width: "100%" }}
                />
              </FormControl>
            </Grid> */}
              <Grid item xs={12}>
                <FormControl sx={{ width: "100%", margin: "8px 0" }}>
                  <TextField
                    required
                    size="small"
                    id="outlined-multiline-static"
                    label={`Title`}
                    value={formDetails.title}
                    // onChange={handleFormChange}
                    InputProps={{
                      readOnly: true,
                    }}
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
                    // onChange={handleFormChange}
                    InputProps={{
                      readOnly: true,
                    }}
                    name={`description`}
                    sx={{ width: "100%" }}
                    multiline
                    rows={3}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disableOpenPicker
                  label="Submisstion Date"
                  value={formDetails.submission_date || null}
                  sx={{ width: "100%" }}
                  onChange={(date) =>
                    setFormDetails({ ...formDetails, submission_date: date })
                  }
                  inputFormat="YYYY/MM/DD"
                />
              </LocalizationProvider> */}
                <FormControl sx={{ width: "100%", margin: "8px 0" }}>
                  <TextField
                    // required
                    size="small"
                    id="outlined-multiline-static"
                    label={`Submission Date`}
                    value={formDetails.submission_date}
                    // onChange={handleFormChange}
                    InputProps={{
                      readOnly: true,
                    }}
                    name={`submission_date`}
                    sx={{ width: "100%" }}
                  />
                </FormControl>
                {formDetails.status !== "Pending" && (
                  <FormControl sx={{ width: "100%", margin: "8px 0" }}>
                    <TextField
                      // required
                      size="small"
                      id="outlined-multiline-static"
                      label={`
                         Secretary Comment`}
                      value={formDetails.comment}
                      // onChange={handleFormChange}
                      InputProps={{
                        readOnly: true,
                      }}
                      name={`comment`}
                      sx={{ width: "100%" }}
                    />
                  </FormControl>
                )}
              </Grid>
              {formDetails.create_by === store.get("username") &&
                formDetails.status !== "Pending" &&
                formDetails.status !== "Close" && (
                  <>
                    <Grid item xs={1}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          setConfirmCloseOpen(true);
                        }}
                      >
                        Close
                      </Button>
                    </Grid>
                  </>
                )}

              {store.get("full_access") && formDetails.status === "Pending" && (
                <>
                  <Grid item xs={12}>
                    <FormControl sx={{ width: "100%", margin: "8px 0" }}>
                      <TextField
                        size="small"
                        id="outlined-multiline-static"
                        label={`Approve / Reject Comment`}
                        value={formDetails.comment}
                        onChange={(e) =>
                          setFormDetails({
                            ...formDetails,
                            comment: e.target.value,
                          })
                        }
                        name={`comment`}
                        sx={{ width: "100%" }}
                        multiline
                        rows={3}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={1}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        setConfirmApproveOpen(true);
                      }}
                    >
                      Approve
                    </Button>
                  </Grid>
                  <Grid item xs={1}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        setConfirmRejectOpen(true);
                      }}
                    >
                      Reject
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </>
        ) : (
          <>
            <p>Form Number Not exist</p>
          </>
        )}
      </Box>
    </Fragment>
  );
};

export default Form2;
