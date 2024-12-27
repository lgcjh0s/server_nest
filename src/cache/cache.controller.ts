import { Controller } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { CacheService } from './cache.service';

@Controller('cache')
export class CacheController extends BaseController {

    constructor (
        private readonly cacheService: CacheService
    ) {
        super();
    }
}
