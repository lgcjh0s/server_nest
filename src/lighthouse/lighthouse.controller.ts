import { Controller, Get, Render } from "@nestjs/common";
import { BaseController } from "src/base/base.controller";

@Controller('lighthouse')
export class LighthouseController extends BaseController {

    @Get('performance')
    @Render('lighthouse/performance.hbs')
    performance() {
        return {
            "header": true
        }
    }

    @Get('seo')
    @Render('lighthouse/seo.hbs')
    seo() {}
}