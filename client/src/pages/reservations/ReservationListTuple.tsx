import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Reservation } from "../../types";
import Axios from "axios";
import { getLoggedInUser } from "../../helpers/auth";
import { API_BASE_URL } from "../../config/variables";
import { AlertContext, useAlert } from "../../context/AlertContext";

interface ReservationListTupleProps {
  reservation: Reservation;
}
function ReservationListTuple(props: ReservationListTupleProps) {
  const { reservation } = props;
  const [disabled, setDisabled] = React.useState(false);

  const { message, setMessage } = useAlert();

  const handleDelete = (reservationId: number) => {
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
        console.log(res);
        setMessage({
          text: res?.data?.message,
          show: true,
          type: "success",
        });
        setDisabled(false);
      })
      .catch((err: { response: { data: { detail: string } } }) => {
        setMessage({
          text: err?.response?.data?.detail,
          show: true,
          type: "error",
        });
        setDisabled(false);
      });
  };

  return (
    <TableRow
      key={reservation?.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {reservation?.seatId}
      </TableCell>
      <TableCell align="left">{`${reservation?.match?.teams[0]?.name} vs ${reservation?.match?.teams[1]?.name}`}</TableCell>
      <TableCell align="left">
        {new Date(reservation?.match?.match_date).toDateString()}
      </TableCell>
      <TableCell align="left">{reservation?.match?.match_time}</TableCell>
      <TableCell align="right">
        <IconButton
          disabled={disabled}
          color="error"
          aria-label="delete reservation"
          component="label"
          onClick={() => handleDelete(reservation?.id)}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default ReservationListTuple;
