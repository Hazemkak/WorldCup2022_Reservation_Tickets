import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { getLoggedInUser, isLoggedIn, logout } from "../../helpers/auth";

const drawerWidth = 240;
const navItems = [
    {
        linkText: "Home",
        linkPath: "",
        isShownWhenLoggedOut: true,
        isShownWhenLoggedIn: true,
    },

    {
        linkText: "Matches",
        linkPath: "matches",
        isShownWhenLoggedOut: true,
        isShownWhenLoggedIn: true,
    },
    {
        linkText: "Register",
        linkPath: "auth/register",
        isShownWhenLoggedOut: true,
        isShownWhenLoggedIn: false,
    },
    {
        linkText: "Login",
        linkPath: "auth/login",
        isShownWhenLoggedOut: true,
        isShownWhenLoggedIn: false,
    },
    {
        linkText: `${getLoggedInUser()?.first_name} ${
            getLoggedInUser()?.last_name
        }`,
        linkPath: `profile/${getLoggedInUser()?.username}`,
        isShownWhenLoggedOut: false,
        isShownWhenLoggedIn:
            true &&
            getLoggedInUser()?.role === "0" &&
            getLoggedInUser()?.isVerified,
    },
    {
        linkText: "Admin - Users",
        linkPath: "admin/users",
        isShownWhenLoggedOut: false,
        isShownWhenLoggedIn:
            true &&
            getLoggedInUser()?.role === "2" &&
            getLoggedInUser()?.isVerified,
    },
    {
        linkText: "Manager Panel",
        linkPath: "manager/panel",
        isShownWhenLoggedOut: false,
        isShownWhenLoggedIn:
            true &&
            getLoggedInUser()?.role === "1" &&
            getLoggedInUser()?.isVerified,
    },
];

const Navbar: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        logout();
        window.location.reload();
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    World Cup 2022
                </Link>
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.linkPath} disablePadding>
                        {!!(
                            (item.isShownWhenLoggedOut && !isLoggedIn()) ||
                            (item.isShownWhenLoggedIn && isLoggedIn())
                        ) && (
                            <Link
                                to={item.linkPath}
                                style={{
                                    width: "100%",
                                    textDecoration: "none",
                                    color: "#000",
                                }}
                            >
                                <ListItemButton sx={{ textAlign: "center" }}>
                                    <ListItemText primary={item.linkText} />
                                </ListItemButton>
                            </Link>
                        )}
                    </ListItem>
                ))}
                {isLoggedIn() && (
                    <ListItem disablePadding>
                        <ListItemButton
                            sx={{ textAlign: "center" }}
                            onClick={handleLogout}
                        >
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontWeight: "bold",
                            display: { xs: "none", sm: "block" },
                        }}
                    >
                        <Link
                            to="/"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            World Cup 2022
                        </Link>
                    </Typography>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        {navItems.map((item) => {
                            if (
                                (item.isShownWhenLoggedOut && !isLoggedIn()) ||
                                (item.isShownWhenLoggedIn && isLoggedIn())
                            )
                                return (
                                    <Link
                                        key={item.linkPath}
                                        to={item.linkPath}
                                        style={{
                                            textDecoration: "none",
                                            color: "#fff",
                                            padding: "10px 20px",
                                        }}
                                    >
                                        {item.linkText}
                                    </Link>
                                );

                            return null;
                        })}
                        {!!isLoggedIn() && (
                            <Button
                                onClick={handleLogout}
                                variant="outlined"
                                color="primary"
                                sx={{
                                    backgroundColor: "#fff",
                                    fontSize: "16px",
                                    fontWeight: "normal",
                                    textTransform: "none",
                                    padding: "10px 20px",
                                }}
                            >
                                Logout
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
};

export default Navbar;
