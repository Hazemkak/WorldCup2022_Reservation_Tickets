import React from "react";
import { API_BASE_URL } from "../../config/variables";
import Axios from "axios";
import { useAlert } from "../../context/AlertContext";
import { isLoggedIn } from "../../helpers/auth";

interface SeatCellProps {
  seatId: number;
  refetchReservations: Function;
  isReserved: boolean;
}

function SeatCell(props: SeatCellProps) {
  const { seatId, refetchReservations, isReserved } = props;
  const [disabled, setDisabled] = React.useState(false);
  const { setAlert } = useAlert();

  const validateUser = () => {
    if (!isLoggedIn()) {
      setAlert("Please Login/Register First");
      return false;
    }
    setDisabled(true);
    return true;
  };

  const handleReservation = () => {
    if (!validateUser()) return;
    Axios({
      method: "POST",
      url: `${API_BASE_URL}/reservations`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        match_id: 1,
        user_id: 10,
        reservationDate: "2022-06-06",
        seatId,
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
    <button
      disabled={disabled || isReserved}
      className={`seat ${isReserved && "seat_reserved"}`}
      onClick={() => handleReservation()}
    >
      {seatId}
    </button>
  );
}

export default SeatCell;
