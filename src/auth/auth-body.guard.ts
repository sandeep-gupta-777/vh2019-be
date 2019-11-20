import { Injectable, CanActivate, ExecutionContext, Request, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import * as Joi from '@hapi/joi';

export const bodySchema = Joi.object().keys({
  email: Joi.string().alphanum().required(),
  password: Joi.string().alphanum().required(),
});

@Injectable()
  export class AuthBodyGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(req: Request) {
    const { error } = Joi.validate(req.body, bodySchema);
    if (error) {
      throw new BadRequestException({ error });
    }
    return true;
  }

}
