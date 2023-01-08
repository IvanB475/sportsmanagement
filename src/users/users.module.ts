import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from 'src/config/app.config.service';
import { isAdminMiddleware } from 'src/middlewares/isAdmin.middleware';
import { UtilsService } from 'src/utils/utils.service';
import { UsersController } from './users.controller';
import { UsersDAL } from './users.DAL';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UtilsService, AppConfigService, ConfigService, UsersDAL]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isAdminMiddleware).forRoutes(
      { path: 'users/:id', method: RequestMethod.PATCH },
      { path: 'users/:id', method: RequestMethod.DELETE }
    )
  }
}
