import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, Typography } from "@mui/material";
import moment from "moment";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Reservation } from "../../types";
import { getLoggedInUser } from "../../helpers/auth";
import { API_BASE_URL } from "../../config/variables";
import { useAlert } from "../../context/AlertContext";

interface ReservationListTupleProps {
    reservation: Reservation;
    refetchReservations: Function;
}

const ReservationListTuple: React.FC<ReservationListTupleProps> = ({
    reservation,
    refetchReservations,
}) => {
    const [disabled, setDisabled] = React.useState(false);

    const { setAlert } = useAlert();

    const handleDelete = (reservationId: number) => {
        if (
            !window.confirm("Are you sure you want to delete this reservation?")
        ) {
            return;
        }

        setDisabled(true);
        Axios({
            method: "DELETE",
            url: `${API_BASE_URL}/reservations`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data: {
                reservationId,
                user_id: getLoggedInUser()?.id,
            },
        })
            .then((res: { data: { message: string } }) => {
                setAlert(res?.data?.message, "success");
                refetchReservations();
            })
            .catch((err: { response: { data: { detail: string } } }) => {
                setAlert(err?.response?.data?.detail);
            })
            .finally(() => setDisabled(false));
    };

    return (
        <TableRow
            key={reservation?.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {reservation?.seatId}
            </TableCell>
            <TableCell align="left">
                <Link
                    to={`/matches/${reservation?.match?.id}`}
                    style={{
                        textDecoration: "none",
                        color: "#3636ff",
                    }}
                >
                    {reservation?.match?.teams[0]?.name} vs.{" "}
                    {reservation?.match?.teams[1]?.name}
                </Link>
            </TableCell>
            <TableCell align="left">
                {moment(reservation?.match?.match_date).calendar({
                    lastWeek: "[Last] dddd",
                    lastDay: "[Yesterday]",
                    sameDay: "[Today]",
                    nextDay: "[Tomorrow]",
                    nextWeek: "dddd",
                    sameElse: "Do of MMM, YYYY",
                })}
            </TableCell>
            <TableCell align="left">
                {moment(reservation?.match?.match_time, "HH:mm:ss").format(
                    "h:mm A"
                )}
            </TableCell>
            <TableCell align="center">
                <Button
                    disabled={disabled}
                    aria-label="Cancel"
                    color="error"
                    onClick={() => handleDelete(reservation?.id)}
                >
                    <Typography component="p">Cancel</Typography>
                    <CancelIcon sx={{ ml: 1 }} />
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default ReservationListTuple;
