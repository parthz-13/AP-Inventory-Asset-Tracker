import 'dotenv/config';
import { PrismaClient } from './backend/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Attempting to create item with string values...');
        const item = await prisma.item.create({
            data: {
                item_name: 'Test Item String',
                category: 'Test',
                stock: "2", // Passing string
                price: "11.02", // Passing string
                shop_id: 1, // Assuming shop_id 1 exists
            },
        });
        console.log('Item created successfully:', item);
    } catch (error) {
        console.error('Error creating item:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
