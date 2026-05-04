import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import { JwtUserPayload, JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard';
import { LoginDto } from '../../application/dto/login.dto';
import { AuthService } from '../../application/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<{ accessToken: string; user: { id: string; email: string; role: Role } }> {
    return this.authService.login(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: JwtUserPayload): JwtUserPayload {
    return user;
  }
}
