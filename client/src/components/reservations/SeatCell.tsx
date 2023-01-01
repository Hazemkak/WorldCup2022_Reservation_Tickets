import React, { useState } from "react";
import { useAlert } from "../../context/AlertContext";
import { getLoggedInUser, isLoggedIn } from "../../helpers/auth";
import { Navigate, useParams } from "react-router-dom";
import ReserveSeatModal from "./ReserveSeatModal";

interface SeatCellProps {
    seatId: number;
    refetchReservations: Function;
    isReserved: boolean;
    isPassedDate: boolean;
}

const SeatCell: React.FC<SeatCellProps> = ({
    seatId,
    refetchReservations,
    isReserved,
    isPassedDate,
}) => {
    const [disabled, setDisabled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { match_id } = useParams<{ match_id: string }>();

    const { setAlert } = useAlert();

    const isValidMatchId = !isNaN(parseInt(String(match_id)));
    const isManager = getLoggedInUser()?.role === "1";

    const validateUser = () => {
        if (!isLoggedIn() || isPassedDate || isReserved || isManager) {
            setAlert("Please Login/Register First");
            return false;
        }
        setDisabled(true);
        return true;
    };

    const handleClick = () => {
        if (!validateUser()) return;
        setIsModalOpen(true);
    };

    if (!isValidMatchId) return <Navigate to="-1" />;

    return (
        <>
            <button
                disabled={disabled || isPassedDate || isReserved || isManager}
                style={{ cursor: isManager ? "default" : "pointer" }}
                className={`seat ${isReserved && "seat_reserved"}`}
                onClick={() => handleClick()}
            >
                {seatId}
            </button>

            {isModalOpen && (
                <ReserveSeatModal
                    matchId={parseInt(match_id || "0")}
                    seatNumber={seatId}
                    refetchReservations={refetchReservations}
                    setDisableSeatCell={setDisabled}
                    open={isModalOpen}
                    closeModal={() => {
                        setDisabled(false);
                        setIsModalOpen(false);
                    }}
                />
            )}
        </>
    );
};

export default SeatCell;
