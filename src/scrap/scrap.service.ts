import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Http } from 'src/common/common.http';
import { IStore } from 'src/common/common.interfaces';

@Injectable()
export class ScrapService extends BaseService {

    http = Http();
    jsdom = require('jsdom');

    async scrap(drwNo: number): Promise<IStore[]> {
        
        const scrapHtml: string = await this.scrapTopStores(drwNo);
        const topStores: IStore[] = this.parseTopStores(drwNo, scrapHtml);

        for (let inx=0; inx<topStores.length; inx++) {
            let store: IStore = topStores[inx];
            const locHtml: string = await this.scrapStoreLocation(store.storeCode);
            store = this.parseStoreLocation(locHtml, store);
            topStores[inx] = store;
            console.log(store);
        }


        this.logger.debug(JSON.stringify(topStores));

        return topStores;
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

        const html: string = await this.http.doPost(url, bodyData);
        return html;
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

    async scrapStoreLocation(storeCode: string): Promise<string> {

        const url: string = 'https://dhlottery.co.kr/store.do?method=topStoreLocation&gbn=lotto&rtlrId=' + storeCode;
        const html: string = await this.http.doPost(url);
        return html;
    }

    parseStoreLocation(html: string, store: IStore): IStore {

        const { JSDOM } = this.jsdom;
        const dom = new JSDOM('<html><body></body></html>');

        const div = dom.window.document.createElement('div');
        div.innerHTML = html;

        store.lat = div.querySelector('input[name=lat]').value;
        store.lon = div.querySelector('input[name=lon]').value;
        const tbl: HTMLTableElement = div.querySelectorAll('.tbl_data')[0];
        const trs = tbl.querySelectorAll('tbody tr');
        store.telNo = trs[1].getElementsByTagName('td')[0].innerHTML;

        return store;
    }
}
