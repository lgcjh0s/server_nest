import { Controller, Get, Query, Res } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { MemoryService } from './memory.service';
import { Response } from 'express';
import { ComCode } from 'src/entity/comcode.entity';

@Controller('memory')
export class MemoryController extends BaseController {

    constructor (
        private readonly memoryService: MemoryService
    ) {
        super();
    }

    @Get('selectComCodeFromDB')
    async selectComCodeFromDB(@Query('ctgrCd') ctgrCd: string, @Res() res: Response): Promise<Response> {
        const comCode: ComCode[] = await this.memoryService.selectComCodeFromDB(ctgrCd);
        return res.send(comCode);
    }

    @Get('selectComCode')
    async selectComCode(@Query('ctgrCd') ctgrCd: string, @Res() res: Response): Promise<Response> {
        const comCode: ComCode[] = await this.memoryService.selectComCode(ctgrCd);
        return res.send(comCode);
    }

    @Get('reload')
    async reload(@Res() res: Response) {
        await this.memoryService.reload();
        return res.send('reloaded');
    }
}
