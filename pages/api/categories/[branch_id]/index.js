import getPrismaClient from "@/middlewares/prisma_client"

export default async function handler(req, res) {
   if(req.method === "GET") {
    try {
        const prisma = await getPrismaClient()
        const { branch_id } = req.query
        console.log(idCategory)
        const categories = await prisma.category.findMany({
            where: {
                branch_id: branch_id
            }
        })
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
   }
}