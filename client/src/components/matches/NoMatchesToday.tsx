import React from "react";
import Grid from "@mui/material/Grid";
import Item from "../Item";

function NoMatchesToday() {
    return (
        <Grid item xs={12}>
            <Item>No Matches Today 😢</Item>
        </Grid>
    );
}

export default NoMatchesToday;
