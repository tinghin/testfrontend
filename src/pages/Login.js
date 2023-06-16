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
import bgImg from "../img/bg-01.jpg";
import HkmuIcon from "../img/hkmu.png";
import store from "store";
import { validateLogin } from "../datasource/login";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

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
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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

  const handleSignIn = async () => {
    setBackDropOpen(true);
    let data = { username: username, password: password };
    const user = await validateLogin(data);
    if (user.length > 0) {
      const userIndex = user[0];
      store.set("username", userIndex.username);
      store.set("title", userIndex.title);
      store.set("office", userIndex.office);
      store.set("full_access", userIndex.full_access === "Y" ? true : false);
      setTimeout(() => {
        setBackDropOpen(false);
        navigate("/");
      }, 1000);
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
      <div>
        <Paper
          elevation={3}
          sx={{
            backgroundImage: `url(${bgImg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            opacity: 0.8,
          }}
        >
          <Box
            sx={(theme) => ({
              width: "100%",
              zIndex: 5,
              pt: 3,
              pb: 1.5,
              height: "100vh",
              // backgroundColor:"white"
            })}
          >
            <Box
              sx={{
                borderRadius: "2.5%",
                backgroundColor: "white",
                height: "55vh",
                p: 5,
                mr: 25,
                ml: 25,
                mt: 10,
                mb: 5,
              }}
            >
              <Typography sx={{ color: "#3e4444" }} variant="h4" align="center">
                <img src={HkmuIcon} style={{ height: "125px" }} />
                <br />
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
                    <FormControl
                      variant="outlined"
                      sx={{ width: "100%", margin: "8px 0" }}
                    >
                      <InputLabel>Password</InputLabel>
                      <OutlinedInput
                        size="small"
                        value={password}
                        onChange={handlePasswordChange}
                        name={"password"}
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
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
          </Box>
        </Paper>
      </div>
    </Fragment>
  );
};

export default Login;
