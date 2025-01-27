import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/base/base.service";
import { IToken } from "src/common/common.interfaces";
import { User } from "src/entity/user.entity";
import { keyStore } from "src/jwt/secutiry.keys";
import { Repository } from "typeorm";

@Injectable()
export class AuthService extends BaseService {

    constructor (
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>

    ) {
        super();
    }

    async login(user: User): Promise<IToken> {

        const userId: string = user.userId;
        const dbUser: User = await this.userRepository.findOne({ where: { userId }});

        if (!dbUser || !dbUser.userId) {
            throw new NotFoundException();
        }

        if (dbUser.password !== user.password) {
            throw new UnauthorizedException();
        }
        
        return {
            accessToken: await this.issueAccessToken(user),
            refreshToken: await this.issueRefreshToken(user)
        }
    }

    async issueAccessToken(user: User): Promise<string> {
        const payload = {
            userId: user.userId,
            userName: user.userName
        };
        const options = {
            secret: keyStore.getSecret(),
            expiresIn: '30m'
        };
        return this.jwtService.sign(payload, options);
    }

    async issueRefreshToken(user: User): Promise<string> {
        const payload = {
            userId: user.userId,
            userName: user.userName
        };
        const options = {
            secret: keyStore.getSecret(),
            expiresIn: '15d'
        };
        const refreshToken: string = this.jwtService.sign(payload, options);

        const updateUser: User = {
            ...user,
            refreshToken: refreshToken
        };
        await this.userRepository.save(updateUser);

        return refreshToken;
    }
}