import z from "zod";

export const UserEntitySchema = z.object({
    id: z.uuid(),
    name: z.string(),
    email: z.email(),
    password: z.string()
})

export const UserRegisterSchemaDto = UserEntitySchema.omit({
    id: true
}).extend({
    password: z.string().min(6, "A senha deve ter no minimo 6 caracteres.")
})

export const UserUpdateSchemaDto = UserEntitySchema.partial()

export const UserLoginSchemaDto = UserEntitySchema.pick({
    email: true,
    password: true
})

export const UserResponseSchemaDto = UserEntitySchema.omit({
    password: true
})

export type UserRegisterDTO = z.infer<typeof UserRegisterSchemaDto>
export type UserUpdateDTO = z.infer<typeof UserUpdateSchemaDto>
export type UserLoginDTO = z.infer<typeof UserLoginSchemaDto>
export type UserResponseDTO = z.infer<typeof UserResponseSchemaDto>