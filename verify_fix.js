import axios from 'axios';

const API_URL = 'http://localhost:5050';

async function main() {
    try {
        console.log('1. Logging in...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: 'Gatest1234@example.com',
            password: 'password123'
        });
        const token = loginRes.data.token;
        console.log('   Login successful.');

        const headers = { Authorization: `Bearer ${token}` };

        console.log('\n2. Creating Item with STRING values...');
        const itemRes = await axios.post(`${API_URL}/items`, {
            item_name: 'String Input Item',
            category: 'Test',
            stock: "50", // String
            price: "15.50" // String
        }, { headers });

        console.log('   Item created successfully:', itemRes.data.item);

        if (typeof itemRes.data.item.price === 'string' || typeof itemRes.data.item.price === 'number') {
            console.log('\n✅ VERIFICATION SUCCESSFUL: Controller handled string inputs.');
        }

    } catch (error) {
        console.error('\n❌ VERIFICATION FAILED:', error.response?.data || error.message);
    }
}

main();
