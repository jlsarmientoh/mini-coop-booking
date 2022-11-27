import * as React from 'react';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Stack from '@mui/material/Stack';

export default function DateTimeValidation() {
  const [value, setValue] = React.useState(moment());

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Stack spacing={3}>
        <DateTimePicker
          renderInput={(params) => <TextField {...params} />}
          label="Ignore date and time"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          minDateTime={moment()}
        />
      </Stack>
    </LocalizationProvider>
  );
}