import type { UrlCreate, UrlCreateDTO } from "../models/Url.js";
import type { UrlRepository } from "../repository/implementations/UrlRepository.js";
import { nanoid } from "nanoid"

export class UrlService {
    constructor(private readonly urlRepository: UrlRepository) {}

    async create(userId: string, data: UrlCreateDTO) {
        const {url} = data
        let isUnique = false
        let shortGenerated
        while(!isUnique) {
            shortGenerated = nanoid(6)
            isUnique = await this.urlRepository.findByShort(shortGenerated) ? false: true
        }
        const short: string = shortGenerated!
        const urlToCreate: UrlCreate = {
            short,
            url,
            userId
        } 
        const urlCreated = await this.urlRepository.create(urlToCreate)
        return urlCreated
    }

    async redirect(short: string) {
        const longUrl = await this.urlRepository.findByShort(short)
        if (!longUrl) throw new Error("Url não existe")
        if(!longUrl.active) throw new Error("Url expirada")
        await this.urlRepository.updateClicks(longUrl.id)
        const {url} = longUrl
        return url
    }

    async expired(userId: string, id: string) {
        const url = await this.urlRepository.findById(id)
        if (!url) throw new Error("Url não existe")
        if (userId !== url.userId) throw new Error("Url não existe")
        const urlExpired = await this.urlRepository.updateExpired(id)
        return urlExpired
    }

    async getUrlStats(userId: string, id: string) {
        const url = await this.urlRepository.findById(id)
        if (!url) throw new Error("Url não existe")
        if (userId !== url.userId) throw new Error("Url não existe")
        return url
    }

    async getAll(userId: string) {
        const urls = await this.urlRepository.findAllByUserId(userId)
        return urls
    }


}