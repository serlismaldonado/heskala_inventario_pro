import { getSession } from "next-auth/react"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  

    if (req.method === "POST") {
        const session = await getSession({ req })

        if (!session) {
            res.status(401).json({ error: "Not authenticated" })
            return
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
        })

        if (!user) {
            res.status(404).json({ error: "User not found" })
            return
        }

        // delete all sessions for the user
        await prisma.session.deleteMany({
            where: {
                userId: user.id,
            },
        })

        // destroy the cookie
        res.setHeader("Set-Cookie", [
            `next-auth.session-token=; path=/; httponly`,
        ])

        //delete cookie


    
      
    }



    // destroy the cookie
    res.setHeader("Set-Cookie", [
        `next-auth.session-token=; path=/; httponly`,
    ])
    res.status(200).json({ message: "Success" })

}
    
