import { TypeOrmModule } from "@nestjs/typeorm";
import { AppConfigModule } from "src/config/app.config.module";
import { AppConfigService } from "src/config/app.config.service";
import { ClassAttendeesEntity } from "src/sport-class/entities/ClassAttendees.entity";
import { SportClassEntity } from "src/sport-class/entities/SportClass.entity";
import { RoleEntity } from "src/users/entities/Role.entity";
import { UserEntity } from "src/users/entities/User.entity";

export const databaseConfig = TypeOrmModule.forRootAsync({
    imports: [AppConfigModule],
    useFactory: (appConfigService: AppConfigService) => ({
        type: 'postgres',
        host: appConfigService.db_host,
        port: appConfigService.db_port,
        username: appConfigService.db_username,
        password: appConfigService.db_password,
        database: appConfigService.db_database,
        entities: [UserEntity, RoleEntity, ClassAttendeesEntity, SportClassEntity],
        //unsafe in prod, use migrations instead
        synchronize: true
    }),
    inject: [AppConfigService]
})