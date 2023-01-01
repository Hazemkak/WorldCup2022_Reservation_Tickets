import React from "react";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

interface Header {
    title: string;
    align: TableCellProps["align"];
}

const Headers: Header[] = [
    { title: "Ticket #", align: "left" },
    { title: "Seat ID", align: "left" },
    { title: "Match", align: "left" },
    { title: "Date", align: "left" },
    { title: "Time", align: "left" },
    { title: "Actions", align: "center" },
];

const ReservationListHeader: React.FC = () => {
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
};

export default ReservationListHeader;
