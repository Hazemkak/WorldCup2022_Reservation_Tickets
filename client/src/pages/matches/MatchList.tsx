import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import useFetch from "../../hooks/useFetch";
import { Match } from "../../types";
import MatchCard from "../../components/matches/MatchCard";
import "../../components/matches/styles/MatchList.css";
import NoMatchesToday from "../../components/matches/NoMatchesToday";
import moment from "moment";
import Loader from "../../shared/Loader/Loader";
import Item from "../../components/Item";

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

    if (loading) return <Loader />;
    if (error) return <>{error}</>;

    return (
        <Box sx={{ width: "100%" }}>
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                <Grid item xs={12} md={5} lg={4} xl={3}>
                    <Item>
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            sx={{ width: "100%" }}
                        >
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
                <Grid item xs={12} md={7} lg={8} xl={9}>
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
