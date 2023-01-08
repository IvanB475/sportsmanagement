import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from 'src/config/app.config.service';
import { isAdminMiddleware } from 'src/middlewares/isAdmin.middleware';
import { isUserMiddleware } from 'src/middlewares/isUser.middleware';
import { UtilsService } from 'src/utils/utils.service';
import { SportClassController } from './sport-class.controller';
import { SportClassService } from './sport-class.service';

@Module({
  controllers: [SportClassController],
  providers: [SportClassService, UtilsService, AppConfigService, ConfigService]
})
export class SportClassModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isUserMiddleware)
      .forRoutes(
        { path: 'sport-class', method: RequestMethod.GET },
        { path: 'sport-class/:id/enroll', method: RequestMethod.PUT }
      );

    consumer.apply(isAdminMiddleware).forRoutes(
      { path: 'sport-class/create', method: RequestMethod.POST },
      { path: 'sport-class/:id', method: RequestMethod.PATCH },
      { path: 'sport-class/:id', method: RequestMethod.DELETE }
    )
  }
}
