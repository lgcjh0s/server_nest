import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { IStore } from 'src/common/common.interfaces';

@Injectable()
export class ScrapService extends BaseService {

    request = require('request');
    iconv = require('iconv-lite');
    jsdom = require('jsdom');

    async scrap(drwNo: number): Promise<IStore[]> {
        const scrapHtml: string = await this.scrapTopStores(drwNo);
        this.logger.debug(scrapHtml);
        const topStores: IStore[] = this.parseTopStores(drwNo, scrapHtml);
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

    parseTopStores(drwNo: number, html: string): IStore[] {

        const { JSDOM } = this.jsdom;
        const dom = new JSDOM('<html><body></body></html>');

        const div = dom.window.document.createElement('div');
        div.innerHTML = html;

        const tbl: HTMLTableElement = div.querySelectorAll('.tbl_data.tbl_data_col')[0];
        const rows: NodeList = tbl.querySelectorAll('tbody tr');
        const topStores: IStore[] = [];

        rows.forEach((ele: HTMLTableRowElement) => {
            const tds: HTMLCollectionOf<HTMLTableCellElement> = ele.getElementsByTagName('td');
            const codeTd: string = tds[4].innerHTML.trim();
            const storeCode: string = codeTd.substring(codeTd.indexOf("'") + 1, codeTd.lastIndexOf("'"));

            const store: IStore = {
                drwNo: drwNo,
                storeCode: storeCode,
                storeName: tds[1].innerHTML.trim(),
                addr: tds[3].innerHTML.trim(),
                lat: '',
                lon: '',
                telNo: ''
            };
            topStores.push(store);
        });

        return topStores;
    }

    async scrapStoreLocation() {

    }

    async parseStoreLocation() {

    }
}
