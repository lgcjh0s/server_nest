import { Controller, Get, Res } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { ScrapService } from './scrap.service';
import { Response } from 'express';

@Controller('scrap')
export class ScrapController extends BaseController {

    constructor (
        private readonly scrapService: ScrapService
    ) {
        super();
    }

    @Get('test')
    async cookieTest(@Res() res: Response) {
        //return await this.scrapService.scrap(1150);
        return res.send(JSON.stringify(await this.scrapService.scrap(1150)));
    }
}
