import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientService } from './client/client.service';
import { SocketModule } from './socket/socket.module';
import { EventService } from './client/event.service';
import { ChatGateway } from './chat/chat.gateway';
import { SocketController } from './socket.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { HttpExceptionFilter } from './http-exception.filter';
import { MongooseModule } from '@nestjs/mongoose';
import { CatSchema } from './schema/user.schema';
import { UsersService } from './user.service';
import { LocalStrategy } from './auth/local.strategy';
import { jwtConstants } from './auth/constants';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthBodyGuard } from './auth/auth-body.guard';
import { GoogleStrategy } from './auth/google.strategy';
import { JobController } from './jobs/job/job.controller';
import { JobService } from './jobs/job/job.service';
import { DbCrudService } from './db-crud/db-crud.service';
import { JobSchema } from './schema/job.schema';
import { NotificationController } from './notification/notification.controller';
import { NotificationService } from './notification/notification.service';
import { NotificationSchema } from './schema/notification.schema';
import { EventSchema } from './schema/event.schema';
import { EventController } from './event/event.controller';
import { VanHackEventService } from './event/van-hack-event.service';
import { HttpService } from './http/http.service';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60000s' },
    }),
    // MongooseModule.forRoot('mongodb://photogriduser:sandeep@ds161001.mlab.com:61001/mychatcatdb1'),
    MongooseModule.forRoot('mongodb://sandeep1:sandeep1@ds161001.mlab.com:61001/mychatcatdb1'),
    MongooseModule.forFeature([{ name: 'van-hack-users', schema: CatSchema }]),
    MongooseModule.forFeature([{ name: 'van-hack-jobs', schema: JobSchema }]),
    MongooseModule.forFeature([{ name: 'van-hack-notifications', schema: NotificationSchema }]),
    MongooseModule.forFeature([{ name: 'van-hack-events', schema: EventSchema }]),
    SocketModule,
  ],
  controllers: [AppController, SocketController, AuthController, JobController, NotificationController, EventController],
  providers: [AppService,
    UsersService,
    ClientService,
    EventService,
    LocalStrategy,
    ChatGateway,
    JwtStrategy,
    AuthService,
    AuthBodyGuard,
    GoogleStrategy,
    JobService,
    DbCrudService,
    NotificationService,
    VanHackEventService,
    HttpService
  ],
})
export class AppModule {

}
