import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Avatar,
    Button,
    TextField,
    Box,
    Typography,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Grid,
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import axios from "axios";
import { API_BASE_URL } from "../../config/variables";
import useFetch from "../../hooks/useFetch";
import { Referee, Stadium, Team } from "../../types";

const CreateMatch: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string>("");

    const [stadiumData, stadiumErrors, stadiumLoading] = useFetch("stadiums", {
        method: "GET",
        url: `${API_BASE_URL}/stadiums`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    const [teamsData, teamsErrors, teamsLoading] = useFetch("teams", {
        method: "GET",
        url: `${API_BASE_URL}/teams`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    const [refereesData, refereesErrors, refereesLoading] = useFetch(
        "referees",
        {
            method: "GET",
            url: `${API_BASE_URL}/referees`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = useCallback(
        (values: any) => {
            console.log(values);
            setLoading(true);
            axios
                .post(`${API_BASE_URL}/matches/create`, values, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                })
                .then((res) => {
                    setApiError("");
                    reset();
                    window.location.href =
                        "/manager/matches/" + res.data.match.id;
                })
                .catch((err) => {
                    if ("detail" in err.response.data) {
                        setApiError(err.response.data.detail);
                    } else {
                        setApiError("Failed to register");
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [reset]
    );

    if (stadiumErrors || teamsErrors || refereesErrors) {
        return (
            <>
                Errors:
                <p>{stadiumErrors}</p>
                <p>{teamsErrors}</p>
                <p>{refereesErrors}</p>
            </>
        );
    }

    return (
        <Box
            sx={{
                marginTop: 12,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <SportsSoccerIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Create Match
            </Typography>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ marginTop: "1rem", maxWidth: "650px" }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl
                            fullWidth
                            disabled={stadiumLoading}
                            error={Boolean(errors.stadiumId)}
                        >
                            <InputLabel
                                htmlFor="stadiumId"
                                id="stadiumId-label"
                            >
                                Select Stadium
                            </InputLabel>
                            <Controller
                                render={({ field: props }) => (
                                    <Select
                                        value={props.value}
                                        onChange={props.onChange}
                                    >
                                        <MenuItem value="" disabled selected>
                                            Choose Stadium
                                        </MenuItem>
                                        {stadiumData?.map(
                                            (stadium: Stadium) => (
                                                <MenuItem
                                                    key={stadium.id}
                                                    value={stadium.id}
                                                >
                                                    {stadium.name}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                )}
                                name="stadiumId"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Please choose your stadium.",
                                }}
                            />
                            <FormHelperText>
                                {errors.stadiumId?.message?.toString()}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            name="matchDate"
                            control={control}
                            rules={{
                                required: "Please choose match date.",
                            }}
                            render={({ field: props }) => (
                                <TextField
                                    fullWidth
                                    id="matchDate"
                                    label="Match Date"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    {...props}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            name="matchTime"
                            control={control}
                            rules={{
                                required: "Please choose the match time.",
                            }}
                            render={({ field: props }) => (
                                <TextField
                                    fullWidth
                                    id="matchTime"
                                    label="Match Time"
                                    type="time"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    {...props}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl
                            fullWidth
                            disabled={teamsLoading}
                            error={Boolean(errors.team1Id)}
                        >
                            <InputLabel htmlFor="team1Id" id="team1Id-label">
                                Select Team 1
                            </InputLabel>
                            <Controller
                                render={({ field: props }) => (
                                    <Select
                                        value={props.value}
                                        onChange={props.onChange}
                                    >
                                        <MenuItem value="" disabled selected>
                                            Choose Team 1
                                        </MenuItem>
                                        {teamsData?.map((team: Team) => (
                                            <MenuItem
                                                key={team.id}
                                                value={team.id}
                                            >
                                                {team.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                                name="team1Id"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Please choose team 1.",
                                }}
                            />
                            <FormHelperText>
                                {errors.team1Id?.message?.toString()}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl
                            fullWidth
                            disabled={teamsLoading}
                            error={Boolean(errors.team2Id)}
                        >
                            <InputLabel htmlFor="team2Id" id="team2Id-label">
                                Select Team 2
                            </InputLabel>
                            <Controller
                                render={({ field: props }) => (
                                    <Select
                                        value={props.value}
                                        onChange={props.onChange}
                                    >
                                        <MenuItem value="" disabled selected>
                                            Choose Team 2
                                        </MenuItem>
                                        {teamsData?.map((team: Team) => (
                                            <MenuItem
                                                key={team.id}
                                                value={team.id}
                                            >
                                                {team.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                                name="team2Id"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Please choose team 2.",
                                    validate: (value) =>
                                        value !== watch("team1Id") ||
                                        "Team 2 must be different from team 1.",
                                }}
                            />
                            <FormHelperText>
                                {errors.team2Id?.message?.toString()}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl
                            fullWidth
                            disabled={refereesLoading}
                            error={Boolean(errors.mainRefereeId)}
                        >
                            <InputLabel
                                htmlFor="mainRefereeId"
                                id="mainRefereeId-label"
                            >
                                Select the main referee
                            </InputLabel>
                            <Controller
                                render={({ field: props }) => (
                                    <Select
                                        value={props.value}
                                        onChange={props.onChange}
                                    >
                                        <MenuItem value="" disabled selected>
                                            Choose the main referee
                                        </MenuItem>
                                        {refereesData?.map(
                                            (referee: Referee) => {
                                                if (referee.role === "1") {
                                                    return (
                                                        <MenuItem
                                                            key={referee.id}
                                                            value={referee.id}
                                                        >
                                                            {referee.firstName}{" "}
                                                            {referee.lastName}
                                                        </MenuItem>
                                                    );
                                                }
                                                return null;
                                            }
                                        )}
                                    </Select>
                                )}
                                name="mainRefereeId"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Please choose the main referee.",
                                }}
                            />
                            <FormHelperText>
                                {errors.mainRefereeId?.message?.toString()}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl
                            fullWidth
                            disabled={refereesLoading}
                            error={Boolean(errors.lineReferee1Id)}
                        >
                            <InputLabel
                                htmlFor="lineReferee1Id"
                                id="lineReferee1Id-label"
                            >
                                Select the first line referee
                            </InputLabel>
                            <Controller
                                render={({ field: props }) => (
                                    <Select
                                        value={props.value}
                                        onChange={props.onChange}
                                    >
                                        <MenuItem value="" disabled selected>
                                            Choose the first line referee
                                        </MenuItem>
                                        {refereesData?.map(
                                            (referee: Referee) => {
                                                if (referee.role === "0") {
                                                    return (
                                                        <MenuItem
                                                            key={referee.id}
                                                            value={referee.id}
                                                        >
                                                            {referee.firstName}{" "}
                                                            {referee.lastName}
                                                        </MenuItem>
                                                    );
                                                }
                                                return null;
                                            }
                                        )}
                                    </Select>
                                )}
                                name="lineReferee1Id"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required:
                                        "Please choose the first line referee.",
                                }}
                            />
                            <FormHelperText>
                                {errors.lineReferee1Id?.message?.toString()}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl
                            fullWidth
                            disabled={refereesLoading}
                            error={Boolean(errors.lineReferee2Id)}
                        >
                            <InputLabel
                                htmlFor="lineReferee2Id"
                                id="lineReferee2Id-label"
                            >
                                Select the second line referee
                            </InputLabel>
                            <Controller
                                render={({ field: props }) => (
                                    <Select
                                        value={props.value}
                                        onChange={props.onChange}
                                    >
                                        <MenuItem value="" disabled selected>
                                            Choose the second line referee
                                        </MenuItem>
                                        {refereesData?.map(
                                            (referee: Referee) => {
                                                if (referee.role === "0") {
                                                    return (
                                                        <MenuItem
                                                            key={referee.id}
                                                            value={referee.id}
                                                        >
                                                            {referee.firstName}{" "}
                                                            {referee.lastName}
                                                        </MenuItem>
                                                    );
                                                }
                                                return null;
                                            }
                                        )}
                                    </Select>
                                )}
                                name="lineReferee2Id"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required:
                                        "Please choose the second line referee.",
                                    validate: (value) =>
                                        value !== watch("lineReferee1Id") ||
                                        "The line referee 2 must be different from the line referee 1.",
                                }}
                            />
                            <FormHelperText>
                                {errors.lineReferee2Id?.message?.toString()}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>

                <Box sx={{ color: "red", mt: 2 }}>{apiError}</Box>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={
                        loading ||
                        stadiumLoading ||
                        teamsLoading ||
                        refereesLoading
                    }
                    sx={{ mt: 3, mb: 2 }}
                >
                    Create Match
                </Button>
            </form>
        </Box>
    );
};

export default CreateMatch;
