import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function VehicleForm(props) {
    const { open, onClose } = props;
    const [plate, setPlate] = React.useState("");
    const [brand, setBrand] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestBody = {
            'plate' : plate,
            'brand' : brand
        };

        try{
            await axios.post('http://localhost:3001/api/vehicles', requestBody);
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
                onChange={(e) => setPlate(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="brand"
                label="Brand"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => setBrand(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}