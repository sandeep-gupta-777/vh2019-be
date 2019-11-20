import { Body, Controller, Get, Param, Post, Put, Query, Request } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ClientService } from '../client/client.service';
import { ChatGateway } from '../chat/chat.gateway';
import { EventService } from '../client/event.service';

@Controller('api/v1/notifications')
export class NotificationController {

  constructor(
    private notificationService: NotificationService,
    private chatGateway: ChatGateway,
  ) {
    EventService.sendMessageData$.subscribe((data) => {
      if (data) {
        this.createNotification(null, data, null);
      }
    });
  }

  @Get('/')
  async getNotification(@Request() req, @Body() body, @Query() query) {
    return this.notificationService.findAll(query);
  }

  @Post('/:_id')
  async updateNotification(@Request() req, @Body() body, @Query() query, @Param() param) {
    return this.notificationService.update(param, { read: true });
  }

  @Put('/')
  async createNotification(@Request() req, @Body() body, @Query() query) {
    const data = await this.notificationService.create(body);
    try {
      const selectedRoomsData = this.chatGateway.queryRooms({socket_key: body.user_id});
      this.chatGateway.sendMessageToRooms(selectedRoomsData.selectedRoomNames, 'preview', data);
    }catch (e) {
      console.log(e);
    }
    return data;
  }
}
