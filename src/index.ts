import { UrlController } from "./controller/UrlController.js";
import { UserController } from "./controller/UserController.js";
import { redisClient } from "./repository/cache/Redis.js";
import { UrlRepository } from "./repository/implementations/UrlRepository.js";
import { UserRepository } from "./repository/implementations/UserRepository.js";
import { UrlService } from "./service/UrlService.js";
import { UserService } from "./service/UserService.js";

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
export const userController = new UserController(userService)

const urlRepository = new UrlRepository()
const urlService = new UrlService(urlRepository, redisClient)
export const urlController = new UrlController(urlService)