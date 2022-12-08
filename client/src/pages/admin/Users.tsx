import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { User } from "../../types";

const Users: React.FC = function () {
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
            setUsers(data);
        }
    }, [data]);

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
        <>
            <h1>Users</h1>
            {users.map((user) => (
                <div key={user.id}>
                    <h3>
                        {user.first_name} {user.last_name}
                    </h3>
                    <p>{user.email}</p>
                </div>
            ))}
        </>
    );
};

export default Users;
