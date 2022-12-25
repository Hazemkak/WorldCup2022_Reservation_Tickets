import React from "react";
import { Grid } from "@mui/material";
import AlBaytStadium from "../assets/Al Bayt Stadium.png";
import Opening from "../assets/opening.jpg";
import WorldCup from "../assets/worldcup.jpg";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div>
            <header className="home_header">
                <Grid container>
                    <Grid item xs={12} sm={4}>
                        <div className="home_header_left">
                            <h1>
                                Welcome to FIFA World Cup 2022 Reservation
                                System
                            </h1>
                            <p>
                                Here you can reserve your tickets for the FIFA
                                World Cup 2022 in Qatar. <br />
                                Register now and get your tickets!
                            </p>
                            <Link to="/auth/register">
                                <button className="register">Register</button>
                            </Link>
                            <Link to="/matches">
                                <button className="view_matches">
                                    View Matches
                                </button>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={2}></Grid>
                    <Grid item xs={12} sm={6}>
                        <div className="home_header_right">
                            <img
                                src={WorldCup}
                                alt="World Cup Trophy"
                                className="headerImage1"
                            />
                            <img
                                src={AlBaytStadium}
                                alt="Al Bayt Stadium"
                                className="headerImage2"
                            />
                            <img
                                src={Opening}
                                alt="Opening Ceremony of FIFA World Cup 2022"
                                className="headerImage3"
                            />
                        </div>
                    </Grid>
                </Grid>
            </header>
        </div>
    );
};

export default Home;
