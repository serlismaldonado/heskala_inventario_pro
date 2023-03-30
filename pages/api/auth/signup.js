// Create a new user in the database using auth0 and next-auth

// Path: pages/api/auth/signup.js

import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if(req.method === "POST") {
        const { email, password } = req.body
        const hashedPassword = await hash(password, 10)
        const user = await prisma.user.create({
        data: {
            email,
            hashed_password: hashedPassword,
        },
        })
        res.status(200).json(user)
    } 
}
    