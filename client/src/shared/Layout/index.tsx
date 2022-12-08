import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BasicProps } from "../../types";
import Navbar from "../Navbar";
import Footer from "../footer";

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
            <Footer />
        </ThemeProvider>
    );
};

export default Layout;
