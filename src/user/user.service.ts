import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/base/base.service";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService extends BaseService {

    constructor (
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        super();
    }

    async findOne(userId: string): Promise<User> {
        return await this.userRepository.findOne({ where: { userId }});
    }
}