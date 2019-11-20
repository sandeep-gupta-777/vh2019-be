import { Body, Controller, Get, Param, Post, Put, Query, Request } from '@nestjs/common';
import { VanHackEventService } from './van-hack-event.service';


@Controller('api/v1/events')
export class EventController {


  constructor(private eventService: VanHackEventService) {
  }

  @Get('/')
  async getEvent(@Request() req, @Body() body, @Query() query) {
    // {	$or: [{"country" : "Canada"}, {"country" : "USA"}]}
    if (query.country) {
      query.$or = query.country.split(',').map((country) => {
        return { country };
      });
      delete query.country;
    }
    return this.eventService.findAll(query, null, {limit: 100});
  }

  @Post('/:_id')
  async updateEvent(@Request() req, @Body() body, @Query() query, @Param() param) {
    return this.eventService.update(param, body);
  }

  @Put('/')
  async createEvent(@Request() req, @Body() body, @Query() query) {
    return this.eventService.create(body);
  }
}
