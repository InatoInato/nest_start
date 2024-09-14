import { Model ,AutoIncrement, Column, DataType, PrimaryKey, Table, BelongsToMany, ForeignKey } from "sequelize-typescript";
import { Role } from "./roles.model";
import { User } from "src/users/users.model";

@Table({tableName: 'user_roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles>{
    @AutoIncrement
    @PrimaryKey
    @Column({type: DataType.INTEGER, unique: true})
    id: number;

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: string;
}