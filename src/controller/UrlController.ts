import type { Request, Response } from "express";
import type { UrlService } from "../service/UrlService.js";
import { UrlCreateSchemaDto } from "../models/Url.js";

export class UrlController {
    constructor(private readonly urlService: UrlService) {}

    async create(req: Request, res: Response) {
        const {userId} = res.locals
        const data = UrlCreateSchemaDto.parse(req.body)
        const urlCreated = await this.urlService.create(userId, data)
        return res.status(201).json(urlCreated)
    }

    async redirect(req: Request, res: Response) {
        const short = req.params.short
        if (!short) res.status(404).json({"message": "Rota inexistente"})
        if (!short || typeof short !== 'string') return res.status(404).json({ "message": "Rota inexistente" })
        const url = await this.urlService.redirect(short)
        return res.redirect(url)
    }

    async expired(req: Request, res: Response) {
        const {userId} = res.locals
        const id = req.params.id
        if (!id) res.status(404).json({"message": "Url inexistente"})
        if (!id || typeof id !== 'string') return res.status(404).json({ "message": "Url inexistente" })
        const url = await this.urlService.expired(userId, id)
        return res.status(200).json(url)
    }

    async getUrlStats(req: Request, res: Response) {
        const {userId} = res.locals
        const id = req.params.id
        if (!id) res.status(404).json({"message": "Url inexistente"})
        if (!id || typeof id !== 'string') return res.status(404).json({ "message": "Url inexistente" })
        const urlStats = await this.urlService.getUrlStats(userId, id)
        return res.status(200).json(urlStats)
    }

    async getAll(req: Request, res: Response) {
        const {userId} = res.locals
        const urls = await this.urlService.getAll(userId)
        return res.status(200).json(urls)
    }
}