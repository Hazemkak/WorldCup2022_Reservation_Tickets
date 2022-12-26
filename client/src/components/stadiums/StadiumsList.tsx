import React from "react";
import { Grid, Typography } from "@mui/material";
import { Stadium } from "../../types";
import useFetch from "../../hooks/useFetch";
import StadiumCard from "./StadiumCard";

const StadiumsList: React.FC = () => {
    const [data, error, loading] = useFetch("stadiums", {
        method: "GET",
        url: "/stadiums",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }) as unknown as [Stadium[], unknown, boolean];

    if (loading) return <>Loading</>;
    if (error) return <>{error}</>;

    return (
        <div style={{ marginTop: "3rem" }}>
            <Typography variant="h4" fontWeight="bold" my={3}>
                Available Stadiums
            </Typography>
            <Grid container spacing={4}>
                {data.map((stadium) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={stadium.id}>
                        <StadiumCard stadium={stadium} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default StadiumsList;
