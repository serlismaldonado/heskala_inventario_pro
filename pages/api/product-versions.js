import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
        const productVersions = await prisma.productVersion.findMany({})
        res.status(200).json(productVersions)
        } catch (error) {
        res.status(500).json({ error: error.message })
        }
    }
    
    if (req.method === "POST") {
        const { name, purchase_price, sale_price, barcode, last_stock_update_date, stock_quantity } = req.body
        const product = await prisma.product.create({
        data: req.body,
        })
        res.status(200).json(product)
    }
    
    if (req.method === "PUT") {
        const product = await prisma.product.update({
        where: {
            id: String(req.body.id),
        },
        data: req.body,
        })
        res.status(200).json(product)
    }
    
    if (req.method === "DELETE") {
        const product = await prisma.product.delete({
        where: {
            id: String(req.body.id),
        },
        })
        res.status(200).json(product)
    }
    }