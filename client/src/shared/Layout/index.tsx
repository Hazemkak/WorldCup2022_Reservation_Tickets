import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../Navbar";
import Footer from "../Footer";

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
interface LayoutProps {
    children?: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <main>
                <Box
                    sx={{
                        m: {
                            xs: 1,
                            sm: 2,
                            md: 6,
                        },
                        mt: { xs: 12, sm: 12, md: 12 },
                    }}
                >
                    {children}
                </Box>
            </main>
            <Footer />
        </ThemeProvider>
    );
};

export default Layout;
