import { Body, Controller, Get, Param, Patch, Post, Put, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, AuthDtoSignIn } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  async signin(@Body() dto: AuthDtoSignIn, @Request() req, @Response() res) {
    return this.authService.signin(dto, req, res);
  }

  @Get('signout')
  signout(@Request() req, @Response() res) {
    return this.authService.signout(req, res);
  }

  @Patch('active/:username')
  update(@Param('username') username: string, @Body() isActivated: boolean) {
    return this.authService.update(username, isActivated);
  }
}
