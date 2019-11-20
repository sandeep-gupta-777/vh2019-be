import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
  Request,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from '../http-exception.filter';
import { UsersService } from '../user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthBodyGuard } from './auth-body.guard';

@Controller('api/v1/auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {

  constructor(
    private clientService: ClientService,
    private usersService: UsersService,
    private authService: AuthService,
    private jwtService: JwtService) {
  }

  // @UseGuards(AuthGuard('local'))
  // @UseGuards(AuthBodyGuard)
  @Post('user')
  async login(@Request() req, @Body() body) {
    return this.authService.login(body);
  }

  // @UseGuards(AuthBodyGuard)
  @Put('user')
  async signup(@Request() req, @Body() body) {
    const user = await this.usersService.findOne({email: body.email});
    if (user) {
      // throw new HttpException({ error: 'user already exists' }, HttpStatus.FORBIDDEN);
      return user;
    }
    return this.usersService.create(body);
  }

}
