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

    async selectComCodeFromDB(ctgrCd: string): Promise<ComCode[]> {
        const comCode: ComCode[] = await this.comCodeRepository.find({
            select: ['ctgrCd', 'dtlCd', 'cdNm', 'expDt'],
            where: { ctgrCd: ctgrCd }
        });
        return comCode;
    }

    async reset() {
        await this.cacheManager.reset();
    }

    async loadComCode() {
        const comCode: ComCode[] = await this.comCodeRepository.find({
            select: ['ctgrCd', 'dtlCd', 'cdNm', 'expDt']
        });
        await this.cacheManager.set('__comCode', { data: comCode }, 0);
    }

    async reload() {
        await this.reset();
        await this.loadComCode();
    }

    async selectAllComCode(): Promise<ComCode[]> {
        const cachedData: ICachedData = await this.cacheManager.get('__comCode');
        if (!cachedData || !cachedData.data) return [] as ComCode[];
        return cachedData.data as ComCode[];
    }

    async selectComCode(ctgrCd: string): Promise<ComCode[]> {
        const all: ComCode[] = await this.selectAllComCode();
        return all.filter((code: ComCode) => code.ctgrCd === ctgrCd);
    }

}
