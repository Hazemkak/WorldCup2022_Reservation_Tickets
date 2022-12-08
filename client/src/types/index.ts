export interface BasicProps {
    children?: React.ReactNode;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    birthDate: string;
    gender: string;
    nationality: string;
    role: string;
    isVerified: boolean;
}
