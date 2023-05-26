import getPrismaClient from "@/middlewares/prisma_client"

export default async function handler(req, res) {
if(req.method === "GET") {
    try {  
        const prisma = await getPrismaClient()
        const categories = await prisma.category.findMany()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
}  
    