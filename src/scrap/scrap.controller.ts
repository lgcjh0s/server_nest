import { Controller, Get, Res } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { ScrapService } from './scrap.service';
import { Response } from 'express';
import { IStore } from 'src/common/common.interfaces';

@Controller('scrap')
export class ScrapController extends BaseController {

    constructor (
        private readonly scrapService: ScrapService
    ) {
        super();
    }

    @Get('fire')
    async fire(@Res() res: Response) {
        const topStores: IStore[] = await this.scrapService.scrap(1000);
        return res.send(JSON.stringify(topStores));
    }
}
