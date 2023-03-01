import { PrismaClient } from '@prisma/client'
export default async function handler(req, res) {
    if(req.method === 'GET') {
        const prisma = new PrismaClient()
        const products = await prisma.product.findMany()
        res.status(200).json(products)
    }


    if (req.method === 'POST') {
        const prisma = new PrismaClient()
        const { name, purchase_price, sale_price, barcode, last_stock_update_date, stock_quantity } = req.body
        const product = await prisma.product.create({
            data: req.body
        })
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
        res.status(200).json(product)   
    }

    if (req.method === 'DELETE') {
        const prisma = new PrismaClient()
        const product = await prisma.product.delete({
            where: {
                id: String(req.body.id)
            }
        })
        res.status(200).json(product)   
    }
}