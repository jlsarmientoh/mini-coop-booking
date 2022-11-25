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
import { identity } from "rxjs";
import { BookingDto } from "../models/dtos/booking.dto";

@Controller('api/bookings')
export class BookingController {
    constructor() {}

    @Get()
    getBookings(@Query('limit') limit: number): Array<BookingDto> {
        return new Array<BookingDto>(
            new BookingDto('000-1111-2222','333-4444-5555','RZO316','01-12-2022'),
            new BookingDto('001-1112-2223','334-4445-5556','ABC345','01-12-2022') 
        );
    }

    @Get(':id')
    getBooking(@Param('id') id: string): BookingDto {
        return new BookingDto('001-1112-2223','334-4445-5556','ABC345','01-12-2022') 
    }

    @Post()
    createBooking(@Body() bookingDto: BookingDto) {
        return `new booking created`;
    }

    @Put(':id')
    modifyBooking(@Param('id') id: string, @Body() bookingDto: BookingDto) {
        return `Modified this booking ${bookingDto.bookingId}`;
    }
    
    @Delete(':id')
    deleteBooking(@Param('id') id: string) {
        return `Deleted this booking ${id}`
    }
}