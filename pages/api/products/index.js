import getPrismaClient from "@/middlewares/prisma_client"


export default async function handler(req, res) {
    if (req.method === 'GET' ) {
        try {
            const prisma = await getPrismaClient()
            const products = await prisma.product.findMany()
            prisma.$disconnect()
            console.log(products)
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }


    if (req.method === 'POST') {
        const prisma = await getPrismaClient()
        const { name, description,branch_id, brand_id} = req.body
        console.log(req.body)
        const product = await prisma.product.create({
            data: req.body
        })
        prisma.$disconnect()
        res.status(200).json(product)   
    }

    if (req.method === 'PUT') {
        const prisma = await getPrismaClient()
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
        const items = req.body.products
        console.log(items)
        const prisma = await getPrismaClient()
        if (items.length > 0) {

            const productVersions = await prisma.productVersion.deleteMany({
                where: {
                    product_id: {
                        in: items
                    }
                }
            })


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

        if (items.length === 0) {
            res.status(200).json({message: 'No hay productos seleccionados'})   
        }
      
    }
}









