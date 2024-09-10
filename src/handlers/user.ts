import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const register = async (req, res) => {
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: await hashPassword(req.body.password)
        }
    })

    const token = createJWT(user)
    res.status(201).json({ token })
}

export const login = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })

    const isValid = await comparePasswords(req.body.password, user.password)

    if (!isValid) {
        return res.status(401).json({ message: "Wrong username or password" })
    }

    const token = createJWT(user)

    res.status(200).json({ token })
}