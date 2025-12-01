import 'dotenv/config';
import { PrismaClient } from './backend/generated/prisma/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Attempting to create shopkeeper...');
        const password = 'password123';
        const hashedPassword = await bcrypt.hash(password, 10);

        const shopkeeper = await prisma.shopkeeper.create({
            data: {
                shop_name: 'Test Shop Repro ' + Date.now(),
                name: 'Test User Repro',
                email: 'testrepro' + Date.now() + '@example.com',
                password: hashedPassword,
            },
        });
        console.log('Shopkeeper created successfully:', shopkeeper);
    } catch (error) {
        console.error('Error creating shopkeeper:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
