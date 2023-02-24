import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { RefreshedTokenGuard } from 'src/common/guards/refreshed_token.guard';
import { AuthService } from './auth.service';
import { AuthDto, AuthDtoForgot, AuthDtoSignIn } from './dto/auth.dto';
import { Tokens } from './types/tokens.types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signup(dto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: AuthDtoSignIn) {
    return this.authService.signin(dto);
  }

  @Public()
  @UseGuards(RefreshedTokenGuard)
  @Post('signout')
  @HttpCode(HttpStatus.OK)
  signout(@GetCurrentUserId() userId: string): Promise<boolean> {
    return this.authService.signout(userId);
  }

  @Public()
  @UseGuards(RefreshedTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@GetCurrentUserId() userId: string, @GetCurrentUser('refreshToken') refreshToken: string): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Public()
  @Patch('activate/:token')
  activate(@Param('token') token: string) {
    return this.authService.activate(token);
  }

  @Public()
  @UseGuards(RefreshedTokenGuard)
  @Patch('updateAccount/:token')
  updateAccount(@GetCurrentUser('refreshToken') refreshToken: string, @Body() dto: AuthDto) {
    return this.authService.updateAccount(refreshToken, dto);
  }

  @Public()
  @UseGuards(RefreshedTokenGuard)
  @Delete('updateAccount')
  delete(@GetCurrentUser('refreshToken') refreshToken: string) {
    return this.authService.delete(refreshToken);
  }

  // 

  @Post('forgotPassword')
  forgot(@Body() dto: AuthDtoForgot) {
    return this.authService.forgot(dto);
  }

  @Patch('resetPassword/:token')
  reset(@Param('token') token: string, @Body("password") password: string) {
    return this.authService.reset(token, password);
  }

}
