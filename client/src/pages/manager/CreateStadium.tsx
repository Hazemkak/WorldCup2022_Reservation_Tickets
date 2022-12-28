import React, { useCallback, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import {
    Avatar,
    Button,
    TextField,
    Box,
    Typography,
    Grid,
} from "@mui/material";
import StadiumIcon from "@mui/icons-material/Stadium";
import axios from "axios";
import { API_BASE_URL } from "../../config/variables";
import { useAlert } from "../../context/AlertContext";
import { useForm } from "react-hook-form";

function CreateStadium() {
    const [loading, setLoading] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string>("");

    const { setAlert } = useAlert();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = useCallback(
        (values: any) => {
            setLoading(true);
            axios
                .post(`${API_BASE_URL}/stadiums`, values, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                })
                .then((res) => {
                    setAlert(res.data.message, "success");
                    setApiError("");
                    reset();
                    window.location.href = "/manager/panel";
                })
                .catch((err) => {
                    setAlert(err?.response?.data?.detail, "error");
                    setApiError(err?.response?.data?.detail);
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [reset, setAlert]
    );

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
                <StadiumIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Add Stadium
            </Typography>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ marginTop: "1rem", maxWidth: "650px" }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="name"
                            label="Name"
                            autoComplete="name"
                            autoFocus
                            {...register("name", {
                                required: "Name is required",
                            })}
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message?.toString()}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="city"
                            label="City"
                            {...register("city", {
                                required: "City is required",
                            })}
                            error={Boolean(errors.city)}
                            helperText={errors.city?.message?.toString()}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="country"
                            label="Country"
                            {...register("country", {
                                required: "Country is required",
                            })}
                            error={Boolean(errors.country)}
                            helperText={errors.country?.message?.toString()}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="rows"
                            label="Number of rows"
                            type="number"
                            {...register("rows", {
                                required: "Number of rows is required",
                                min: {
                                    value: 1,
                                    message: "Rows must be greater than 0",
                                },
                            })}
                            error={Boolean(errors.rows)}
                            helperText={errors.rows?.message?.toString()}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        rows
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="seatsPerRow"
                            label="Number of seats/row"
                            type="number"
                            {...register("seatsPerRow", {
                                required: "Number of seats per row is required",
                                min: {
                                    value: 1,
                                    message:
                                        "Seats per row must be greater than 0",
                                },
                            })}
                            error={Boolean(errors.seatsPerRow)}
                            helperText={errors.seatsPerRow?.message?.toString()}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        seats/row
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ color: "red" }}>{apiError}</Box>
                    </Grid>

                    <Grid item xs={12} sm={4} />
                    <Grid item xs={12} sm={4}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            disabled={loading}
                        >
                            Add Stadium
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4} />
                </Grid>
            </form>
        </Box>
    );
}

export default CreateStadium;
