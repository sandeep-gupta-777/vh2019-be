import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../user.service';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'jsonwebtoken';

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {
  }

  private readonly JWT_SECRET_KEY = 'VERY_SECRET_KEY';

  async validateUser(email: string, pass: string): Promise<any> {
    const user: any = await this.usersService.findOne({email});
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const userData = await this.usersService.findOne({email: user.email});
    if(user.password !== userData.password){
      throw new HttpException({message: 'Wrong password!'}, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    // const payload = { email: user.email, sub: user.userId };
    delete userData.password;
    return {
      ...userData,
      access_token: this.jwtService.sign(userData),
    };
  }

  async validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string> {
    try {
      // You can add some registration logic here,
      // to register the user using their thirdPartyId (in this case their googleId)
      // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);

      // if (!user)
      // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);

      const payload = {
        thirdPartyId,
        provider,
      };

      const jwt: string = sign(payload, this.JWT_SECRET_KEY, { expiresIn: 3600 });
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
