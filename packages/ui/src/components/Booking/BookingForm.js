import * as React from 'react';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function BookingForm(props) {
  const { open, vehicle, onClose } = props;
  const [bookingDate, setBookingDate] = React.useState(moment());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
        'vehicleId': vehicle.id,
        'plate' : vehicle.plate,
        'date' : bookingDate
    };

    try{
        await axios.post('http://localhost:3001/api/bookings', requestBody);
    } catch (error) {
        console.log(`Could not save data: ${error}`);
    }

    onClose(e);
};

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>New vehicle</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿When would you like to book {vehicle.brand} - {vehicle.plate}?            
          </DialogContentText>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Stack spacing={3}>
              <DateTimePicker
                renderInput={(params) => <TextField {...params} />}
                label="Please select the booking date & time"
                value={bookingDate}
                onChange={(bookingDate) => {
                  setBookingDate(bookingDate);
                }}
                minDateTime={moment()}
              />
            </Stack>
          </LocalizationProvider>
          </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}