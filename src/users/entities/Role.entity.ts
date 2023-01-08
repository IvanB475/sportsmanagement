import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { UserEntity } from "./User.entity";


@Entity({
    name: 'roles'
})
export class RoleEntity extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => UserEntity, user => user.role)
    users: UserEntity[];
}