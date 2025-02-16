import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredRoles) {
            return true;
        }
        const {user} = context.switchToHttp().getRequest()

        if(requiredRoles.includes(user.role)){
            return true
        }
        else {
            throw new HttpException(`You do not have permission! Only [${requiredRoles.join(', ')}] allowed.`,HttpStatus.FORBIDDEN);
        }

    }
}
