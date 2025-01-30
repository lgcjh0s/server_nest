import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor (
        private authService: AuthService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.checkAuth(request);
    }

    checkAuth(request: Request) {
        if (!request.headers.authorization) return false;
        try {
            const token = request.headers.authorization.split('Bearer ')[1];
            this.authService.verify(token);
        } catch (e) {
            return false;
        }
        return true;
    }
}