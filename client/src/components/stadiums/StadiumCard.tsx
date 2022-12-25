import React from "react";
import { Stadium } from "../../types";
import { CardContent, Typography } from "@mui/material";

type StadiumCardProps = {
    stadium: Stadium;
};

const StadiumCard: React.FC<StadiumCardProps> = ({ stadium }) => {
    return (
        <CardContent
            sx={{
                boxShadow: "0 2px 2px #ccc",
                height: "100%",
            }}
        >
            <Typography variant="h5" component="div">
                {stadium.name}
            </Typography>
            <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
            >
                {stadium.country} - {stadium.city}
            </Typography>
            <Typography color="text.secondary">
                Capacity: {stadium.rows * stadium.seatsPerRow} seats
            </Typography>
        </CardContent>
    );
};

export default StadiumCard;
