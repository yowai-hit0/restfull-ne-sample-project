// src/dtos/auth.dto.ts
import {
    IsEmail,
    IsNotEmpty,
    isString,
    IsString,
    Matches,
    MaxLength,
    MinLength,
  } from "class-validator";
  

  export class RegisterDTO {
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    @IsNotEmpty()
    firstName: string;
  
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    @IsNotEmpty()
    lastName: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(16)
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/, {
      message:
        "Password must have at least 6 characters, one symbol, one number, and one uppercase letter.",
    })
    readonly password: string;
  }

  export class LoginDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
  }
  
  export class RequestOtpDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;
  }
  export class VerifyOtpDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    otp: string;
  }

  export class ForgotPasswordDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;
  }
  
  export class ResetPasswordDTO {
    @IsString()
    @IsNotEmpty()
    token: string;
  
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    newPassword: string;
  
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    confirmPassword: string;
  }
  
  // export class VerifyEmailDTO {
  //   @IsString()
  //   @IsNotEmpty()
  //   token: string;
  // }

  export class EmailDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;
  }
