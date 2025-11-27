import 'dotenv/config';
import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
    const users = await prisma.shopkeeper.findMany();
    console.log('Users:', users);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
