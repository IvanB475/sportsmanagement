import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { RoleEntity } from "./entities/Role.entity";
import { UserEntity } from "./entities/User.entity";

@Injectable()
export class UsersDAL {
    constructor(
        private entityManager: EntityManager,
    ) { }

    //TODO: add validation to check if email is already in use and if username exists
    async signUp(username: string, password: string, email: string): Promise<UserEntity> {
        const newUser = new UserEntity(username, password, email);
        const userRole = await this.entityManager.findOneBy(RoleEntity, { name: 'user' })
        newUser.role = userRole;
        const user = await newUser.save();

        return user;
    }

    async login(username: string): Promise<UserEntity> {
        const user = await this.entityManager.createQueryBuilder(UserEntity, 'user').leftJoinAndSelect('user.role', 'role.name').where('user.username = :username', { username }).getOne();
        return user;
    }


    async findUserById(userId: number) {
        const foundUser = await this.entityManager.findOneBy(UserEntity, { id: userId });
        return foundUser;
    }

    async updateUser(userId: number, role: string) {
        const user = await this.entityManager.findOneBy(UserEntity, { id: userId });
        const foundRole = await this.entityManager.findOneBy(RoleEntity, { name: role });
        user.role = foundRole;
        await user.save();
    }

    async deleteUser(userId: number) {
        await this.entityManager.delete(UserEntity, { id: userId });
    }
}