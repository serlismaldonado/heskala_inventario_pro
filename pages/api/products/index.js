import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default async function handler(req, res) {
    if (req.method === 'GET' ) {
        try {
            const prisma = new PrismaClient()
            const products = await prisma.product.findMany()
            prisma.$disconnect()
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }


    if (req.method === 'POST') {
        const prisma = new PrismaClient()
        const { name, description,branch_id, brand_id} = req.body
        console.log(req.body)
        const product = await prisma.product.create({
            data: req.body
        })
        prisma.$disconnect()
        res.status(200).json(product)   
    }

    if (req.method === 'PUT') {
        const prisma = new PrismaClient()
        const product = await prisma.product.update({
            where: {
                id: String(req.body.id)
            },
            data: req.body
        })
        prisma.$disconnect()
        res.status(200).json(product)   
    }

    if (req.method === 'DELETE') {
        const items = req.body
        const prisma = new PrismaClient()
        if (items.length > 0) {
            const product = await prisma.product.deleteMany({
                where: {
                    id: {
                        in: items
                    }
                }
            })

            prisma.$disconnect()
            res.status(200).json(product)   
        }
      
    }
}









