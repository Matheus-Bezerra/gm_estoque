
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(username);
    const passHash = hash('sha256', pass);
    if (user.password !== passHash) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.name };
    console.log("payload");
    console.log(payload);
     
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
