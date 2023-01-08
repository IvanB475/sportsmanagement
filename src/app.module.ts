import { Module } from '@nestjs/common';
import { databaseConfig } from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UtilsModule } from './utils/utils.module';
import { SportClassModule } from './sport-class/sport-class.module';

@Module({
  imports: [UsersModule, UtilsModule, databaseConfig, SportClassModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
