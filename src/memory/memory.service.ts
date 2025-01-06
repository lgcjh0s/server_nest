import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { BaseService } from 'src/base/base.service';
import { ICachedData } from 'src/common/common.interfaces';
import { ComCode } from 'src/entity/comcode.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemoryService extends BaseService {

    constructor (
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
        @InjectRepository(ComCode)
        private comCodeRepository: Repository<ComCode>
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

    async selectSample(ctgrCd: string) {
        return this.comCodeRepository.find({
            where: { ctgrCd: ctgrCd },
            select: ['ctgrCd', 'dtlCd', 'cdNm', 'expDt']
        });
    }

}
