import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import axios from "axios";
import { setLoggedInUser } from "../helpers/auth";
import { API_BASE_URL } from "../config/variables";
import { useLocation, useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";
import { User } from "../types";

const Login: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string>("");

    const { setAlert } = useAlert();

    const navigate = useNavigate();
    const location = useLocation();

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
                .post(API_BASE_URL + "/auth/login", values)
                .then(
                    (res: {
                        data: { message: string; token: string; user: User };
                    }) => {
                        setAlert(res?.data?.message, "success");
                        setApiError("");
                        const user = {
                            first_name: res?.data?.user?.first_name,
                            last_name: res?.data?.user?.last_name,
                            email: res?.data?.user?.email,
                            gender: res?.data?.user?.gender,
                            birthDate: res?.data?.user?.birthDate,
                            nationality: res?.data?.user?.nationality,
                        };
                        setLoggedInUser(user, res?.data?.token);
                        navigate(location.state?.from || "/");
                        window.location.reload();
                    }
                )
                .catch((err) => {
                    if ("detail" in err.response.data) {
                        setApiError(err.response.data.detail);
                    } else if ("error" in err.response.data) {
                        setApiError(err.response.data.error);
                    } else {
                        setApiError("Failed to login");
                    }
                })
                .finally(() => {
                    reset();
                    setLoading(false);
                });
        },
        [location.state?.from, navigate, reset, setAlert]
    );

    useEffect(() => {
        const error = localStorage.getItem("error");
        if (error) {
            setApiError(error);
            setAlert(error, "error");
            localStorage.removeItem("error");
        }
    }, [setAlert]);

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
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ marginTop: "1rem", maxWidth: "650px" }}
            >
                <TextField
                    margin="normal"
                    fullWidth
                    id="username"
                    label="Username"
                    autoComplete="username"
                    autoFocus
                    {...register("username", {
                        required: "Username is required",
                    })}
                    error={Boolean(errors.username)}
                    helperText={errors.username?.message?.toString()}
                />

                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...register("password", {
                        required: "Password is required",
                    })}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message?.toString()}
                />

                <Box sx={{ color: "red", mt: 2 }}>{apiError}</Box>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{ mt: 3, mb: 2 }}
                >
                    Login
                </Button>
                <Grid container>
                    <Grid item>
                        <Link
                            href="/auth/register"
                            sx={{ color: "text.secondary" }}
                        >
                            {"Don't have an account? Register"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default Login;
