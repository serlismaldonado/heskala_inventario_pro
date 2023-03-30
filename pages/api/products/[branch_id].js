import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default async function handler(req, res) {
    const { branch_id } = req.query
   
    if (req.method === 'GET' && branch_id) {
        try {
            const prisma = new PrismaClient()
            const products = await prisma.product.findMany({
                where: {
                    branch_id: String(req.query.branch_id)
                }
            })
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}









