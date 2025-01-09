import { Controller, Get, Render } from "@nestjs/common";
import { BaseController } from "src/base/base.controller";
import { IApprData } from "src/common/common.interfaces";

@Controller('mpa')
export class MpaController extends BaseController {

    @Get('M00001')
    @Render('mpa/M00001.hbs')
    M00001() {
        const apprData: IApprData[] = [{
            apprNo: 10000001,
            franNm: '베브릿지상암IT점',
            apprDt: '2025.01.08',
            apprTm: '09:11',
            fmlYn: false,
            brandCd: 'U',
            cardNo: '0911',
            payTy: '01',
            payAmt: 11600
        }, {
            apprNo: 10000002,
            franNm: '(주)발트페이',
            apprDt: '2025.01.06',
            apprTm: '09:12',
            fmlYn: false,
            brandCd: 'U',
            cardNo: '0911',
            payTy: '01',
            payAmt: 6900
        }, {
            apprNo: 10000003,
            franNm: '홈플러스(주) 파주운정점',
            apprDt: '2025.01.04',
            apprTm: '17:18',
            fmlYn: true,
            brandCd: 'U',
            cardNo: '0359',
            payTy: '01',
            payAmt: 11600
        }, {
            apprNo: 10000004,
            franNm: '여기어때',
            apprDt: '2025.01.04',
            apprTm: '11:32',
            fmlYn: false,
            brandCd: 'U',
            cardNo: '0911',
            payTy: '01',
            payAmt: 291000
        }, {
            apprNo: 10000005,
            franNm: 'SSG.COM',
            apprDt: '2025.01.03',
            apprTm: '17:13',
            fmlYn: false,
            brandCd: 'U',
            cardNo: '0541',
            payTy: '01',
            payAmt: 76532
        }, {
            apprNo: 10000006,
            franNm: '(주)연수에너지중앙로주유소',
            apprDt: '2025.01.03',
            apprTm: '06:56',
            fmlYn: false,
            brandCd: 'U',
            cardNo: '0911',
            payTy: '01',
            payAmt: 50000
        }];

        return { data: apprData }
    }

    @Get('M00002')
    @Render('mpa/M00002.hbs')
    M00002() {

    }
}