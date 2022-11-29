import { IsNotEmpty, IsString, IsEmail, Length, MinLength, IsBoolean } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  public username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @Length(8, 20, { message: 'Password has to be between 8 and 20 chars' })
  public password: string;

  @IsBoolean()
  public isActivated?: boolean = false;
}

export class AuthDtoSignIn {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  public username: string;

  @IsString()
  @Length(8, 20, { message: 'Password has to be between 8 and 20 chars' })
  public password: string;

  @IsBoolean()
  public isActivated?: boolean = false;
}