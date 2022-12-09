import React from "react";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

interface Header {
  title: string;
  align: TableCellProps["align"];
}

const Headers: Header[] = [
  { title: "Seat ID", align: "left" },
  { title: "Match", align: "left" },
  { title: "Date", align: "left" },
  { title: "Time", align: "left" },
  { title: "Actions", align: "right" },
];

function ReservationListHeader() {
  return (
    <TableHead>
      <TableRow>
        {Headers.map((header) => (
          <TableCell key={header.title} align={header?.align}>
            {header?.title}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default ReservationListHeader;
