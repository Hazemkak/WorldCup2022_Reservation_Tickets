import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import useFetch from "../../hooks/useFetch";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  boxShadow: "0px 4px 4px rgba(219, 219, 219)",
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function MatchList() {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs(new Date()));
  const [matches, error, loading] = useFetch("matches", {
    method: "GET",
    url: `/matches?day=${date?.toDate().getFullYear()}-${date
      ?.toDate()
      .getMonth()}-${date?.toDate().getDay()}`,
  });
  console.log(
    `/matches?day=${date?.toDate().getFullYear()}-${date
      ?.toDate()
      .getMonth()}-${date?.toDate().getDay()}`
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={3}>
          <Item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CalendarPicker
                date={date}
                onChange={(newDate) => setDate(newDate)}
              />
            </LocalizationProvider>
          </Item>
        </Grid>
        <Grid item xs={9}>
          <Item>2</Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MatchList;
