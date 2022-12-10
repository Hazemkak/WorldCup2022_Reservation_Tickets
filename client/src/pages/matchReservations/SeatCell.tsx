import React, { useState } from "react";
import { API_BASE_URL } from "../../config/variables";
import Axios from "axios";
import { useAlert } from "../../context/AlertContext";
import { getLoggedInUser, isLoggedIn } from "../../helpers/auth";
import moment from "moment";
import { useParams } from "react-router-dom";

interface SeatCellProps {
    seatId: number;
    refetchReservations: Function;
    isReserved: boolean;
}

const SeatCell: React.FC<SeatCellProps> = ({
    seatId,
    refetchReservations,
    isReserved,
}) => {
    const [disabled, setDisabled] = useState(false);

    const { match_id } = useParams<{ match_id: string }>();

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

        if (!window.confirm("Are you sure you want to reserve this seat?")) {
            setDisabled(false);
            return;
        }

        Axios({
            method: "POST",
            url: `${API_BASE_URL}/reservations`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data: {
                match_id,
                user_id: getLoggedInUser()?.id,
                reservationDate: moment().format("YYYY-MM-DD"),
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

    const isValidMatchId = !isNaN(parseInt(String(match_id)));
    const isManager = getLoggedInUser()?.role === "1";

    if (!isValidMatchId) return <p>Wrong param</p>;

    return (
        <button
            disabled={disabled || isReserved || isManager}
            style={{ cursor: isManager ? "default" : "pointer" }}
            className={`seat ${isReserved && "seat_reserved"}`}
            onClick={() => handleReservation()}
        >
            {seatId}
        </button>
    );
};

export default SeatCell;
