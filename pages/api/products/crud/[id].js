// Obtiene TODOS los PRODUCTOS de una SUCURSAL(branch_id) en específico
import getPrismaClient from "@/middlewares/prisma_client"
export default async function handler(req, res) {
    const { id } = req.query
   // Validación de método GET
    if (req.method === 'GET' && id) {
        try {
            const prisma = await getPrismaClient()
            const product = await prisma.product.findUnique({
                where: {
                    id: String(id)
                }
            })
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}








