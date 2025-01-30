import { Body, Controller, Headers, Post, UnauthorizedException, UseGuards } from "@nestjs/common";
import { BaseController } from "src/base/base.controller"
import { User } from "src/entity/user.entity";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/security/auth.guard";

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

    @Post('checkAuth')
    async checkAuth(@Headers() headers): Promise<string> {
        if (!headers.authorization) {
            throw new UnauthorizedException('Not authorized');
        }
        const token: string = headers.authorization.split('Bearer ')[1];
        this.authService.verify(token);
        return 'Authorized';
    }

    @UseGuards(AuthGuard)
    @Post('getUser')
    async getUser(@Body() user: User): Promise<User> {
        return this.authService.getUser(user);
    }
}