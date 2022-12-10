import React, { useState } from "react";
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

function CreateStadium() {
    const [name, setName] = React.useState<string>("");
    const [rows, setRows] = React.useState<number>(0);
    const [seatsPerRow, setSeatsPerRow] = React.useState<number>(0);
    const [disabled, setDisabled] = useState(false);
    const { setAlert } = useAlert();

    const validateDate = () => {
        if (name === "") return setAlert("Name is required");
        if (rows <= 0 || isNaN(rows))
            return setAlert("Rows must be greater than 0");
        if (seatsPerRow <= 0 || isNaN(seatsPerRow))
            return setAlert("Seats per row must be greater than 0");
        return true;
    };
    const handleSubmit = () => {
        if (validateDate() !== true) return;
        setDisabled(true);
        axios
            .post(
                `${API_BASE_URL}/stadiums`,
                {
                    name,
                    rows,
                    seatsPerRow,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            )
            .then((res) => {
                setAlert("Stadium created successfully", "success");
                setName("");
                setRows(0);
                setSeatsPerRow(0);
            })
            .catch((err) => {
                setAlert(err?.response?.data?.detail);
            })
            .finally(() => setDisabled(false));
    };
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
            <Grid container spacing={3} maxWidth="650px">
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        color="secondary"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Enter stadium rows"
                        id="outlined-start-adornment"
                        type="number"
                        value={rows}
                        onChange={(e) => setRows(parseInt(e.target.value))}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    rows
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Enter seats per row"
                        id="outlined-start-adornment"
                        type="number"
                        value={seatsPerRow}
                        onChange={(e) =>
                            setSeatsPerRow(parseInt(e.target.value))
                        }
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    seats/row
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={4}>
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={handleSubmit}
                        disabled={disabled}
                    >
                        Add Stadium
                    </Button>
                </Grid>
                <Grid item xs={4} />
            </Grid>
        </Box>
    );
}

export default CreateStadium;
