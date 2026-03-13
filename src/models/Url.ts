import z from "zod";

export const UrlEntitySchema = z.object({
    id: z.uuid(),
    url: z.string(),
    short: z.string(),
    userId: z.uuid(),
    clicks: z.number().int(),
    active: z.boolean(),
    createdAt: z.date(),
    lastClicked: z.date()
})

export const UrlCreateSchemaDto = UrlEntitySchema.pick({
    url: true
})

export const UrlCreateSchema = UrlEntitySchema.pick({
    url: true,
    short: true,
    userId: true
})

export const UrlExpiredSchemaDto = UrlEntitySchema.pick({
    active: true
})

export const UrlClickedSchemaDto = UrlEntitySchema.pick({
    active: true
})

export const UrlResponseSchemaDto = UrlEntitySchema.pick({
    id: true,
    short: true,
    url: true
})

export const UrlStatsResponseSchemaDto = UrlEntitySchema

export type UrlCreateDTO = z.infer<typeof UrlCreateSchemaDto>
export type UrlCreate = z.infer<typeof UrlCreateSchema>
export type UrlExpiredDTO = z.infer<typeof UrlExpiredSchemaDto>
export type UrlResponseDTO = z.infer<typeof UrlResponseSchemaDto>
export type UrlStatsResponseDTO = z.infer<typeof UrlStatsResponseSchemaDto>