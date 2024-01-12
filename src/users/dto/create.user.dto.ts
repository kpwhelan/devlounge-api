import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    aboutMe?: string;

    @ApiProperty()
    @IsUrl()
    @IsOptional()
    profilePictureUrl?: string;

    @ApiProperty()
    @IsUrl()
    @IsOptional()
    githubUrl?: string;

    @IsUrl()
    @IsOptional()
    linkedinUrl?: string;

    @ApiProperty()
    @IsUrl()
    @IsOptional()
    instagramUrl?: string;

    @ApiProperty()
    @IsUrl()
    @IsOptional()
    xUrl?: string;

    @ApiProperty()
    @IsUrl()
    @IsOptional()
    websiteUrl?: string;
}