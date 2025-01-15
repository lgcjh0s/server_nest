import { Controller, Get, Post, Render, Res } from "@nestjs/common";
import { BaseController } from "src/base/base.controller";
import { SpaService } from "./spa.service";
import { Response } from 'express';

@Controller('spa')
export class SpaController extends BaseController {

    constructor (
        private readonly spaService: SpaService
    ) {
        super();
    }

    @Get('S00001')
    @Render('spa/S00001.hbs')
    S00001() {}

    @Post('apprList')
    async apprList(@Res() res: Response): Promise<Response> {
        return res.send(this.spaService.getTestData());
    }
}