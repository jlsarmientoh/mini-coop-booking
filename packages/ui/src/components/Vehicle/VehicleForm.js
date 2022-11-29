import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function VehicleForm(props) {

    return (
        <div>
          <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>New vehicle</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To register a new vehicle, please enter plate and brand.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="plate"
                label="Plate"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="brand"
                label="Brand"
                type="text"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={props.onClose}>Cancel</Button>
              <Button onClick={props.onSubmit}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}