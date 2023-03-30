import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

export default async function handler(req, res) {
    // registration User with hashed password
    if (req.method === "POST") {
        const { email, password, role } = req.body
        const hashedPassword = await hash(password, 10)
        console.log("rol", role)
        const role_id = await prisma.role.findFirst({
            where: {
                name: role,
            },
        }).then((role) => {
            return role.id
        })

        const company_id = await prisma.company.findFirst({
            where: {
                name: "Heskala",
            },
        }).then((company) => {
            return company.id
        })

        const user = await prisma.user.create({
            data: {
                email,
                hashed_password: hashedPassword,
                role_id: role_id,
                company_id: company_id,
            },
        })
        return res.status(200).json({ user })
    }
}