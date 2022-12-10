import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import useFetch from "../../hooks/useFetch";
import { Match } from "../../types";
import MatchCard from "./MatchCard";
import "./styles/MatchList.css";
import NoMatchesToday from "./NoMatchesToday";
import moment from "moment";

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    boxShadow: "0px 4px 4px rgba(219, 219, 219)",
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

interface MatchListProps {
    matchesUrl?: string;
}

const MatchList: React.FC<MatchListProps> = ({ matchesUrl }) => {
    const [date, setDate] = React.useState<Dayjs>(dayjs(new Date()));
    const [matches, error, loading, refetchMatches] = useFetch("matches", {
        method: "GET",
        url: `/matches?day=${moment(date?.toString()).format("YYYY-MM-DD")}`,
    }) as unknown as [Match[], unknown, boolean, Function];

    React.useEffect(() => {
        refetchMatches();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    if (loading) return <>Loading</>;
    if (error) return <>{error}</>;

    return (
        <Box sx={{ width: "100%" }}>
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                <Grid item xs={3}>
                    <Item>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <CalendarPicker
                                date={date}
                                onChange={(newDate) =>
                                    setDate(
                                        newDate ? newDate : dayjs(new Date())
                                    )
                                }
                            />
                        </LocalizationProvider>
                    </Item>
                </Grid>
                <Grid item xs={9}>
                    <Grid container rowSpacing={1}>
                        {!matches?.length && <NoMatchesToday />}
                        {matches.map((match) => (
                            <MatchCard
                                key={match.id}
                                matchesUrl={matchesUrl}
                                match={match}
                            />
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MatchList;
