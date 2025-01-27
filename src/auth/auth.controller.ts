import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { BaseController } from "src/base/base.controller"
import { User } from "src/entity/user.entity";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Controller('auth')
export class AuthController extends BaseController {

    constructor (
        private authService: AuthService
    ) {
        super();
    }

    @Post('login')
    async login(@Body() user: User) {
        const token = await this.authService.login(user);
        return {
            accessToken: token.accessToken
        }
    }

    @Post('/authenticate')
    @UseGuards(AuthGuard('jwt'))
    isAuthenticated(@Req() req: Request) {

    }
}