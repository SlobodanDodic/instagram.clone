import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, AuthDtoForgot, AuthDtoSignIn } from './dto/auth.dto';

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
  update(@Param('username') username: string, @Body("isActivated") isActivated: boolean) {
    return this.authService.update(username, isActivated);
  }

  @Post('forgotPassword')
  forgot(@Body() dto: AuthDtoForgot) {
    return this.authService.forgot(dto);
  }

  @Patch('resetPassword/:token')
  reset(@Param('token') token: string, @Body("password") password: string) {
    return this.authService.reset(token, password);
  }

  @Patch('updateAccount/:token')
  updateAccount(@Param('token') token: string, @Body() dto: AuthDto) {
    return this.authService.updateAccount(token, dto);
  }

  @Delete('updateAccount/:username')
  delete(@Param('username') username: string) {
    return this.authService.delete(username);
  }
}
