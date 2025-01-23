import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/base/base.service";
import { IToken } from "src/common/common.interfaces";
import { User } from "src/entity/user.entity";
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

        //TODO :: LOGIN 처리

        const payload = {
            userid: user.userId,
            username: user.userName,
            role: 'A'
        };
        return {
            accessToken: this.jwtService.sign(payload, { secret: 'test0101!!' })
        }
    }

    async validate(userId: string, password: string): Promise<User> {
        const user: User = await this.userRepository.findOne({ where: { userId }});
        return user;
    }
}