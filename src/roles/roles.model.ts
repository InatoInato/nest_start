import { ApiProperty } from "@nestjs/swagger";
import { Model ,AutoIncrement, Column, DataType, PrimaryKey, Table, BelongsToMany } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttribute{
    value: string,
    description: string
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttribute>{
    @ApiProperty({example: '1', description: "Unique id"})
    @AutoIncrement
    @PrimaryKey
    @Column({type: DataType.INTEGER, unique: true})
    id: number;

    @ApiProperty({example: 'ADMIN', description: "Role"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @ApiProperty({example: 'Administrator', description: "Description"})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User
}