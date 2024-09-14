import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
                private jwtService: JwtService
    ) {}

    async login(userDto: CreateUserDto){
        const user = await this.validate(userDto);
        return this.generatedToken(user);
    }

    async registration(userDto: CreateUserDto){
        const candidate = await this.userService.getUsersByEmail(userDto.email);
        if(candidate){
            throw new HttpException("User with this email is already exists", HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword});
        return this.generatedToken(user)
    }

    private generatedToken(user: User){
        const payload = {email: user.email,id: user.id, role: user.roles, password: user.password};
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validate(userDto: CreateUserDto){
        const user = await this.userService.getUsersByEmail(userDto.email);
        const passwordCheck = await bcrypt.compare(userDto.password, user.password);
        if(user && passwordCheck){
            return user;
        }
        throw new UnauthorizedException({message: "Incorrect email or password"})
    }

}
