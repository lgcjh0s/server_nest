interface IStore {
    drwNo: number;
    storeCode: string;
    storeName: string;
    addr: string;
    lat: string;
    lon: string;
    telNo: string;
}

interface ICachedData {
    data: any
}

interface IApprData {
    apprNo: number;
    franNm: string;
    apprDt: string;
    apprTm: string;
    fmlYn: boolean;
    brandCd: string;
    cardNo: string;
    payTy: string;
    payAmt: number;
    status: string;
    cardType: string;
    aprAmt: number;
    addAmt: number;
    trsTpNm: string;
    serviceAmt: number;
}

export {
    IStore,
    ICachedData,
    IApprData
}