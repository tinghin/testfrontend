import React from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";

const Alert = (props) => {
  const { open, alertType, alertTitle, alertContent, handleClose } = props;

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          variant="filled"
          onClose={handleClose}
          severity={alertType !== "" ? alertType : "info"}
          sx={{ width: "100%" }}
        >
          <AlertTitle>{alertTitle}</AlertTitle>
          {alertContent}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Alert;
