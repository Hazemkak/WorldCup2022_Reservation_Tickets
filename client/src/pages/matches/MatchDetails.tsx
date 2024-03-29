import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import StadiumIcon from "@mui/icons-material/Stadium";
import EditIcon from "@mui/icons-material/Edit";
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Paper,
    Typography,
    Link,
} from "@mui/material";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Match } from "../../types";
import useFetch from "../../hooks/useFetch";
import { API_BASE_URL } from "../../config/variables";
import { getLoggedInUser, isLoggedIn } from "../../helpers/auth";
import EditMatchModal from "../../components/matches/EditMatchModal";
import { isMatchPlayed } from "../../helpers/match";
import Loader from "../../shared/Loader/Loader";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#eee",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    textAlign: "center",
    marginBottom: "48px",
    color: theme.palette.text.secondary,
}));

const MatchDetails: React.FC = () => {
    const [match, setMatch] = useState<Match | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const { match_id } = useParams<{ match_id: string }>();

    const [data, errors, loading] = useFetch("match", {
        method: "GET",
        url: `${API_BASE_URL}/matches/${match_id}`,
    });

    useEffect(() => {
        if (data) {
            setMatch(data);
        }
    }, [data]);

    const isValidMatchId = !isNaN(parseInt(String(match_id)));
    const isPlayed = isMatchPlayed(data);
    const isLoggedInUser = isLoggedIn();
    const isFan = getLoggedInUser()?.role === "0";
    const isManager = getLoggedInUser()?.role === "1";

    if (!isValidMatchId) return <p>Wrong param</p>;

    if (loading) {
        return <Loader />;
    }

    if (errors) {
        return <p>Errors: {errors}</p>;
    }

    return (
        <>
            <Container maxWidth="md">
                {isManager && !isPlayed && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: {
                                xs: "center",
                                md: "flex-end",
                            },
                            pb: 2,
                            px: {
                                xs: "auto",
                                md: "20px",
                                lg: "40px",
                            },
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<EditIcon />}
                            onClick={() => setEditModalOpen(true)}
                        >
                            Edit match details
                        </Button>
                    </Box>
                )}
                <Item
                    sx={{
                        mx: {
                            xs: "auto",
                            md: "20px",
                            lg: "40px",
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: {
                                    xs: "column",
                                    sm: "row",
                                },
                                justifyContent: "space-between",
                                px: {
                                    xs: 0,
                                    sm: 5,
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <img
                                    style={{
                                        maxWidth: "100%",
                                        borderRadius: "5px",
                                        marginBottom: "0.75rem",
                                    }}
                                    src={match?.teams[0].img_url}
                                    alt={`${match?.teams[0].name}'s Flag`}
                                />
                                <Typography color="text.primary">
                                    {match?.teams[0].name}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    my: 2,
                                }}
                            >
                                <Typography variant="h5" color="text.primary">
                                    vs
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {moment(match?.match_date).calendar({
                                        lastWeek: "[Last] dddd",
                                        lastDay: "[Yesterday]",
                                        sameDay: "[Today]",
                                        nextDay: "[Tomorrow]",
                                        nextWeek: "dddd",
                                        sameElse: "ddd, MMM DD",
                                    })}
                                    ,&nbsp;
                                    {moment(
                                        match?.match_time,
                                        "HH:mm:ss"
                                    ).format("h:mm A")}
                                </Typography>
                                {isPlayed && (
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Finished
                                    </Typography>
                                )}
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    style={{
                                        maxWidth: "100%",
                                        borderRadius: "5px",
                                        marginBottom: "0.75rem",
                                    }}
                                    src={match?.teams[1].img_url}
                                    alt={`${match?.teams[1].name}'s Flag`}
                                />
                                <Typography color="text.primary">
                                    {match?.teams[1].name}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider
                            sx={{
                                my: 3,
                                mx: {
                                    xs: 0,
                                    md: 5,
                                },
                            }}
                        />
                        <Grid
                            container
                            spacing={2}
                            px={{
                                xs: 0,
                                md: 5,
                            }}
                        >
                            <Grid item xs={12} md={6}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: {
                                            xs: "center",
                                            md: "flex-start",
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                        fontWeight="bold"
                                    >
                                        Stadium
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {match?.stadium.name}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        <strong>Location:</strong>{" "}
                                        {match?.stadium.city}
                                        {", "}
                                        {match?.stadium.country}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        <strong>Capacity:</strong>{" "}
                                        {Number(match?.stadium.rows) *
                                            Number(
                                                match?.stadium.seatsPerRow
                                            )}{" "}
                                        Seats
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: {
                                            xs: "center",
                                            md: "flex-start",
                                        },
                                        width: {
                                            xs: "100%",
                                            md: "fit-content",
                                        },
                                        marginLeft: "auto",
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                        fontWeight="bold"
                                    >
                                        Referees
                                    </Typography>
                                    <Typography color="text.secondary">
                                        <strong>
                                            {match?.referees[0].firstName}{" "}
                                            {match?.referees[0].lastName}
                                        </strong>
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {match?.referees[1].firstName}{" "}
                                        {match?.referees[1].lastName}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {match?.referees[2].firstName}{" "}
                                        {match?.referees[2].lastName}
                                    </Typography>
                                </Box>
                            </Grid>
                            {isLoggedInUser && isFan && (
                                <Box sx={{ width: "100%" }}>
                                    <Divider
                                        sx={{
                                            my: 3,
                                            width: "90%",
                                            mx: "auto",
                                        }}
                                    />
                                    <Grid item xs={12} sx={{ pt: 0, pl: 0 }}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Link
                                                href={`/match/reservations/${match?.id}`}
                                                sx={{
                                                    textDecoration: "none",
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={<StadiumIcon />}
                                                >
                                                    See Reservations
                                                </Button>
                                            </Link>
                                        </Box>
                                    </Grid>
                                </Box>
                            )}
                        </Grid>
                    </Box>
                </Item>
            </Container>

            {isManager && (
                <EditMatchModal
                    open={editModalOpen}
                    matchData={match}
                    setMatchData={setMatch}
                    closeModal={() => setEditModalOpen(false)}
                />
            )}
        </>
    );
};

export default MatchDetails;
