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
}

export {
    IStore,
    ICachedData,
    IApprData
}