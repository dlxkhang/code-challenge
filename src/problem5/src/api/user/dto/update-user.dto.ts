import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from "class-validator";

export class UpdateUserDTO {
  @IsOptional()
  @IsString({ message: "Full name must be a string" })
  @MinLength(2, { message: "Full name must be at least 2 characters long" })
  @MaxLength(100, { message: "Full name must not exceed 100 characters" })
  fullName?: string;
}
