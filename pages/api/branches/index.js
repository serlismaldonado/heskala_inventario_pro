import {PrismaClient} from "@prisma/client";

export default async function handler(req,res){
    if(req.method === 'GET'){
        try {
         const prisma = new PrismaClient()
        const branches = await prisma.branch.findMany()
        prisma.$disconnect
        res.status(200).json(branches)
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }
}