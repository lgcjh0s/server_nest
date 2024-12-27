import { Controller, Get, Res } from '@nestjs/common';
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
}
