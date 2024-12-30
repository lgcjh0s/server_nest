import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class ScrapService extends BaseService {

    request = require('request');
    iconv = require('iconv-lite');
    jsdom = require('jsdom');

    async scrap(drwNo: number): Promise<string> {
        const topStores: string = await this.scrapTopStores(drwNo);
        this.logger.debug(topStores);
        return topStores;
    }

    async scrapTest() {
        const test: string = await this.scrapTestAct();
        this.logger.debug(JSON.stringify(test));
    }

    async scrapTestAct(): Promise<any> {
        
        const url: string = 'http://localhost:3000/cookie/cookieTest';
        /*
        this.request.post({
            headers: {'Content-Type': 'application/json'},
            url: url,
            encoding: null,
            body: {},
            form: {},
            json: true
        }, async(error: object, response: object, body: object) => {
            return new Promise<string>((resolve) => {
                resolve('test');
            });
        });
        */
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: '{}'
        });
        const html: string = await resp.text();
        return html;
    }

    async scrapTopStores(drwNo: number): Promise<string> {

        //const charset: string = 'EUC-KR';
        const url: string = 'https://dhlottery.co.kr/store.do?method=topStore&pageGubun=L645';
        const bodyData = {
            method: 'topStore',
            nowPage: 1,
            rankNo: '',
            gameNo: 5133,
            drwNo: drwNo,
            schKey: '',
            schVal: ''
        };

        const resp: Response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        });

        return await resp.text();
    }

    async parseTopStores(drwNo: number, html: string) {

    }

    async scrapStoreLocation() {

    }

    async parseStoreLocation() {

    }
}
