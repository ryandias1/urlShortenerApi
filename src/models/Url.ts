import z from "zod";

export const UrlEntitySchema = z.object({
    id: z.uuid(),
    url: z.string(),
    user: z.uuid(),
    short: z.string(),
    clicks: z.int(),
    expired: z.boolean(),
    createdAt: z.date()
})

export const UrlCreateSchemaDto = UrlEntitySchema.pick({
    url: true
})

export const UrlUpdateExpiredSchemaDto = UrlEntitySchema.pick({
    expired: true
})

export const UrlResponseSchemaDto = UrlEntitySchema.pick({
    short: true,
    url: true
})

export const UrlStatsResponseSchemaDto = UrlEntitySchema

export type UrlCreateDTO = z.infer<typeof UrlCreateSchemaDto>
export type UrlUpdateExpiredDTO = z.infer<typeof UrlUpdateExpiredSchemaDto>
export type UrlResponseDTO = z.infer<typeof UrlResponseSchemaDto>
export type UrlStatsResponseDTO = z.infer<typeof UrlStatsResponseSchemaDto>