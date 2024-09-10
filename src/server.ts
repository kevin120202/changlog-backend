import express from "express"
import router from "./router"
import morgan from "morgan"
import cors from "cors"
import { protect } from "./modules/auth"
import { login, register } from "./handlers/user"
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware"

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", protect, router)

app.post("/user",
    [body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ], handleInputErrors,
    register)

app.post("/login",
    [body('email').isEmail().withMessage('Must be a valid email address'),
    body('password').notEmpty().withMessage('Password is required')], handleInputErrors,
    login)

export default app