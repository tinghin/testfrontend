import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import ListItemButton from "@mui/material/ListItemButton";
import Dashboard from "./Dashboard";
import FormList from "./FormList";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircle from "@mui/icons-material/AccountCircle";
import store from "store";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  minHeight: "40px",
  [theme.breakpoints.down("sm")]: {
    minHeight: "32px",
  },
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
}));
const Main = ({ children }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const logOut = () => {};

  const handleNavigate = (targetRoute) => {
    handleDrawerClose();
    navigate(targetRoute);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (!store.get("user_id")) {
      navigate("/login");
    }
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        open={open}
        sx={(theme) => ({ backgroundColor: theme.palette.primary.light })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={(theme) => ({
              //   marginRight: 5,
              //   ...(open && { display: "none" }),
              //   [theme.breakpoints.down("sm")]: {
              //     marginRight: 1,
              //   },
            })}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={(theme) => ({
                flex: 1,
                cursor: "pointer",
                letterSpacing: 2,
                [theme.breakpoints.down("sm")]: {
                  letterSpacing: 1,
                  textAlign: "center",
                },
              })}
              //   onClick={() => handleNavigate("/")}
            >
              Form System
            </Typography>
            <Box
              sx={(theme) => ({
                display: "inline-flex",
                fontWeight: 500,
                letterSpacing: "0.02857em",
                textTransform: "uppercase",
                padding: "8px 11px",
                borderRadius: "4px",
                alignItems: "center",
                [theme.breakpoints.down("sm")]: {
                  minWidth: 0,
                  p: 0,
                },
              })}
            >
              <IconButton size="small" onClick={() => {}}>
                <AccountCircle
                  sx={(theme) => ({
                    mr: 1,
                    [theme.breakpoints.down("sm")]: {
                      mr: 0,
                    },
                  })}
                />
              </IconButton>
              <Typography
                variant="subtitle1"
                noWrap
                component="div"
                sx={{
                  fontSize: "0.875rem",
                  whiteSpace: "pre-line",
                  lineHeight: 1.25,
                }}
              >
                {store.get("username")}
              </Typography>
            </Box>
            <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onKeyDown={handleDrawerClose}
              >
                <List
                  sx={(theme) => ({
                    py: 0,
                    minHeight: 64,
                    [theme.breakpoints.down("sm")]: { minHeight: 56 },
                  })}
                >
                  <ListItemButton
                    sx={{
                      minHeight: "inherit",
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => handleNavigate("/")}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <MenuIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={"Menu"}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                  <Divider />
                  <ListItemButton
                    sx={{
                      minHeight: "inherit",
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => handleNavigate("/form/create")}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <NoteAddIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={"Create Form"}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                  <ListItemButton
                    sx={{
                      minHeight: "inherit",
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => handleNavigate("/list")}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <FormatListNumberedRtlIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={"Form List"}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </List>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          p: 2,
          [theme.breakpoints.down("sm")]: { px: 1 },
        })}
      >
        <DrawerHeader />
        {window.location.pathname === "/" ? <FormList /> : children}
      </Box>
    </Box>
  );
};

export default Main;
