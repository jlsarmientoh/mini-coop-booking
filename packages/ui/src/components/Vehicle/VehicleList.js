import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import VehicleForm from './VehicleForm';


export default function VehicleList() {
    const [vehicles, setVehicles] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = () => {
        setOpen(false);
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
                <Card sx={{ minWidth: 275 }}>
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
                        <Button size="small">Book this car</Button>
                    </CardActions>
                </Card>
            ))}
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
                    <AddIcon />
                </Fab>
            </Box>
            <VehicleForm open={open}></VehicleForm>
        </Paper>
    )
}