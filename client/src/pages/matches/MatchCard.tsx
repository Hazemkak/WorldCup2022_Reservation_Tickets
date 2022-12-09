import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Match } from "../../types";
import TeamDetails from "./TeamDetails";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Typography } from "@mui/material";

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
function MatchCard(props: MatchCardProps) {
    const { match } = props;
    const navigate = useNavigate();

    const navigateToMatchDetails = () => {
        //TODO: adjust the link below to redirect to match details page
        navigate("/match_route");
    };

    return (
        <Grid
            className="card_link"
            onClick={() => navigateToMatchDetails()}
            key={match.id}
            item
            xs={12}
        >
            <Item>
                <Grid
                    container
                    rowSpacing={1}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item xs={1} />
                    <Grid className="teams_grid" item xs={8}>
                        <Grid container direction="column" alignItems="start">
                            {match?.teams?.map((team) => (
                                <TeamDetails
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
        </Grid>
    );
}

export default MatchCard;
