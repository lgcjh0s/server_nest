import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { keyStore } from "./secutiry.keys";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiratio: false,
            secretOrKey: keyStore.getSecret()
        });
    }

    async validate(payload: any) {
        return {
            userId: payload.sub,
            username: payload.username
        }
    }
}