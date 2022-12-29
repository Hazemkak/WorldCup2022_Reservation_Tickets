import React from "react";
import AOS from "aos";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import { isLoggedIn } from "../helpers/auth";

import AlBaytStadium from "../assets/Al Bayt Stadium.png";
import Opening from "../assets/opening.jpg";
import WorldCup from "../assets/worldcup.jpg";

import Manager1 from "../assets/manager1.webp";
import Manager2 from "../assets/manager2.jpg";
import Manager3 from "../assets/manager3.jpeg";
import Manager4 from "../assets/manager4.jpg";

import Fan1 from "../assets/fan1.jpg";
import Fan2 from "../assets/fan2.jpg";
import Fan3 from "../assets/fan3.webp";
import Fan4 from "../assets/fan4.jpg";
import Fan5 from "../assets/fan5.jpg";

import Guest1 from "../assets/guest1.jpg";
import Guest2 from "../assets/guest2.jpg";
import Guest3 from "../assets/guest3.jpg";

const Home: React.FC = () => {
    const managersImages = [Manager1, Manager2, Manager3, Manager4];
    const fansImages = [Fan1, Fan2, Fan3, Fan4, Fan5];
    const guestsImages = [Guest1, Guest2, Guest3];

    AOS.init();

    return (
        <Box
            sx={{
                pt: {
                    xs: "0rem",
                    md: "3rem",
                },
                px: {
                    xs: "0rem",
                    md: "3rem",
                },
            }}
        >
            <header className="home_header">
                <Grid
                    container
                    columnSpacing={5}
                    justifyContent="space-between"
                >
                    <Grid item xs={12} md={6}>
                        <div
                            className="home_header_left"
                            data-aos="fade-right"
                            data-aos-duration="1000"
                        >
                            <h1>
                                Welcome to FIFA World Cup 2022 Reservation
                                System
                            </h1>
                            <p>
                                Here you can reserve your tickets for the FIFA
                                World Cup 2022 in Qatar. <br />
                                {isLoggedIn() ? (
                                    <>
                                        View the matches and reserver you ticket
                                        now!
                                    </>
                                ) : (
                                    <>Register now and get your tickets!</>
                                )}
                            </p>
                            {!isLoggedIn() && (
                                <Link
                                    style={{ textDecoration: "none" }}
                                    to="/auth/register"
                                >
                                    <button className="register">
                                        Register
                                    </button>
                                </Link>
                            )}
                            <Link
                                style={{ textDecoration: "none" }}
                                to="/matches"
                            >
                                <button className="view_matches">
                                    View Matches
                                </button>
                            </Link>
                        </div>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: {
                                xs: "none",
                                md: "block",
                            },
                        }}
                    >
                        <Box className="home_header_right">
                            <img
                                src={WorldCup}
                                alt="World Cup Trophy"
                                className="headerImage1"
                                data-aos="fade-left"
                                data-aos-duration="500"
                                data-aos-delay="100"
                            />
                            <img
                                src={AlBaytStadium}
                                alt="Al Bayt Stadium"
                                className="headerImage2"
                                data-aos="fade-left"
                                data-aos-duration="500"
                                data-aos-delay="300"
                            />
                            <img
                                src={Opening}
                                alt="Opening Ceremony of FIFA World Cup 2022"
                                className="headerImage3"
                                data-aos="fade-left"
                                data-aos-duration="500"
                                data-aos-delay="600"
                            />
                        </Box>
                    </Grid>
                </Grid>
            </header>

            <Divider sx={{ my: 4, mx: "20px" }} />

            <section className="home_section">
                <Typography
                    variant="h3"
                    component="h1"
                    fontWeight="bold"
                    mb={4}
                    data-aos="fade-up"
                    data-aos-duration="500"
                >
                    What can you do?
                </Typography>
                <Grid container spacing={7}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                            data-aos="fade-up"
                            data-aos-duration="500"
                            data-aos-delay="100"
                        >
                            <CardMedia
                                component="img"
                                height="250"
                                image={
                                    managersImages[
                                        Math.floor(
                                            Math.random() *
                                                managersImages.length
                                        )
                                    ]
                                }
                                alt="Football Manager"
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                    fontWeight="bold"
                                >
                                    Managers
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    As a manager you can add new stadiums,
                                    create, update and view matches. You can
                                    also view the reservations for each match.
                                </Typography>
                            </CardContent>
                            {!isLoggedIn() && (
                                <CardActions
                                    sx={{
                                        mt: "auto",
                                    }}
                                >
                                    <Button size="small" color="primary">
                                        <Link
                                            to="/auth/register"
                                            style={{
                                                color: "inherit",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Register as a manager
                                        </Link>
                                    </Button>
                                </CardActions>
                            )}
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                            data-aos="fade-up"
                            data-aos-duration="500"
                            data-aos-delay="300"
                        >
                            <CardMedia
                                component="img"
                                height="250"
                                image={
                                    fansImages[
                                        Math.floor(
                                            Math.random() * fansImages.length
                                        )
                                    ]
                                }
                                alt="Football Fans"
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                    fontWeight="bold"
                                >
                                    Fans
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    As a fan you can view the matches and
                                    reserve a ticket for the match you want. You
                                    can also view your profile, update your
                                    information and view, and cancel your
                                    reservations.
                                </Typography>
                            </CardContent>
                            {!isLoggedIn() && (
                                <CardActions
                                    sx={{
                                        mt: "auto",
                                    }}
                                >
                                    <Button size="small" color="primary">
                                        <Link
                                            to="/auth/register"
                                            style={{
                                                color: "inherit",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Register as a fan
                                        </Link>
                                    </Button>
                                </CardActions>
                            )}
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                            data-aos="fade-up"
                            data-aos-duration="500"
                            data-aos-delay="600"
                        >
                            <CardMedia
                                component="img"
                                height="250"
                                image={
                                    guestsImages[
                                        Math.floor(
                                            Math.random() * guestsImages.length
                                        )
                                    ]
                                }
                                alt="Guests"
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                    fontWeight="bold"
                                >
                                    Guests
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    As a guest you can view the matches but you
                                    can't reserve a ticket for the match you
                                    want. You can register as a fan to be able
                                    to reserve a ticket.
                                </Typography>
                            </CardContent>
                            {!isLoggedIn() && (
                                <CardActions
                                    sx={{
                                        mt: "auto",
                                    }}
                                >
                                    <Button size="small" color="primary">
                                        <Link
                                            to="/auth/register"
                                            style={{
                                                color: "inherit",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Register now to reserve a ticket!
                                        </Link>
                                    </Button>
                                </CardActions>
                            )}
                        </Card>
                    </Grid>
                </Grid>
            </section>
        </Box>
    );
};

export default Home;
