import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer: React.FC = () => {
    return (
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
            <Typography variant="body2" color="text.secondary" align="center">
                {"Copyright © FIFA - CUFE Branch "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
        </Box>
    );
};

export default Footer;
