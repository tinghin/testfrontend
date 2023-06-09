import React, { Fragment, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import BackDrop from "../components/BackDrop";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import store from "store";

const Login = () => {
  const userList = [
    {
      user_id: 1,
      username: "normaluser01",
      password: "p@ssword",
    },
    { user_id: 2, username: "normaluser02", password: "p@ssword" },
    { user_id: 3, username: "superuser01", password: "p@ssword" },
  ];
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertData, setAlertData] = useState({
    type: "",
    title: "",
    content: "",
  });
  const navigate = useNavigate();
  const [backdropOpen, setBackDropOpen] = useState(false);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const buildAlert = (data) => {
    setAlertData({
      type: data.type,
      title: data.title,
      content: data.content,
    });
    setAlertOpen(true);
  };

  const handleSignIn = () => {
    setBackDropOpen(true);

    if (userList.findIndex((obj) => obj.username === username) > -1) {
      store.set("user_id", 1);
      store.set("username", username);
      store.set("full_access", username === "superuser01" ? true : false);
      setTimeout(() => {
        setBackDropOpen(false);
        navigate("/");
      }, 2000);
    } else {
      buildAlert({
        // Alert Type: success, info, warning, error
        type: "error",
        title: "錯誤提示",
        content: `User Name / Password Not correct, please try again`,
      });
      setBackDropOpen(false);
    }
  };

  return (
    <Fragment>
      <BackDrop open={backdropOpen} text={`Please wait...`} />
      <Alert
        open={alertOpen}
        alertType={alertData.type}
        alertTitle={alertData.title}
        alertContent={alertData.content}
        handleClose={() => setAlertOpen(false)}
      />
      <Paper elevation={3}>
        <Box
          sx={(theme) => ({
            width: "100%",
            zIndex: 10,
            pt: 5,
            pb: 1.5,
            height: "95vh",
          })}
        >
          <Typography sx={{ color: "#3e4444" }} variant="h4" align="center">
            Login
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              p: 10,
              // backgroundColor: "#d5e1df",
              // height: "60vh",
              // width: "80%",
            }}
          >
            <Grid
              container
              spacing={1}
              sx={{
                px: 1,
              }}
            >
              <Grid item xs={12} align="center">
                <FormControl sx={{ width: "100%", margin: "8px 0" }}>
                  <TextField
                    size="small"
                    id="outlined-multiline-static"
                    label={`User Name`}
                    value={username}
                    onChange={handleUserNameChange}
                    name={`username`}
                    sx={{ width: "100%" }}
                    // error={validateMsg !== ""}
                    // helperText={validateMsg}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} align="center">
                <FormControl sx={{ width: "100%", margin: "8px 0" }}>
                  <TextField
                    size="small"
                    id="outlined-multiline-static"
                    label={`Password`}
                    value={password}
                    onChange={handlePasswordChange}
                    name={`password`}
                    sx={{ width: "100%" }}
                    // error={validateMsg !== ""}
                    // helperText={validateMsg}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" onClick={handleSignIn}>
                  Login
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Fragment>
  );
};

export default Login;
