import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from "class-validator";

export class CreateUserDTO {
  @IsEmail({}, { message: "Please provide a valid email address" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  @IsString({ message: "Full name must be a string" })
  @IsNotEmpty({ message: "Full name is required" })
  @MinLength(2, { message: "Full name must be at least 2 characters long" })
  @MaxLength(100, { message: "Full name must not exceed 100 characters" })
  fullName: string;
}
