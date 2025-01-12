import { Body, Controller, Get, Post, Query, Render } from "@nestjs/common";
import { BaseController } from "src/base/base.controller";
import { MpaService } from "./mpa.service";

@Controller('mpa')
export class MpaController extends BaseController {

    constructor (
        private readonly mpaService: MpaService
    ) {
        super();
    }

    @Get('M00001')
    @Render('mpa/M00001.hbs')
    M00001() {
        return {
            data: this.mpaService.getTestData()
        }
    }

    @Post('M00002')
    @Render('mpa/M00002.hbs')
    M00002(@Body('apprNo') apprNo: number) {
        return {
            ...this.mpaService.getTestData(apprNo)[0]
        }
    }
}