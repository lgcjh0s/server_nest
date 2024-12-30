import { Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { BaseController } from 'src/base/base.controller';
import { CookieService } from './cookie.service';

@Controller('cookie')
export class CookieController extends BaseController {

    constructor (
        private readonly cookieService: CookieService
    ) {
        super();
    }
    @Post('cookieTest')
    cookieTest(@Res() res: Response) {
        res.cookie('yummy_cookie', 'choco');
        res.cookie('tasty_cookie', 'strawberry');
        
        return res.send('Cookie Test');
    }
}
