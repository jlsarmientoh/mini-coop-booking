import * as React from 'react';
import BookingTable from './Booking/BookingTable';
import VehicleList from './Vehicle/VehicleList';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import NavBar from './Navbar/NavBar';

export default function Index(props) {
    return (
        <div>
            <NavBar/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<VehicleList />}></Route>
                    <Route path="/vehicles" element={<VehicleList />}></Route>
                    <Route path="/bookings" element={<BookingTable />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}