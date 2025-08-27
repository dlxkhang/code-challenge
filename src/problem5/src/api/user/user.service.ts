import { User } from "@prisma/client";
import { USER_ERROR_CODE } from "../../common/error-code";
import { CreateUserDTO, UpdateUserDTO } from "./dto";
import prisma from "../../database/prisma";

class UserService {
  async createUser(createUserDto: CreateUserDTO): Promise<User> {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) throw USER_ERROR_CODE.EMAIL_ALREADY_EXISTS;
    const user = await prisma.user.create({
      data: {
        email: createUserDto.email,
        fullName: createUserDto.fullName,
      },
    });
    return user;
  }

  async getUserById(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw USER_ERROR_CODE.ID_NOT_FOUND;
    return user;
  }

  getAllUsers(nameFilter?: string): Promise<User[]> {
    const where = nameFilter
      ? {
          fullName: { contains: nameFilter },
        }
      : {};

    return prisma.user.findMany({
      where,
    });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDTO): Promise<User> {
    const existingUser = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!existingUser) throw USER_ERROR_CODE.ID_NOT_FOUND;

    const user = await prisma.user.update({
      where: { id },
      data: {
        fullName: updateUserDto.fullName,
      },
    });

    return user;
  }

  async deleteUser(id: string): Promise<{
    success: boolean;
  }> {
    const existingUser = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!existingUser) throw USER_ERROR_CODE.ID_NOT_FOUND;

    await prisma.user.delete({
      where: { id },
    });

    return {
      success: true,
    };
  }
}

export default new UserService();
