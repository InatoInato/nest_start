import { ApiProperty } from "@nestjs/swagger";
import { Model ,AutoIncrement, Column, DataType, PrimaryKey, Table, BelongsToMany } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttribute{
    email: string,
    password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttribute>{
    @ApiProperty({example: '1', description: "Unique id"})
    @AutoIncrement
    @PrimaryKey
    @Column({type: DataType.INTEGER, unique: true})
    id: number;

    @ApiProperty({example: 'who@gmail.com', description: "Email"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '12345678', description: "Password"})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'no banned', description: "Banned or no"})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'Spam', description: "Reason of ban"})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
}