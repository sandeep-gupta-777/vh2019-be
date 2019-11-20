// import { StrategyCallbackMiddleware } from './strategy-callback.middleware';
// import { StrategyMiddleware } from './strategy.middleware';
// import { SessionAuthMiddleware } from './session-auth.middleware';
// import { NestModule } from '@nestjs/common';
//
// export class AuthModule implements NestModule {
//
//   public configure(consumer: MiddlewaresConsumer) {
//
//     consumer
//     // Saving the socketId on session
//       .apply(SessionAuthMiddleware).forRoutes('/auth/google')
//     // Authenticate to google signin api for /auth/google route
//       .apply(StrategyMiddleware).with({ provider: 'google' }).forRoutes('/auth/google')
//     // After signin google call this endpoint
//       .apply(StrategyCallbackMiddleware).with({ provider: 'google' }).forRoutes('auth/google/callback');
//   }
//
// }
