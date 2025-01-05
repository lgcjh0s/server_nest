import { Controller, Get, Res } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { MemoryService } from './memory.service';
import { Response } from 'express';

@Controller('memory')
export class MemoryController extends BaseController {

    constructor (
        private readonly memoryService: MemoryService
    ) {
        super();
    }

    @Get('setTest')
    async setTest(@Res() res: Response) {
        await this.memoryService.setTest('test01');
        return res.send('Saved');
    }

    @Get('getTest')
    async getTest(@Res() res: Response) {
        const cached: string = await this.memoryService.getTest();
        return res.send('Current cached values is ' + cached);
    }
}
