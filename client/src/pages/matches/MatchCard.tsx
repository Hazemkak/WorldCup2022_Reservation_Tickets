import React from "react";
import { styled } from "@mui/material/styles";
import { Link, Typography, Paper, Grid } from "@mui/material";
import moment from "moment";
import TeamDetails from "./TeamDetails";
import { Match } from "../../types";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    margin: "0px 40px",
    marginBottom: "10px",
    color: theme.palette.text.secondary,
}));

interface MatchCardProps {
    match: Match;
}
const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
    return (
        <Grid className="card_link" key={match.id} item xs={12}>
            <Link underline="none" href={`/matches/${match.id}`}>
                <Item>
                    <Grid
                        container
                        rowSpacing={1}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={1} />
                        <Grid className="teams_grid" item xs={8}>
                            <Grid
                                container
                                direction="column"
                                alignItems="start"
                            >
                                {match?.teams?.map((team) => (
                                    <TeamDetails
                                        key={team.id}
                                        team_name={team.name}
                                        img_url={team.img_url}
                                    />
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>
                                {moment(match?.match_date).calendar({
                                    lastWeek: "[Last] dddd",
                                    lastDay: "[Yesterday]",
                                    sameDay: "[Today]",
                                    nextDay: "[Tomorrow]",
                                    nextWeek: "dddd",
                                    sameElse: "ddd, MMM DD",
                                })}
                            </Typography>
                            <Typography>
                                {moment(match?.match_time, "HH:mm:ss").format(
                                    "h:mm A"
                                )}
                            </Typography>
                        </Grid>
                    </Grid>
                </Item>
            </Link>
        </Grid>
    );
};

export default MatchCard;
