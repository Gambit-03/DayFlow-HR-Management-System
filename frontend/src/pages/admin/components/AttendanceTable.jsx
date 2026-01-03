import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const AttendanceTable = ({ employee }) => {
  // dummy data (replace with API later)
  const attendance = [
    { date: "2024-09-01", status: "Present" },
    { date: "2024-09-02", status: "Absent" },
  ];

  return (
    <Paper>
      <h3>Attendance - {employee.name}</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {attendance.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AttendanceTable;
