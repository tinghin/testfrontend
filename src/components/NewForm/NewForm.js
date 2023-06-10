import React, { Fragment, useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Avatar,
  Paper
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import BackDrop from "../../components/BackDrop";
import store from "store"

const NewForm = () => {
  const [formDetails,setFormDetails]=useState({
    creator: store.get("username")
  })
  return <Fragment>
            <Box sx={{ p: 3 }}>
            <Typography
              component="h1"
              variant="h5"
              align="center"
              sx={{ color: "#5f6971" }}
            >
          New Form 
        </Typography>
        <Grid container spacing={1}>
          <Typography component="h1"
              variant="h6"
              sx={{ color: "#5f6971" }}>
                Personal Information
            </Typography>
          <Grid item xs={12}>
          <FormControl sx={{ width: "100%", margin: "8px 0" }}>
                  <TextField
                    size="small"
                    id="outlined-multiline-static"
                    label={`Creator`}
                    value={formDetails.creator}
                    // onChange={handleUserNameChange}
                    name={`username`}
                    sx={{ width: "100%" }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </FormControl>
                <FormControl sx={{ width: "100%", margin: "8px 0" }}>
                  <TextField
                    size="small"
                    id="outlined-multiline-static"
                    label={`Creator`}
                    value={store.get("username")}
                    // onChange={handleUserNameChange}
                    name={`username`}
                    sx={{ width: "100%" }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </FormControl>
          </Grid>
        </Grid>
            </Box>
          </Fragment>;
};

export default NewForm;
