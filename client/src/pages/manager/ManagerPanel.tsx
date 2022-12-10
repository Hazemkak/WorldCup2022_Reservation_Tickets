import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, Link, Typography } from "@mui/material";
import MatchList from "../matches/MatchList";

const ManagerPanel: React.FC = () => {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    pb: 5,
                }}
            >
                <Typography variant="h4" fontWeight="bold">
                    Manager Panel
                </Typography>
                <Link href="/manager/matches/create">
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleIcon />}
                    >
                        Create new match
                    </Button>
                </Link>
            </Box>
            <MatchList matchesUrl="/manager/matches" />
        </>
    );
};

export default ManagerPanel;
