import { PrismaClient } from '@prisma/client';


// Prisma client instance — keep as singleton
const prisma = new PrismaClient();
export default prisma;