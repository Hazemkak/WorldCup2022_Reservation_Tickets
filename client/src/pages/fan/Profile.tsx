import React, { useEffect, useState } from "react";
import moment from "moment";
import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { User } from "../../types";
import { getLoggedInUser } from "../../helpers/auth";
import { genders } from "../../helpers/user";
import EditProfileModal from "../../components/fan/EditProfileModal";
import ReservationsList from "../../components/reservations/ReservationsList";
import Loader from "../../shared/Loader/Loader";

const Profile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const { username } = useParams<{ username?: string }>();

    const [data, errors, loading] = useFetch("user", {
        method: "GET",
        url: `/users/profile/${username}/`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    useEffect(() => {
        if (data) {
            setUser(data);
        }
    }, [data]);

    if (loading) {
        return <Loader />;
    }

    if (errors) {
        return <p>{errors}</p>;
    }

    if (!user) {
        return <p>No user found</p>;
    }

    return (
        <Container>
            <Grid
                container
                spacing={{
                    xs: 2,
                    md: 4,
                }}
                sx={{ mb: 2 }}
            >
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        {user.first_name} {user.last_name}
                    </Typography>
                </Grid>
                {username === getLoggedInUser()?.username && (
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            textAlign: {
                                xs: "left",
                                md: "right",
                            },
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<EditIcon />}
                            onClick={() => setEditModalOpen(true)}
                        >
                            Edit Profile
                        </Button>
                    </Grid>
                )}
            </Grid>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                        Contact Info
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Username:</strong> {user.username}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Email:</strong>{" "}
                        <Link
                            href={`mailto:${user.email}`}
                            sx={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            {user.email}
                        </Link>
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                        Personal Info
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Gender: </strong> {genders[user.gender]}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Birth Date:</strong>{" "}
                        {moment(user.birthDate).format("Do of MMMM, YYYY")}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Nationality:</strong>{" "}
                        {user.nationality || (
                            <Typography
                                component="span"
                                sx={{ display: "inline" }}
                                color="textSecondary"
                            >
                                Not specified
                            </Typography>
                        )}
                    </Typography>
                </Grid>
            </Grid>

            <Box sx={{ mt: 5 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    fontWeight="bold"
                    sx={{ mb: 2 }}
                >
                    Your Reservations
                </Typography>

                <ReservationsList />
            </Box>

            <EditProfileModal
                userData={user}
                setUserData={setUser}
                open={editModalOpen}
                closeModal={() => setEditModalOpen(false)}
            />
        </Container>
    );
};

export default Profile;
