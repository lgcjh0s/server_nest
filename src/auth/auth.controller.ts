import { Controller, Post, Request } from "@nestjs/common";
import { BaseController } from "src/base/base.controller"
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController extends BaseController {

    constructor (
        private authService: AuthService
    ) {
        super();
    }

    @Post('login')
    async login(@Request() req) {

    }
}