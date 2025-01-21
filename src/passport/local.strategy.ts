import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { AuthService } from "src/auth/auth.service";
import { User } from "src/entity/user.entity";

export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor (
        private authService: AuthService
    ) {
        super();
    }

    async validate(userId: string, password: string): Promise<User> {
        const user: User = await this.authService.validate(userId, password);
        if (!user) throw new UnauthorizedException();
        return user;
    }
}