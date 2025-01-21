import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { BaseService } from "src/base/base.service";

@Injectable()
export class AuthService extends BaseService {

    constructor (
        private readonly jwtService: JwtService
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

    async validate(userId: string, password: string): Promise<any> {
        
    }
}