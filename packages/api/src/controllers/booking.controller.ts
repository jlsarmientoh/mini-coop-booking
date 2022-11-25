import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Req, 
    Res, 
    Body, 
    Param, 
    Query } from "@nestjs/common"; 
import { Request, Response } from "express";
import { BookingDto } from "../models/dtos/booking.dto";

@Controller('api')
export class BookingController {
    constructor() {}

    @Get('bookings')
    getBookings(@Query('limit') limit: number): Array<BookingDto> {
        return new Array<BookingDto>(
            new BookingDto('000-1111-2222','333-4444-5555','RZO316','01-12-2022'),
            new BookingDto('001-1112-2223','334-4445-5556','ABC345','01-12-2022') 
        );
    }
}