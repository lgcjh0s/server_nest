import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "src/jwt/jwt.strategy";

@Module({
    imports: [
        JwtModule.register({
            secret: 'user0101!!',
            signOptions: { expiresIn: '30s' }
        }),
        TypeOrmModule.forFeature([
            User
        ]),
        PassportModule
    ],
    providers: [AuthService, 
        JwtService,
        JwtStrategy
    ],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}