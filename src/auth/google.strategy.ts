import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService, Provider } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      // tslint:disable-next-line:max-line-length
      clientID: '746462136767-qf053nkk22pctfv40a7krt12jm00fpqk.apps.googleusercontent.com', // Not my real client secret, see your own application credentials at Google!
      clientSecret: 'cStZbSY9iv5is7-NQzwxB-8N', // Not my real client secret, see your own application credentials at Google!
      callbackURL: 'http://localhost:3000/api/v1/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile'],
    });
  }

  async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function) {
    try {
      console.log(profile);

      const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE);
      const user =
        {
          jwt,
        };

      done(null, user);
    } catch (err) {
      // console.log(err)
      done(err, false);
    }
  }

}
