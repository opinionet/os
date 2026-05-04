import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { PrismaService } from '../../../../database/prisma.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(dto: LoginDto): Promise<{ accessToken: string; user: Pick<User, 'id' | 'email' | 'role'> }> {
    const user = await this.prisma.user.findFirst({ where: { email: dto.email, isActive: true } });

    if (!user || user.passwordHash !== dto.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId,
      },
      process.env.JWT_SECRET ?? 'dev-cityos-secret',
      { expiresIn: '1h' },
    );

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
