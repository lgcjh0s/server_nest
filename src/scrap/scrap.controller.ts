import { Controller, Get, Res } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { ScrapService } from './scrap.service';

@Controller('scrap')
export class ScrapController extends BaseController {

    constructor (
        private readonly scrapService: ScrapService
    ) {
        super();
    }

    @Get('test')
    cookieTest(@Res() res: Response) {
        return this.scrapService.scrap(1150);
    }
}
