import express from "express"
import "dotenv/config"
import { userRoutes } from "./routes/UserRoutes.js"
import { urlRoutes } from "./routes/UrlRoutes.js"

const app = express()
const port = process.env.PORT
app.use(express.json())
app.use("/user", userRoutes)
app.use("/url", urlRoutes)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))