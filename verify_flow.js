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
        console.log('   Login successful. Token received.');

        const headers = { Authorization: `Bearer ${token}` };

        console.log('\n2. Creating Item...');
        const itemRes = await axios.post(`${API_URL}/items`, {
            item_name: 'Test Item API',
            category: 'Test',
            stock: 100,
            price: 20.00
        }, { headers });
        const itemId = itemRes.data.item.item_id;
        console.log(`   Item created. ID: ${itemId}`);

        console.log('\n3. Creating Customer...');
        const customerRes = await axios.post(`${API_URL}/customers`, {
            cust_name: 'API Customer',
            email: 'api@customer.com',
            phone: '1234567890'
        }, { headers });
        const custId = customerRes.data.customer.cust_id;
        console.log(`   Customer created. ID: ${custId}`);

        console.log('\n4. Creating Bill...');
        const billRes = await axios.post(`${API_URL}/bills`, {
            cust_id: custId,
            items: [
                { item_id: itemId, qty: 2, price: 20.00 }
            ]
        }, { headers });
        console.log(`   Bill created. Bill No: ${billRes.data.bill_no}`);

        console.log('\n5. Checking Dashboard Stats...');
        const profileRes = await axios.get(`${API_URL}/auth/profile`, { headers });
        const stats = profileRes.data;

        const totalSales = stats.transactions.reduce((acc, t) => acc + Number(t.total_price), 0);
        console.log(`   Total Items: ${stats.items.length}`);
        console.log(`   Total Customers: ${stats.customers.length}`);
        console.log(`   Total Sales: $${totalSales}`);

        if (stats.items.length > 0 && stats.customers.length > 0 && totalSales > 0) {
            console.log('\n✅ VERIFICATION SUCCESSFUL');
        } else {
            console.log('\n❌ VERIFICATION FAILED: Stats mismatch');
        }

    } catch (error) {
        console.error('\n❌ VERIFICATION FAILED:', error.response?.data || error.message);
    }
}

main();
