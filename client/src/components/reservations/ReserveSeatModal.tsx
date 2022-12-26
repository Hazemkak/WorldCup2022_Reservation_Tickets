import React, { useCallback, useState } from "react";
import {
    Avatar,
    Button,
    Box,
    Grid,
    TextField,
    Typography,
    Modal,
} from "@mui/material";
import StadiumIcon from "@mui/icons-material/Stadium";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_BASE_URL } from "../../config/variables";
import { getLoggedInUser } from "../../helpers/auth";
import moment from "moment";
import { useAlert } from "../../context/AlertContext";
import {
    isValidCardNumber,
    isValidCardExpirationDate,
    isValidCardCvv,
} from "../../helpers/reservation";

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

type ReserveSeatModalProps = {
    matchId: number;
    seatNumber: number;
    setDisableSeatCell: (disable: boolean) => void;
    refetchReservations: Function;
    open: boolean;
    closeModal: () => void;
};

const ReserveSeatModal: React.FC<ReserveSeatModalProps> = ({
    matchId,
    seatNumber,
    setDisableSeatCell,
    refetchReservations,
    open,
    closeModal,
}) => {
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
                .post(
                    `${API_BASE_URL}/reservations`,
                    {
                        match_id: matchId,
                        user_id: getLoggedInUser()?.id,
                        reservationDate: moment().format("YYYY-MM-DD"),
                        seatId: seatNumber,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                )
                .then((res: { data: { message: string } }) => {
                    setAlert(res?.data?.message, "success");
                    refetchReservations();
                    closeModal();
                })
                .catch((err: { response: { data: { detail: string } } }) => {
                    setAlert(err?.response?.data?.detail);
                    setApiError(err?.response?.data?.detail);
                })
                .finally(() => {
                    setDisableSeatCell(false);
                    setLoading(false);
                    reset();
                });
        },
        [
            closeModal,
            matchId,
            refetchReservations,
            reset,
            seatNumber,
            setAlert,
            setDisableSeatCell,
        ]
    );

    return (
        <div>
            <Modal open={open} onClose={closeModal}>
                <Box sx={style}>
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <StadiumIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        You are reserving seat number {seatNumber}
                    </Typography>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ marginTop: "1rem", maxWidth: "650px" }}
                    >
                        <TextField
                            margin="normal"
                            fullWidth
                            id="cartName"
                            label="Card Holder Name"
                            autoComplete="cartName"
                            {...register("cartName", {
                                required: "Card holder name is required",
                            })}
                            error={Boolean(errors.cartName)}
                            helperText={errors.cartName?.message?.toString()}
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            id="cartNumber"
                            label="Card Number"
                            autoComplete="cartNumber"
                            {...register("cartNumber", {
                                required: "Card number is required",
                                validate: (value) => {
                                    if (!isValidCardNumber(value)) {
                                        return "Please enter a valid card number";
                                    }
                                    return true;
                                },
                            })}
                            error={Boolean(errors.cartNumber)}
                            helperText={errors.cartNumber?.message?.toString()}
                        />

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="cardExpiryDate"
                                    label="Expiry Date"
                                    autoComplete="cardExpiryDate"
                                    {...register("cardExpiryDate", {
                                        required:
                                            "Card expiry date is required",
                                        validate: (value) => {
                                            if (
                                                !isValidCardExpirationDate(
                                                    value
                                                )
                                            ) {
                                                return "Please choose a valid expiry date";
                                            }
                                            return true;
                                        },
                                    })}
                                    error={Boolean(errors.cardExpiryDate)}
                                    helperText={errors.cardExpiryDate?.message?.toString()}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="cardCVV"
                                    label="CVV"
                                    autoComplete="cardCVV"
                                    {...register("cardCVV", {
                                        required: "Card CVV is required",
                                        validate: (value) => {
                                            if (!isValidCardCvv(value)) {
                                                return "Please choose a card CVV";
                                            }
                                            return true;
                                        },
                                    })}
                                    error={Boolean(errors.cardCVV)}
                                    helperText={errors.cardCVV?.message?.toString()}
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ color: "red", mt: 2 }}>{apiError}</Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Reserve
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default ReserveSeatModal;
