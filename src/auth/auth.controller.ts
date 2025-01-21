import { Controller, Get, Post, Query, Request } from "@nestjs/common";
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

    @Get('login')
    async login(@Query('userId') userId: string, @Query('password') password: string) {
        const user: User = new User();
        user.userId = userId;
        user.password = password;
        user.userName = 'test';

        const token = this.authService.login(user);
        return token;
    }
}