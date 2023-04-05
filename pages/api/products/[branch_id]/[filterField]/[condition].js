import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default async function handler(req, res) {
    const { branch_id, condition, filterField } = req.query

    // Configuración de filtro por campo
    const filterBy = new Object()
    filterBy[filterField] = { contains: String(condition) }
    filterBy['branch_id'] = String(branch_id)
    
    // Validación de método GET
    if (req.method === 'GET' && branch_id && condition) {
        try {
            const prisma = new PrismaClient()
            const products = await prisma.product.findMany({
                take: 10,
                where: filterBy,
            })
            prisma.$disconnect()
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

