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
    data: string;
}

export {
    IStore,
    ICachedData
}