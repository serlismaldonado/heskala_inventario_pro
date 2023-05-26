import getPrismaClient from "@/middlewares/prisma_client"

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const prisma = await getPrismaClient()
            const productVersions = await prisma.productVersion.findMany({
                include: {
                    product: true,
                },
            })
            console.log(productVersions)
            res.status(200).json(productVersions)
        } catch (error) {
        res.status(500).json({ error: error.message })
        }
    }
    
    if (req.method === "POST") {
        try {

            const prisma = await getPrismaClient()
            const { name,
                description,
                purchasePrice,
                salePrice,
                stock,
                product_id,
                properties } = req.body
            
            
            
            console.log(req.body)
            
            const product = await prisma.productVersion.create({
                data: {
                    name,
                    description,
                    purchase_price: Number(purchasePrice),
                    sale_price: Number(salePrice),
                    stock_quantity: Number(stock),
                    product_id: product_id,
                    
                },
            }).then((product) => {
                properties.forEach(async (property) => {
                    await prisma.property.create({
                        data: {
                            product_id: product.id,
                            name: property.name,
                            value: property.value,
                            id_category: property.id_category,

                        },
                    })
                })
            })

            res.status(200).json(product)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    
    if (req.method === "PUT") {
        const prisma = await getPrismaClient()
        const product = await prisma.productVersion.update({
        where: {
            id: String(req.body.id),
        },
        data: req.body,
        })
        res.status(200).json(product)
    }
    
    if (req.method === "DELETE") {

        const productsIds = req.body.products
        const prisma = await getPrismaClient()
       
           const deletedProperties = prisma.property.deleteMany({
                where: {
                    product_id: {
                        in: productsIds,
                    },
                },
            })
        
        const deletedProductVersions = prisma.productVersion.deleteMany({
            where: {
                id: {
                    in: productsIds,
                },
            },
        })

        const transaction = await prisma.$transaction([deletedProperties, deletedProductVersions])
        res.status(200).json(transaction)


     

        res.status(200).json(product)
    }
    }