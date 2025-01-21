import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { BaseService } from "src/base/base.service";
import { User } from "src/entity/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService extends BaseService {

    constructor (
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {
        super();
    }

    async login(user: any) {
        const payload = {
            username: user.username,
            sub: user.userId
        };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async validate(userId: string, password: string): Promise<User> {
        const user: User = await this.userService.findOne(userId);
        return user;
    }
}