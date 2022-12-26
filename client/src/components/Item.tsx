import { Paper, styled } from "@mui/material";

export default styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    boxShadow: "0px 4px 4px rgba(219, 219, 219)",
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));
