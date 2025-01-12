import { Injectable } from "@nestjs/common";
import { BaseService } from "src/base/base.service";
import { IApprData } from "src/common/common.interfaces";

@Injectable()
export class MpaService extends BaseService {
    
    getTestData(apprNo: number = -1): IApprData[] {

        const apprData: IApprData[] = [{
            apprNo: 10000001,
            franNm: '베브릿지상암IT점',
            apprDt: '2025.01.08',
            apprTm: '09:11',
            fmlYn: false,
            brandCd: 'M',
            cardNo: '0911',
            payTy: '일시불',
            payAmt: 11600,
            status: '전표매입',
            cardType: '개인/신용카드',
            trsTpNm: '신용승인',
            aprAmt: 14545,
            addAmt: 1455,
            serviceAmt: 0
        }, {
            apprNo: 10000002,
            franNm: '(주)발트페이',
            apprDt: '2025.01.06',
            apprTm: '09:12',
            fmlYn: false,
            brandCd: 'M',
            cardNo: '0911',
            payTy: '일시불',
            payAmt: 6900,
            status: '전표매입',
            cardType: '개인/신용카드',
            trsTpNm: '신용승인',
            aprAmt: 6273,
            addAmt: 627,
            serviceAmt: 0
        }, {
            apprNo: 10000003,
            franNm: '홈플러스(주) 파주운정점',
            apprDt: '2025.01.04',
            apprTm: '17:18',
            fmlYn: true,
            brandCd: 'V',
            cardNo: '0359',
            payTy: '일시불',
            payAmt: 11600,
            status: '전표매입',
            cardType: '개인/체크카드',
            trsTpNm: '체크승인',
            aprAmt: 14545,
            addAmt: 1455,
            serviceAmt: 0
        }, {
            apprNo: 10000004,
            franNm: '여기어때',
            apprDt: '2025.01.04',
            apprTm: '11:32',
            fmlYn: false,
            brandCd: 'M',
            cardNo: '0911',
            payTy: '할부(3개월)',
            payAmt: 291000,
            status: '전표매입',
            cardType: '개인/신용카드',
            trsTpNm: '신용승인',
            aprAmt: 264545,
            addAmt: 26455,
            serviceAmt: 0
        }, {
            apprNo: 10000005,
            franNm: 'SSG.COM',
            apprDt: '2025.01.03',
            apprTm: '17:13',
            fmlYn: false,
            brandCd: 'V',
            cardNo: '0541',
            payTy: '일시불',
            payAmt: 76532,
            status: '전표매입',
            cardType: '개인/신용카드',
            trsTpNm: '신용승인',
            aprAmt: 69575,
            addAmt: 6957,
            serviceAmt: 0
        }, {
            apprNo: 10000006,
            franNm: '(주)연수에너지중앙로주유소',
            apprDt: '2025.01.03',
            apprTm: '06:56',
            fmlYn: false,
            brandCd: 'M',
            cardNo: '0911',
            payTy: '일시불',
            payAmt: 50000,
            status: '전표매입',
            cardType: '개인/신용카드',
            trsTpNm: '신용승인',
            aprAmt: 45456,
            addAmt: 4545,
            serviceAmt: 0
        }];

        return apprNo === -1 ? 
            apprData : 
            apprData.filter((v: IApprData) => v.apprNo == apprNo);
    }
}