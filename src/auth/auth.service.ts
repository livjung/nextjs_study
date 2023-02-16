import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private UserRepository: UserRepository,
        private jwtService: JwtService
    ){}


    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.UserRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const { username, password } = authCredentialsDto;
        const user = await this.UserRepository.findOne({ username });

        if(user && (await bcrypt.compare(password, user.password))) { 
            // 유저 토큰 생성 ( Secret + Payload )
            const payload = { username };
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken };
        }  else {
            throw new UnauthorizedException('login failed')
        }
    }


}
