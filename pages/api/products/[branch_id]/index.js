// Obtiene TODOS los PRODUCTOS de una SUCURSAL(branch_id) en específico
import getPrismaClient from "@/middlewares/prisma_client"
export default async function handler(req, res) {
    const { branch_id } = req.query
   // Validación de método GET
    console.log(req.query)
    if (req.method === 'GET' && branch_id) {
        try {
            const prisma = await getPrismaClient()
            const products = await prisma.product.findMany({
                take: 10,
                where: {
                    branch_id: String(branch_id)
                },
                include: {
                    brand: true,
                }
              
            })
           
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}









