import React, { useCallback, useState } from "react";
import {
    Avatar,
    Button,
    Box,
    Grid,
    TextField,
    Typography,
    Modal,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { User } from "../../types";
import { API_BASE_URL } from "../../config/variables";
import { isValidEmail } from "../../helpers/user";

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

type EditProfileModalProps = {
    userData: User;
    setUserData: (userData: User) => void;
    open: boolean;
    closeModal: () => void;
};

const EditProfileModal: React.FC<EditProfileModalProps> = ({
    userData,
    setUserData,
    open,
    closeModal,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string>("");

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = useCallback(
        (values: any) => {
            setLoading(true);
            axios
                .put(
                    `${API_BASE_URL}/users/profile/${userData.username}/`,
                    values,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    setApiError("");
                    setUserData(res.data["user"]);
                    closeModal();
                })
                .catch((err) => {
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
        [closeModal, reset, setUserData, userData.username]
    );

    return (
        <div>
            <Modal open={open} onClose={closeModal}>
                <Box sx={style}>
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <EditIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Edit Profile
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
                                    defaultValue={userData.first_name}
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
                                    defaultValue={userData.last_name}
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
                            defaultValue={userData.email}
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
                            id="nationality"
                            label="Nationality"
                            autoComplete="nationality"
                            defaultValue={userData.nationality}
                            {...register("nationality")}
                            error={Boolean(errors.nationality)}
                            helperText={errors.nationality?.message?.toString()}
                        />

                        <Controller
                            name="birthDate"
                            control={control}
                            defaultValue={userData.birthDate}
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
                                defaultValue={userData.gender}
                                rules={{
                                    required: "Please choose your gender.",
                                }}
                            />
                            <FormHelperText>
                                {errors.gender?.message?.toString()}
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
                            Save
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default EditProfileModal;