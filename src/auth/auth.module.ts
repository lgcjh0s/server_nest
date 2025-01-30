import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User
        ]),
        PassportModule
    ],
    providers: [AuthService, 
        JwtService
    ],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}