import React from "react";
import MatchDetails from "../matches/MatchDetails";
import MatchReservations from "../matchReservations";

const ManagerMatchDetails: React.FC = () => {
    return (
        <>
            <MatchDetails />
            <MatchReservations />
        </>
    );
};

export default ManagerMatchDetails;
