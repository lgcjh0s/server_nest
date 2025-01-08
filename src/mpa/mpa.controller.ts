import { Controller, Get, Render } from "@nestjs/common";
import { BaseController } from "src/base/base.controller";

@Controller('mpa')
export class MpaController extends BaseController {

    @Get('M00001')
    @Render('mpa/M00001.hbs')
    M00001() {
        const cards = [
            {
                id: '0001',
                name: '카드의 정석'
            }, {
                id: '0002',
                name: 'U+라서 즐거운 카드'
            }
        ]
        return { comment: cards }
    }

    @Get('M00002')
    @Render('mpa/M00002.hbs')
    M00002() {

    }
}