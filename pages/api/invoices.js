import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    if (req.method === "GET") {
        const invoices = await prisma.invoices.findMany();
        res.status(200).json(invoices);
    }
    
    if (req.method === "POST") {
        const { sale, date, total } = req.body;
        const invoice = await prisma.invoices.create({
        data: req.body,
        });
        res.status(200).json(invoice);
    }
    
    if (req.method === "PUT") {
        const invoice = await prisma.invoices.update({
        where: {
            id: String(req.body.id),
        },
        data: req.body,
        });
        res.status(200).json(invoice);
    }
    
    if (req.method === "DELETE") {
        const invoice = await prisma.invoices.delete({
        where: {
            id: String(req.body.id),
        },
        });
        res.status(200).json(invoice);
    }
    }