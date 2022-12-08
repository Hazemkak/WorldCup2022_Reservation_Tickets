import jwt_decode from "jwt-decode";
import { User } from "../types";

export const setLoggedInUser = (user: object, token: string) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
};

export const getLoggedInUser = (): User | null => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (token && user) {
        const decoded: object = jwt_decode(token);
        return { ...decoded, ...JSON.parse(user) } as User;
    }

    return null;
};

export const isLoggedIn = (): boolean => {
    const user = getLoggedInUser();
    return user !== null;
};

export const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};
