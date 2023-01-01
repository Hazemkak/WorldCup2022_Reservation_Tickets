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
        const decoded: {
            id: number;
            username: string;
            role: string;
            isVerified: boolean;
            created_at: string;
            exp: number;
        } = jwt_decode(token);

        // If the current date has passed the expiration date, then the token is expired
        const isExpired = decoded.exp * 1000 < new Date().getTime();

        // If the token is expired, logout the user
        if (isExpired) {
            logout();
            localStorage.setItem(
                "error",
                "Session expired, please login again"
            );
            return null;
        }

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
