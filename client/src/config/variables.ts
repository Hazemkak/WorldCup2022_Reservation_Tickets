export const API_BASE_URL =
    process.env.NODE_ENV === "development"
        ? "http://localhost:8000/api"
        : "http://worldcup.uksouth.cloudapp.azure.com:8000/api";
