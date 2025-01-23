import { Body, Controller, Post, Query } from "@nestjs/common";
import { BaseController } from "src/base/base.controller"
import { User } from "src/entity/user.entity";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController extends BaseController {

    constructor (
        private authService: AuthService
    ) {
        super();
    }

    @Post('login')
    async login(@Body() param: User) {
        const user: User = new User();
        user.userId = param.userId;
        user.password = param.userName;
        user.userName = 'test';

        const token = this.authService.login(user);
        return token;
    }
}