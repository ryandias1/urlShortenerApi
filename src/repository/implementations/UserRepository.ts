import { prisma } from "../../lib/prisma.js";
import { UserResponseSchemaDto, type UserRegisterDTO, type UserResponseDTO, type UserUpdateDTO } from "../../models/User.js";
import type { Repository } from "../Repository.js";

export class UserRepository implements Repository<UserRegisterDTO, UserResponseDTO> {
    async create(data: UserRegisterDTO) {
        const { name, email, password } = data
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })
        return UserResponseSchemaDto.parse(user)
    }

    async update(id: string, data: UserUpdateDTO) {
        let { name, email, password } = data
        const user = await prisma.user.update({
            where: {id},
            data: {
                name,
                email,
                password
            }
        })
        return UserResponseSchemaDto.parse(user)
    }

    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {id}
        })
        return UserResponseSchemaDto.parse(user)
    }

    async delete(id: string) {
        await prisma.user.delete({
            where: {id}
        })
    }
}