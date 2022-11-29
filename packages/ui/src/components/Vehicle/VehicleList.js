import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import VehicleForm from './VehicleForm';
import BookingForm from '../Booking/BookingForm';
import Divider from '@mui/material/Divider';
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';


export default function VehicleList() {
    const [vehicles, setVehicles] = React.useState([]);
    const [currentVehicle, setCurrentVehicle] = React.useState([]);
    const [openVehicle, setOpenVehicle] = React.useState(false);
    const [openBooking, setOpenBooking] = React.useState(false);

    const handleClickOpen = (e) => {
        e.preventDefault();
        setOpenVehicle(true);
    };

    const handleClose = (e) => {
        e.preventDefault();
        setOpenVehicle(false);
    };

    const handleClickOpenBooking = (e, vehicle) => {
        e.preventDefault();
        setCurrentVehicle(vehicle);
        setOpenBooking(true);
    };

    const handleCloseBooking = (e) => {
        e.preventDefault();
        setOpenBooking(false);
    };

    React.useEffect(() => {
        async function getVehicles() {
            try {
                const response = await axios.get('http://localhost:3001/api/vehicles');
                console.log(JSON.stringify(response.data));
                setVehicles(response.data)
            } catch (error) {
                console.log(`Could not load data: ${error}`);
                setVehicles([])
            }
        }
        getVehicles();
    },[]);

    return (
        <Paper>
            {vehicles.map((vehicle) => (
                <Card sx={{ minWidth: 275 }} key={vehicle.id}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Available!
                        </Typography>
                        <Typography variant="h5" component="div">
                        {vehicle.brand}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {vehicle.plate}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={(e) => handleClickOpenBooking(e, vehicle)}>Book this car</Button>
                    </CardActions>
                    <Divider light />
                </Card>
            ))}
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
                    <DirectionsCarFilledRoundedIcon />
                </Fab>
            </Box>
            <VehicleForm open={openVehicle} onClose={handleClose}/>
            <BookingForm open={openBooking} onClose={handleCloseBooking} vehicle={currentVehicle}/>
        </Paper>
    )
}