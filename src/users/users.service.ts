import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update.user.dto';
import { PrismaService } from 'nestjs-prisma';
import { GenericServerException } from 'src/exceptions/generic-server.exception';
import { EmailTakenException } from 'src/exceptions/email-taken.exception';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    private readonly logger = new Logger(UsersService.name)

    async getAllUsers() { 
        try {
            const users = await this.prismaService.user.findMany();

            return users;
        } catch(e) {
            this.logger.error(e);

            throw new GenericServerException;
        }
    }

    async findUserById(id: number) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    id,
                }
            });

            return user;
        } catch(e) {
            this.logger.error(e);

            throw GenericServerException;
        }
    }

    async findUserByEmail(email: string) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    email,
                }
            });

            return user;
        } catch(e) {
            this.logger.error(e);

            throw new GenericServerException;
        }
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const saltOrRounds = 10;
        const password = dto.password;
        const hash = await bcrypt.hash(password, saltOrRounds);

        try {
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
        } catch (e) {
            this.logger.error(e);

            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                switch(e.code) {
                    case "P2002": {
                        throw new EmailTakenException;
                    }
                    default: {
                        throw new GenericServerException;
                    }
                }
            }
        }
    }

    async updateUser(id: number, dto: UpdateUserDto) {
        try {
            return await this.prismaService.user.update({
                where: {id},
                data: dto
            })
        } catch(e) {
            this.logger.error(e);

            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') throw new EmailTakenException
            } else {
                throw new GenericServerException;
            }
        }
    }

    async deleteUser(id: number) {
        try {
            const result = this.prismaService.user.delete({
                where: {
                    id: id
                }
            })
    
            return result;
        } catch(e) {
            this.logger.error(e);

            throw new GenericServerException;
        }
    }
}
