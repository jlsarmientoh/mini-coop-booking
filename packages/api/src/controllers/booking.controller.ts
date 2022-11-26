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
        try {
            return await this.bookingService.findBooking(id); 
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Post()
    async createBooking(@Body() bookingDto: BookingDto): Promise<string> {
        return `new booking created`;
    }

    @Put(':id')
    async modifyBooking(@Param('id') id: string, @Body() bookingDto: BookingDto): Promise<string> {
        return `Modified this booking ${bookingDto.bookingId}`;
    }
    
    @Delete(':id')
    async deleteBooking(@Param('id') id: string): Promise<string> {
        return `Deleted this booking ${id}`
    }
}