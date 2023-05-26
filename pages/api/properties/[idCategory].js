import getPrismaClient from "@/middlewares/prisma_client"

export default async function handler(req, res) {
   if(req.method === "GET") {
    try {
        const prisma = await getPrismaClient()
        const { idCategory } = req.query
        console.log(idCategory)
        const properties = await prisma.property.findMany({
            where: {
                id_category: idCategory
            }
        })
        res.status(200).json(properties)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
   }
}