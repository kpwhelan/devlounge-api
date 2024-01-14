import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update.user.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    async getAllUsers() {
        const users = await this.prismaService.user.findMany();

        return users;
    }

    async findUserById(id: number) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id,
            }
        });

        return user;
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const saltOrRounds = 10;
        const password = 'random_password';
        const hash = await bcrypt.hash(password, saltOrRounds);

        // try {
            const user = await this.prismaService.user.create({
                data: {
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    email: dto.email,
                    password: hash,
                    title: dto.title,
                    aboutMe: dto.aboutMe,
                    profilePictureUrl: dto.profilePictureUrl,
                    githubUrl: dto.githubUrl,
                    linkedinUrl: dto.linkedinUrl,
                    instagramUrl: dto.instagramUrl,
                    xUrl: dto.xUrl,
                    websiteUrl: dto.websiteUrl
                }
            })

            return user;
        // } catch (e) {
        //     console.log(e)
        // }
    }

    async updateUser(id: number, dto: UpdateUserDto) {
        //returns user object
        return await this.prismaService.user.update({
            where: {id},
            data: dto
        })
    }

    async deleteUser(id: number) {
        const result = this.prismaService.user.delete({
            where: {
                id: id
            }
        })

        return result;
    }
}
