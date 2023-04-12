
import { PrismaClient } from '@prisma/client';
export default async function getPrismaClient() {
   const prisma = new PrismaClient();
    return prisma;
}