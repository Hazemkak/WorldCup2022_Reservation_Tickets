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
    Modal,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { API_BASE_URL } from "../../config/variables";
import useFetch from "../../hooks/useFetch";
import { Match, Referee, Stadium, Team } from "../../types";
import { useAlert } from "../../context/AlertContext";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 650,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    bgcolor: "background.paper",
    boxShadow: 18,
    p: 4,
};

type EditMatchModalProps = {
    matchData: Match | null;
    setMatchData: (matchData: Match) => void;
    open: boolean;
    closeModal: () => void;
};

const EditMatchModal: React.FC<EditMatchModalProps> = ({
    matchData,
    setMatchData,
    open,
    closeModal,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string>("");

    const { setAlert } = useAlert();

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
                .put(`${API_BASE_URL}/matches/${matchData?.id}/edit`, values, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                })
                .then((res: { data: { message: string; match: Match } }) => {
                    setAlert(res?.data?.message, "success");
                    setApiError("");
                    setMatchData(res?.data?.match);
                    closeModal();
                })
                .catch((err) => {
                    if ("detail" in err.response.data) {
                        setApiError(err.response.data.detail);
                    } else {
                        setApiError("Failed to register");
                    }
                })
                .finally(() => {
                    reset();
                    setLoading(false);
                });
        },
        [closeModal, matchData?.id, reset, setAlert, setMatchData]
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

    if (matchData === null) {
        closeModal();
        return null;
    }

    return (
        <div>
            <Modal open={open} onClose={closeModal}>
                <Box sx={style}>
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <EditIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Edit Match Details
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
                                                <MenuItem value="" disabled>
                                                    Choose Stadium
                                                </MenuItem>
                                                {stadiumData?.map(
                                                    (stadium: Stadium) => (
                                                        <MenuItem
                                                            key={stadium.id}
                                                            value={stadium.id}
                                                            selected={
                                                                stadium.id ===
                                                                matchData
                                                                    ?.stadium.id
                                                            }
                                                        >
                                                            {stadium.name}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                        )}
                                        name="stadiumId"
                                        control={control}
                                        defaultValue={matchData?.stadium.id}
                                        rules={{
                                            required:
                                                "Please choose your stadium.",
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
                                    defaultValue={matchData?.match_date}
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
                                    defaultValue={matchData?.match_time}
                                    control={control}
                                    rules={{
                                        required:
                                            "Please choose the match time.",
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
                                    <InputLabel
                                        htmlFor="team1Id"
                                        id="team1Id-label"
                                    >
                                        Select Team 1
                                    </InputLabel>
                                    <Controller
                                        render={({ field: props }) => (
                                            <Select
                                                value={props.value}
                                                onChange={props.onChange}
                                            >
                                                <MenuItem value="" disabled>
                                                    Choose Team 1
                                                </MenuItem>
                                                {teamsData?.map(
                                                    (team: Team) => (
                                                        <MenuItem
                                                            key={team.id}
                                                            value={team.id}
                                                            selected={
                                                                team.id ===
                                                                matchData
                                                                    ?.teams[0]
                                                                    .id
                                                            }
                                                        >
                                                            {team.name}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                        )}
                                        name="team1Id"
                                        control={control}
                                        defaultValue={matchData?.teams[0].id}
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
                                    <InputLabel
                                        htmlFor="team2Id"
                                        id="team2Id-label"
                                    >
                                        Select Team 2
                                    </InputLabel>
                                    <Controller
                                        render={({ field: props }) => (
                                            <Select
                                                value={props.value}
                                                onChange={props.onChange}
                                            >
                                                <MenuItem value="" disabled>
                                                    Choose Team 2
                                                </MenuItem>
                                                {teamsData?.map(
                                                    (team: Team) => (
                                                        <MenuItem
                                                            key={team.id}
                                                            value={team.id}
                                                            selected={
                                                                team.id ===
                                                                matchData
                                                                    ?.teams[1]
                                                                    .id
                                                            }
                                                        >
                                                            {team.name}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                        )}
                                        name="team2Id"
                                        control={control}
                                        defaultValue={matchData?.teams[1].id}
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
                                                <MenuItem value="" disabled>
                                                    Choose the main referee
                                                </MenuItem>
                                                {refereesData?.map(
                                                    (referee: Referee) => {
                                                        if (
                                                            referee.role === "1"
                                                        ) {
                                                            return (
                                                                <MenuItem
                                                                    key={
                                                                        referee.id
                                                                    }
                                                                    value={
                                                                        referee.id
                                                                    }
                                                                    selected={
                                                                        referee.id ===
                                                                        matchData
                                                                            ?.referees[0]
                                                                            .id
                                                                    }
                                                                >
                                                                    {
                                                                        referee.firstName
                                                                    }{" "}
                                                                    {
                                                                        referee.lastName
                                                                    }
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
                                        defaultValue={matchData?.referees[0].id}
                                        rules={{
                                            required:
                                                "Please choose the main referee.",
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
                                                <MenuItem value="" disabled>
                                                    Choose the first line
                                                    referee
                                                </MenuItem>
                                                {refereesData?.map(
                                                    (referee: Referee) => {
                                                        if (
                                                            referee.role === "0"
                                                        ) {
                                                            return (
                                                                <MenuItem
                                                                    key={
                                                                        referee.id
                                                                    }
                                                                    value={
                                                                        referee.id
                                                                    }
                                                                    selected={
                                                                        referee.id ===
                                                                        matchData
                                                                            ?.referees[1]
                                                                            .id
                                                                    }
                                                                >
                                                                    {
                                                                        referee.firstName
                                                                    }{" "}
                                                                    {
                                                                        referee.lastName
                                                                    }
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
                                        defaultValue={matchData?.referees[1].id}
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
                                                <MenuItem value="" disabled>
                                                    Choose the second line
                                                    referee
                                                </MenuItem>
                                                {refereesData?.map(
                                                    (referee: Referee) => {
                                                        if (
                                                            referee.role === "0"
                                                        ) {
                                                            return (
                                                                <MenuItem
                                                                    key={
                                                                        referee.id
                                                                    }
                                                                    value={
                                                                        referee.id
                                                                    }
                                                                    selected={
                                                                        referee.id ===
                                                                        matchData
                                                                            ?.referees[2]
                                                                            .id
                                                                    }
                                                                >
                                                                    {
                                                                        referee.firstName
                                                                    }{" "}
                                                                    {
                                                                        referee.lastName
                                                                    }
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
                                        defaultValue={matchData?.referees[2].id}
                                        rules={{
                                            required:
                                                "Please choose the second line referee.",
                                            validate: (value) =>
                                                value !==
                                                    watch("lineReferee1Id") ||
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
                            Save
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default EditMatchModal;
