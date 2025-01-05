import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { BaseService } from 'src/base/base.service';
import { ICachedData } from 'src/common/common.interfaces';

@Injectable()
export class MemoryService extends BaseService {

    constructor (
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ) {
        super();
    }

    async setTest(cacheData: string) {
        await this.cacheManager.set('cached_item', { data: cacheData }, 0);
    }

    async getTest(): Promise<string> {
        const cached: ICachedData = await this.cacheManager.get('cached_item');
        console.log(cached);
        if (!cached) return 'Empty';
        return cached.data;
    }

}
