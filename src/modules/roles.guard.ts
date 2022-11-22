import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { User } from './users/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const jwtoken = request.headers.authorization.split(' ')[1];
    const { user } = this.jwtService.decode(jwtoken) as { user: User };

    if (!user) {
      return false;
    }

    const hasRole = () =>
      (user as User).roles.some(
        (role) => !!roles.find((item) => item === role.key),
      );

    return user && (user as User).roles && hasRole();
  }
}
