
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Sign, hash } from 'crypto';
import { resetPasswordInput, signInInput } from './domain/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async signIn(
    signInInput: signInInput
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findByUsername(signInInput.username);

    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    const passHash = hash('sha256', signInInput.password);
    if (user.password !== passHash) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, username: user.name, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async resetPassword(userId: string, resetPasswordInput: resetPasswordInput) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    const oldPasswordHash = hash('sha256', resetPasswordInput.oldPassword);
    const newPasswordHash = hash('sha256', resetPasswordInput.newPassword);

    if (user.password !== oldPasswordHash) {
      throw new BadRequestException("A senha atual está incorreta");
    }

    if(user.password === newPasswordHash){
      throw new BadRequestException("A nova senha não pode ser igual a antiga");
    }

    return await this.userService.updateUser(userId, { password: newPasswordHash });
  }
}
