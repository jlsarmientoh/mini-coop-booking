import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Body, 
    Param, 
    Query, 
    NotFoundException} from "@nestjs/common"; 
import { BookingService } from "../services/booking.service";
import { BookingDto } from "../models/dtos/booking.dto";

@Controller('api/bookings')
export class BookingController {
    constructor(private readonly bookingService: BookingService) {}

    @Get()
    async getBookings(@Query('limit') limit: number): Promise<BookingDto[]> {
        return this.bookingService.findBookings(limit);
    }

    @Get(':id')
    async getBooking(@Param('id') id: string): Promise<BookingDto> {
        return await this.bookingService.findBooking(id); 
    }

    @Post()
    async createBooking(@Body() bookingDto: BookingDto): Promise<BookingDto> {
        return await this.bookingService.saveOrUpdateBooking(bookingDto);
    }

    @Put(':id')
    async modifyBooking(@Param('id') id: string, @Body() bookingDto: BookingDto): Promise<BookingDto> {
        bookingDto.bookingId = id;
        return await this.bookingService.saveOrUpdateBooking(bookingDto);
    }
    
    @Delete(':id')
    async deleteBooking(@Param('id') id: string): Promise<BookingDto> {
        return await this.bookingService.deleteBooking(id);
    }
}