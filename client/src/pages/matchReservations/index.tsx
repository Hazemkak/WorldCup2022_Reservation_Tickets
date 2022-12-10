import { Typography } from "@mui/material";
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { getLoggedInUser } from "../../helpers/auth";
import useFetch from "../../hooks/useFetch";
import { Match, Reservation } from "../../types";
import SeatCell from "./SeatCell";
import "./styles/MatchReservations.css";

function MatchReservations() {
    const { match_id } = useParams<{ match_id: string }>();

    const [data, error, loading] = useFetch("match", {
        method: "GET",
        url: `/matches/${match_id}`,
    }) as unknown as [Match, unknown, boolean, Function];

    const [
        reservations,
        errorReservation,
        loadingReservation,
        refetchReservations,
    ] = useFetch("reservations", {
        method: "GET",
        url: `/reservations/${match_id}`,
    }) as unknown as [Reservation[], unknown, boolean, Function];

    if (isNaN(parseInt(String(match_id)))) return <Navigate to="-1" />;

    if (getLoggedInUser()?.role !== "0") return <Navigate to="/" />;

    if (loading || loadingReservation) return <>Loading</>;

    if (error || errorReservation)
        return (
            <>
                {error}
                {errorReservation}
            </>
        );

    return (
        <>
            <Typography variant="h4" fontWeight="bold" textAlign="center">
                Reserve your seat
            </Typography>
            <div className="seats_container">
                <Typography color="text.secondary">
                    You can reserve a seat by clicking on it.
                </Typography>
                <Typography color="text.secondary" mb={3}>
                    You can only reserve one seat at a time.
                </Typography>
                <div>
                    {Array(data?.stadium?.rows)
                        .fill(0)
                        .map((_, i) => {
                            const reserved = reservations.map(
                                (reservation) => reservation.seatId
                            );
                            return (
                                <div className="seat_row">
                                    {Array(data?.stadium?.seatsPerRow)
                                        .fill(0)
                                        .map((_, j) => (
                                            <SeatCell
                                                isReserved={reserved.includes(
                                                    i *
                                                        data?.stadium
                                                            ?.seatsPerRow +
                                                        j +
                                                        1
                                                )}
                                                refetchReservations={
                                                    refetchReservations
                                                }
                                                seatId={
                                                    i *
                                                        data?.stadium
                                                            ?.seatsPerRow +
                                                    j +
                                                    1
                                                }
                                            />
                                        ))}
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
}

export default MatchReservations;
