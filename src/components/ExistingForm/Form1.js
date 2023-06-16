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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import locale from "date-fns/locale/en-US";
import store from "store";
import dayjs from "dayjs";
import {
  getForm1Details,
  updateForm1Status,
  updateForm1Details,
} from "../../datasource/form";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Form1 = () => {
  const [formDetails, setFormDetails] = useState();
  const { form_type_seq, form_id } = useParams();
  const [backdropOpen, setBackDropOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertData, setAlertData] = useState({
    type: "",
    title: "",
    content: "",
  });
  const [formExist, setFormExist] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);
  const [confirmApproveOpen, setConfirmApproveOpen] = useState(false);
  const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);
  const [confirmRejectOpen, setConfirmRejectOpen] = useState(false);
  const navigate = useNavigate();
  const handleFormChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };
  const getForm = async () => {
    try {
      setBackDropOpen(true);
      const response = await getForm1Details(form_id);
      if (JSON.stringify(response) !== "{}") {
        setFormDetails(response);
        setEditable(
          response.create_by === store.get("username") &&
            response.status === "Draft"
        );
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
      const response = await updateForm1Status(submitBody);
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

  const handleSaveForm = async () => {
    setBackDropOpen(true);
    formDetails.status = "Draft";
    try {
      let response = await updateForm1Details(formDetails);
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
        content: `Error on saving the form`,
      });
      console.log(err);
    } finally {
      setBackDropOpen(false);
    }
  };

  const handleSubmitForm = async () => {
    setBackDropOpen(true);
    formDetails.status = "Pending";
    try {
      let response = await updateForm1Details(formDetails);
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
        content: `Error on submiting the form`,
      });
      console.log(err);
    } finally {
      setBackDropOpen(false);
    }
  };

  const approveContent = "Are you sure to approve the form?";
  const rejectContent = "Are you sure to reject the form?";
  const closeContent = "Are you sure to close the form?";
  const content = "Are you sure to submit the form?";
  const saveContent = "Are you sure to save the form as draft? ";
  return (
    <Fragment>
      <BackDrop open={backdropOpen} text={`Processing`} />
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
              Form 1
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
                    onChange={handleFormChange}
                    InputProps={{
                      readOnly: !editable,
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
                    onChange={handleFormChange}
                    InputProps={{
                      readOnly: !editable,
                    }}
                    name={`description`}
                    sx={{ width: "100%" }}
                    multiline
                    rows={3}
                  />
                </FormControl>
              </Grid>

              {!editable ? (
                <>
                  <Grid item xs={6}>
                    <FormControl sx={{ width: "100%", margin: "8px 0" }}>
                      <TextField
                        // required
                        size="small"
                        id="outlined-multiline-static"
                        label={`Meeting Period From`}
                        value={formDetails.meeting_period_from}
                        // onChange={handleFormChange}
                        InputProps={{
                          readOnly: true,
                        }}
                        name={`meeting_period_from`}
                        sx={{ width: "100%" }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl sx={{ width: "100%", margin: "8px 0" }}>
                      <TextField
                        // required
                        size="small"
                        id="outlined-multiline-static"
                        label={`Meeting Period To`}
                        value={formDetails.meeting_period_to}
                        // onChange={handleFormChange}
                        InputProps={{
                          readOnly: true,
                        }}
                        name={`meeting_period_to`}
                        sx={{ width: "100%" }}
                      />
                    </FormControl>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={6}>
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      adapterLocale={locale}
                    >
                      <DatePicker
                        required
                        label="Meeting Period From "
                        value={
                          formDetails.meeting_period_from
                            ? new Date(formDetails.meeting_period_from)
                            : null
                        }
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
                        value={
                          formDetails.meeting_period_to
                            ? new Date(formDetails.meeting_period_to)
                            : null
                        }
                        sx={{ width: "100%" }}
                        onChange={(date) =>
                          setFormDetails({
                            ...formDetails,
                            meeting_period_to: date,
                          })
                        }
                        inputFormat="yyyy/mm/dd"
                      />
                    </LocalizationProvider>
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
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
                {formDetails.status !== "Pending" &&
                  formDetails.status !== "Draft" && (
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
                formDetails.status === "Approve" && (
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
              {formDetails.create_by === store.get("username") &&
                formDetails.status === "Draft" && (
                  <>
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
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setConfirmOpen(true);
                        }}
                      >
                        Submit
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

export default Form1;
