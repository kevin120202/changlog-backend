import express from "express"
import router from "./router"
import morgan from "morgan"
import cors from "cors"
import { protect } from "./modules/auth"
import { login, register } from "./handlers/user"

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", protect, router)
app.post("/user", register)
app.post("/login", login)

export default app