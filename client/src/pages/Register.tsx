import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Avatar,
    Button,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { API_BASE_URL } from "../config/variables";
import { isValidEmail } from "../helpers/user";
import { useAlert } from "../context/AlertContext";

const Register: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string>("");

    const { setAlert } = useAlert();

    const {
        register,
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = useCallback(
        (values: any) => {
            setLoading(true);
            axios
                .post(API_BASE_URL + "/auth/register", values)
                .then((res) => {
                    setApiError("");
                    window.location.href = "/auth/login";
                })
                .catch((err) => {
                    setAlert("Failed to register", "error");
                    if ("detail" in err.response.data) {
                        setApiError(err.response.data.detail);
                    } else if ("error" in err.response.data) {
                        setApiError(err.response.data.error);
                    } else {
                        setApiError("Failed to register");
                    }
                })
                .finally(() => {
                    reset();
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
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ marginTop: "1rem", maxWidth: "650px" }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="first_name"
                            label="First Name"
                            autoComplete="first_name"
                            autoFocus
                            {...register("first_name", {
                                required: "First Name is required",
                            })}
                            error={Boolean(errors.first_name)}
                            helperText={errors.first_name?.message?.toString()}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="last_name"
                            label="Last Name"
                            autoComplete="last_name"
                            {...register("last_name", {
                                required: "Last Name is required",
                            })}
                            error={Boolean(errors.last_name)}
                            helperText={errors.last_name?.message?.toString()}
                        />
                    </Grid>
                </Grid>
                <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    {...register("email", {
                        required: "Email is required",
                        validate: (value: string) => {
                            if (!isValidEmail(value)) {
                                return "Invalid email";
                            }
                        },
                    })}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message?.toString()}
                />

                <TextField
                    margin="normal"
                    fullWidth
                    id="username"
                    label="Username"
                    autoComplete="username"
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

                <TextField
                    margin="normal"
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-password"
                    {...register("confirmPassword", {
                        required: "Password Confirmation is required",
                        validate: (value: string) => {
                            if (value !== watch("password")) {
                                return "Passwords do not match";
                            }
                        },
                    })}
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword?.message?.toString()}
                />

                <TextField
                    margin="normal"
                    fullWidth
                    id="nationality"
                    label="Nationality"
                    autoComplete="nationality"
                    {...register("nationality")}
                    defaultValue=""
                    error={Boolean(errors.nationality)}
                    helperText={errors.nationality?.message?.toString()}
                />

                <Controller
                    name="birthDate"
                    control={control}
                    defaultValue={new Date()}
                    rules={{
                        required: "Please choose your birth date.",
                    }}
                    render={({ field: props }) => (
                        <TextField
                            margin="normal"
                            fullWidth
                            id="birthDate"
                            label="Birth Date"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...props}
                        />
                    )}
                />

                <FormControl
                    margin="normal"
                    fullWidth
                    error={Boolean(errors.gender)}
                >
                    <InputLabel htmlFor="gender" id="gender-label">
                        Select Gender
                    </InputLabel>
                    <Controller
                        render={({ field: props }) => (
                            <Select
                                value={props.value}
                                onChange={props.onChange}
                            >
                                <MenuItem value="" disabled selected>
                                    Choose gender
                                </MenuItem>
                                <MenuItem value="1">Male</MenuItem>
                                <MenuItem value="0">Female</MenuItem>
                            </Select>
                        )}
                        name="gender"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: "Please choose your gender.",
                        }}
                    />
                    <FormHelperText>
                        {errors.gender?.message?.toString()}
                    </FormHelperText>
                </FormControl>

                <FormControl
                    margin="normal"
                    fullWidth
                    error={Boolean(errors.role)}
                >
                    <InputLabel htmlFor="role" id="role-label">
                        Select Role
                    </InputLabel>
                    <Controller
                        render={({ field: props }) => (
                            <Select
                                value={props.value}
                                onChange={props.onChange}
                            >
                                <MenuItem value="" disabled selected>
                                    Choose role
                                </MenuItem>
                                <MenuItem value="0">Fan</MenuItem>
                                <MenuItem value="1">Manager</MenuItem>
                            </Select>
                        )}
                        name="role"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: "Please choose your role.",
                        }}
                    />
                    <FormHelperText>
                        {errors.role?.message?.toString()}
                    </FormHelperText>
                </FormControl>

                <Box sx={{ color: "red", mt: 2 }}>{apiError}</Box>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </Button>
                <Grid container>
                    <Grid item>
                        <Link
                            href="/auth/login"
                            sx={{ color: "text.secondary" }}
                        >
                            Already have an account? Login
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default Register;
