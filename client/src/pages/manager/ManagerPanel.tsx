import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, Link, Typography } from "@mui/material";
import MatchList from "../matches/MatchList";
import StadiumsList from "../../components/stadiums/StadiumsList";

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
                <div>
                    <Link href="/manager/matches/create">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddCircleIcon />}
                        >
                            Create new match
                        </Button>
                    </Link>
                    <Link
                        sx={{ ml: "10px", textDecoration: "none" }}
                        href="/manager/stadium/create"
                    >
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<AddCircleIcon />}
                        >
                            Add new Stadium
                        </Button>
                    </Link>
                </div>
            </Box>
            <MatchList matchesUrl="/manager/matches" />
            <StadiumsList />
        </>
    );
};

export default ManagerPanel;
