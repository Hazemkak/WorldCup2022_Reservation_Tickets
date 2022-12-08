import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BasicProps } from "../../types";
import Navbar from "../Navbar";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © FIFA - CUFE Branch "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme({
    palette: {
        primary: {
            main: "#550065",
        },
    },
    typography: {
        fontFamily: "Poppins, sans-serif",
    },
});

const Layout: React.FC<BasicProps> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <main>
                <Box sx={{ m: 6, mt: 12 }}>{children}</Box>
            </main>
            <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
                <Copyright />
            </Box>
        </ThemeProvider>
    );
};

export default Layout;
