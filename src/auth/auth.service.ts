import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/base/base.service";
import { IToken } from "src/common/common.interfaces";
import { User } from "src/entity/user.entity";
import { keyStore } from "src/security/secutiry.keys";
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
        const dbUser: User | null = await this.userRepository.findOneBy({ userId });

        if (!dbUser || !dbUser.userId) {
            throw new NotFoundException('No such user');
        }

        if (dbUser.password !== user.password) {
            throw new UnauthorizedException('Wrong password');
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

    verify(token: string) {
        try {
            const options = {
                secret: keyStore.getSecret()
            };
            const payload = this.jwtService.verify(token, options);
            console.log(payload);
        } catch (e) {
            throw new UnauthorizedException('Not authorized')
        }
    }

    async getUser(user: User): Promise<User> {
        const userId: string = user.userId;
        return await this.userRepository.findOneBy({ userId });
    }
}