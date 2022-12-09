import React from "react";
import Grid from "@mui/material/Grid";

interface TeamDetailsProps {
  img_url: string;
  team_name: string;
}

function TeamDetails(props: TeamDetailsProps) {
  const { img_url, team_name } = props;
  return (
    <Grid item xs={12}>
      <div className="teams_container">
        <div>
          <img className="team_img" src={img_url} alt="team_image" />
        </div>
        <div className="team_name">{team_name}</div>
      </div>
    </Grid>
  );
}

export default TeamDetails;
