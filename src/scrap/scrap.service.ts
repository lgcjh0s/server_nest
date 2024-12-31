import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { IStore } from 'src/common/common.interfaces';

@Injectable()
export class ScrapService extends BaseService {

    jsdom = require('jsdom');

    async scrap(drwNo: number): Promise<IStore[]> {
        
        const scrapHtml: string = await this.scrapTopStores(drwNo);
        this.logger.debug(scrapHtml);
        const topStores: IStore[] = this.parseTopStores(drwNo, scrapHtml);
        const addLocInfo: IStore[] = topStores.map(async (store: IStore) => {
            const locHtml: string = await this.scrapStoreLocation(store);
            store = this.parseStoreLocation(locHtml, store);
            return store;
        });

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

    async scrapStoreLocation(store: IStore): Promise<string> {

        const url: string = 'https://dhlottery.co.kr/store.do?method=topStoreLocation&gbn=lotto&rtlrId=' + store.storeCode;
        const resp: Response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        });

        return await resp.text();
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
