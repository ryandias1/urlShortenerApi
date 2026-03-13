import { Router, type Request, type Response } from "express";
import { urlController } from "../index.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";

const urlRoutes = Router()
urlRoutes.post("/create", authMiddleware,  (req: Request, res: Response) => urlController.create(req, res))
urlRoutes.get("/:short", (req: Request, res: Response) => urlController.redirect(req, res))
urlRoutes.patch("/expire/:id", authMiddleware, (req: Request, res: Response) => urlController.expired(req, res))
urlRoutes.get("/stats/:id", authMiddleware, (req: Request, res: Response) => urlController.getUrlStats(req, res))
urlRoutes.get("/", authMiddleware, (req: Request, res: Response) => urlController.getAll(req, res))
export {urlRoutes}