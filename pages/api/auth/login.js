import { PrismaClient } from "@prisma/client"
import { compare } from "bcrypt"
import  Jwt  from "jsonwebtoken"

const prisma = new PrismaClient()

//configure login

export default async function handler(req, res) {
  if (req.method === "POST") {

    const { email, password } = req.body
   
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      }
    })

    if (!user) {
      res.status(401).json({ error: "Invalid credentials" })
      return
    }

    const passwordMatch = await compare(password, user.hashed_password)

    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid credentials" })
      return
    }

    const token = Jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    })

    // create a session token for the user
    await prisma.session.create({
      data: {
        userId: user.id,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        sessionToken: token,
      },
    })

    // set the cookie with the token
    res.setHeader("Set-Cookie", [
      `next-auth.session-token=${token}; path=/; httponly`,
    ])
    prisma.$disconnect
    return res.status(200).json(user)
  }
}