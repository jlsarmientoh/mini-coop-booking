import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import { Button, Stack } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function BookingTable() {
    const [snackBar, setSnackBar] = React.useState({open: false, severity: '', message: ''});
    const [rows, setRows] = React.useState([]);

    const getBookings = async () => {
      try {
          const response = await axios.get('http://localhost:3001/api/bookings?limit=10');
          console.log(JSON.stringify(response.data));
          setRows(response.data)
      } catch (error) {
          console.log(`Could not load data: ${error}`);
          setRows([])
      }
    };

    React.useEffect(() => {
        getBookings();
    },[]);

    const handleDelete = async (e, id) => {
      e.preventDefault();
      try{
        await axios.delete(`http://localhost:3001/api/bookings/${id}`);
        setSnackBar({open: true, severity: 'success', message: 'Successfuly deleted!'});
      } catch (error) {
          console.log(`Could not save data: ${error}`);
          setSnackBar({open: true, severity: 'error', message: 'Oops, please try again'});
      }
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setSnackBar({open: false, severity: '', message: ''});
      getBookings();
    };

  return (
    <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Booking ID</TableCell>
            <TableCell align="center">Plate</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.bookingId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center" component="th" scope="row"><BookmarkAddedIcon/> {row.bookingId}</TableCell>
              <TableCell align="center">{row.plate}</TableCell>
              <TableCell align="center">{new Date(row.date).toISOString()}</TableCell>
              <TableCell align="center">
                <Button onClick={(e) => handleDelete(e, row.bookingId)}>
                  <DeleteForeverIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Stack>
      <Snackbar open={snackBar.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackBar.severity} sx={{ width: '100%' }}>
          {snackBar.message}
        </Alert>
      </Snackbar>
    </Stack>
    </div>
  )
}