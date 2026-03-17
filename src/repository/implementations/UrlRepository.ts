import type { Repository } from "../Repository.js";
import { UrlResponseSchemaDto, UrlStatsResponseSchemaDto, type UrlCreate, type UrlResponseDTO, type UrlStatsResponseDTO} from "../../models/Url.js"
import {prisma} from "../../lib/prisma.js"

export class UrlRepository implements Repository<UrlCreate, UrlResponseDTO> {
    async create(data: UrlCreate) {
        const { url, short, userId } = data
        const urlEntity = await prisma.url.create({
            data: {
                url,
                short,
                userId
            }
        })
        return UrlResponseSchemaDto.parse(urlEntity)
    }

    async updateExpired(id: string) {
        const urlUpdated = await prisma.url.update({
            where: {id},
            data: {
                active: false
            }
        })
        return UrlStatsResponseSchemaDto.parse(urlUpdated)
    }

    async updateClicks(id: string) {
        const urlUpdated = await prisma.url.update({
            where: {id},
            data: {
                clicks: {
                    increment: 1
                },
                lastClicked: new Date()
            }
        })
        return UrlStatsResponseSchemaDto.parse(urlUpdated)
    }

    async findById(id: string) {
        const urlFound = await prisma.url.findUnique({
            where: {id}
        })
        return UrlStatsResponseSchemaDto.parse(urlFound)        
    }

    async findByShort(short: string) {
        const urlFound = await prisma.url.findUnique({
            where: {short}
        })
        return urlFound
    }

    async findAllByUserId(userId: string) {
        const users = await prisma.url.findMany({
            where: {userId}
        })
        return users as UrlStatsResponseDTO[]
    }

    async delete(id: string) {
        await prisma.url.delete({
            where: {id}
        })
    }
}