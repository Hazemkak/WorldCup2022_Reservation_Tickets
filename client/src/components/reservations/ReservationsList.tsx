import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Reservation } from "../../types";
import useFetch from "../../hooks/useFetch";
import ReservationListHeader from "./ReservationListHeader";
import ReservationListTuple from "./ReservationListTuple";
import Loader from "../../shared/Loader/Loader";

const ReservationsList: React.FC = () => {
    const [data, error, loading, refetchReservations] = useFetch(
        "reservations",
        {
            method: "GET",
            url: "/reservations/list",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    ) as unknown as [Reservation[], unknown, boolean, Function];

    if (loading) return <Loader />;
    if (error) return <>{error}</>;

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <ReservationListHeader />
                    <TableBody>
                        {!data?.length && <>No reservations yet</>}
                        {data?.map((reservation: Reservation) => (
                            <ReservationListTuple
                                key={reservation?.id}
                                reservation={reservation}
                                refetchReservations={refetchReservations}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ReservationsList;
