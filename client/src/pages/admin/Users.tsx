import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { User } from "../../types";
import { API_BASE_URL } from "../../config/variables";
import { roles } from "../../helpers/user";

const Users: React.FC = function () {
    const [usersRequests, setUsersRequests] = useState<User[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const [data, error, loading] = useFetch("data", {
        method: "GET",
        url: "/users/",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    useEffect(() => {
        if (data) {
            setUsersRequests(
                data.filter(
                    (user: User) => user.role === "1" && !user.isVerified
                )
            );
            setUsers(
                data.filter(
                    (user: User) => user.role !== "1" || user.isVerified
                )
            );
        }
    }, [data]);

    const handleUserDelete = (username: string) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        axios
            .delete(`${API_BASE_URL}/users/${username}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setUsers(users.filter((user) => user.username !== username));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                console.log("User deleted");
            });
    };

    const handleUserRequestApproval = (username: string) => {
        if (
            !window.confirm(
                "Are you sure you want to approve this user to be a manager?"
            )
        ) {
            return;
        }

        axios
            .put(
                `${API_BASE_URL}/users/${username}/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            )
            .then((res) => {
                setUsersRequests(
                    usersRequests.filter((user) => user.username !== username)
                );
                setUsers(
                    users.concat(
                        usersRequests.filter(
                            (user) => user.username === username
                        )
                    )
                );
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                console.log("User request approved");
            });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!users) {
        return <p>No users</p>;
    }

    return (
        <Grid container spacing={4}>
            {usersRequests.length > 0 && (
                <Grid item xs={12} md={6}>
                    <h2>
                        Managers Requests{" "}
                        <small>({usersRequests.length})</small>
                    </h2>
                    <List dense={false}>
                        {usersRequests.map((userRequest) => (
                            <ListItem
                                secondaryAction={
                                    <Button
                                        aria-label="approve"
                                        sx={{ color: "green" }}
                                        onClick={() =>
                                            handleUserRequestApproval(
                                                userRequest.username
                                            )
                                        }
                                    >
                                        <Typography component="p">
                                            Approve
                                        </Typography>
                                        <CheckCircleIcon sx={{ ml: 1 }} />
                                    </Button>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: "primary.main" }}>
                                        {userRequest.role === "0" ? (
                                            <PersonIcon />
                                        ) : userRequest.role === "1" ? (
                                            <ManageAccountsIcon />
                                        ) : (
                                            <AdminPanelSettingsIcon />
                                        )}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${userRequest.first_name} ${
                                        userRequest.last_name
                                    } (${roles[userRequest.role]})`}
                                    secondary={`${userRequest.username} - ${userRequest.email}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            )}

            {users.length > 0 && (
                <Grid item xs={12} md={usersRequests.length > 0 ? 6 : 12}>
                    <h2>
                        Users <small>({users.length})</small>
                    </h2>
                    <List dense={false}>
                        {users.map((user) => (
                            <ListItem
                                secondaryAction={
                                    user.role !== "2" ? (
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() =>
                                                handleUserDelete(user.username)
                                            }
                                        >
                                            <DeleteIcon sx={{ color: "red" }} />
                                        </IconButton>
                                    ) : null
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: "primary.main" }}>
                                        {user.role === "0" ? (
                                            <PersonIcon />
                                        ) : user.role === "1" ? (
                                            <ManageAccountsIcon />
                                        ) : (
                                            <AdminPanelSettingsIcon />
                                        )}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${user.first_name} ${
                                        user.last_name
                                    } (${roles[user.role]})`}
                                    secondary={`${user.username} - ${user.email}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            )}
        </Grid>
    );
};

export default Users;
