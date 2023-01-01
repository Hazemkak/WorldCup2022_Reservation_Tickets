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
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },
                    justifyContent: {
                        xs: "center",
                        sm: "space-between",
                    },
                    alignItems: "center",
                    pb: 5,
                }}
            >
                <Typography variant="h4" fontWeight="bold">
                    Manager Panel
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                        },
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Link
                        href="/manager/matches/create"
                        sx={{
                            textDecoration: "none",
                            mt: {
                                xs: 2,
                                sm: 0,
                            },
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddCircleIcon />}
                        >
                            Create new match
                        </Button>
                    </Link>
                    <Link
                        sx={{
                            ml: {
                                xs: 0,
                                sm: 1,
                            },
                            mt: {
                                xs: 1,
                                sm: 0,
                            },
                            textDecoration: "none",
                        }}
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
                </Box>
            </Box>
            <MatchList matchesUrl="/manager/matches" />
            <StadiumsList />
        </>
    );
};

export default ManagerPanel;
