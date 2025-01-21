import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'secretKey',
            signOptions: { expiresIn: '60m' }
        })
    ],
    providers: [AuthService, JwtService],
    exports: [AuthService]
})
export class AuthModule {}