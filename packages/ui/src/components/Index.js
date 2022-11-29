import * as React from 'react';
import BookingTable from './Booking/BookingTable';
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
                    <Route path="/" element={<VehicleList />}></Route>
                    <Route path="/vehicles" element={<VehicleList />}></Route>
                    <Route path="/bookings" element={<BookingTable />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}