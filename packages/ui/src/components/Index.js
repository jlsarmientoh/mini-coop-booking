import Booking from './Booking/Booking';
import BookingTable from './Booking/BookingTable';
import BookingForm from './Booking/BookingForm';
import Vehicle from './Vehicle/Vehicle';
import VehicleForm from './Vehicle/VehicleForm';
import VehicleList from './Vehicle/VehicleList';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

export default function Index(props) {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/vehicles" element={<VehicleList />}></Route>
                    <Route path="/vehicle/new" element={<VehicleForm />}></Route>
                    <Route path="/vehicle/:id" element={<Vehicle />}></Route>
                    <Route path="/bookings" element={<BookingTable />}></Route>
                    <Route path="/bookings/new" element={<BookingForm />}></Route>
                    <Route path="/bookings/:id" element={<Booking />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}