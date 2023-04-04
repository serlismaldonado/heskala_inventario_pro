import { PrismaClient } from "@prisma/client"

export default async function handler(req,res){
    if(req.method === 'GET'){
        try {
            const prisma = new PrismaClient()
            const brands = await prisma.brand.findMany()
            prisma.$disconnect
            res.status(200).json(brands)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}