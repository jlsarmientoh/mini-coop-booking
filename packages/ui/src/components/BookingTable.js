import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

export default function BookingTable() {
    const [rows, setRows] = React.useState([]);
    React.useEffect(() => {
        async function getBookings() {
            try {
                const response = await axios.get('http://localhost:3001/api/bookings?limit=10');
                console.log(JSON.stringify(response.data));
                setRows(response.data)
            } catch (error) {
                console.log(`Could not load data: ${error}`);
                setRows([])
            }
        }
        getBookings();
    },[]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Booking ID</TableCell>
            <TableCell align="right">Plate</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.bookingId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="right" component="th" scope="row">{row.bookingId}</TableCell>
              <TableCell align="right">{row.plate}</TableCell>
              <TableCell align="right">{new Date(row.date).toISOString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}