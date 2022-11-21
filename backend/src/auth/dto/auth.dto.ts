import { IsNotEmpty, IsString, IsEmail, Length, MinLength, Matches } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  public username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/)
  @IsString()
  @Length(8, 20, { message: 'Password has to be between 8 and 20 chars' })
  public password: string;
}