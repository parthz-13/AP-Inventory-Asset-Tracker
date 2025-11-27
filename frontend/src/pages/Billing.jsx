import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { Search, ShoppingCart, Trash2, Plus, Minus, User } from 'lucide-react';

const Billing = () => {
    const [items, setItems] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [itemsRes, customersRes] = await Promise.all([
                    api.get('/items'),
                    api.get('/customers')
                ]);
                setItems(itemsRes.data);
                setCustomers(customersRes.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchData();
    }, []);

    const addToCart = (item) => {
        setCart(prev => {
            const existing = prev.find(i => i.item_id === item.item_id);
            if (existing) {
                return prev.map(i =>
                    i.item_id === item.item_id
                        ? { ...i, qty: i.qty + 1 }
                        : i
                );
            }
            return [...prev, { ...item, qty: 1 }];
        });
    };

    const removeFromCart = (itemId) => {
        setCart(prev => prev.filter(i => i.item_id !== itemId));
    };

    const updateQty = (itemId, delta) => {
        setCart(prev => prev.map(i => {
            if (i.item_id === itemId) {
                const newQty = Math.max(1, i.qty + delta);
                if (newQty > i.stock) return i; // Prevent exceeding stock
                return { ...i, qty: newQty };
            }
            return i;
        }));
    };

    const calculateTotal = () => {
        return cart.reduce((acc, item) => acc + (Number(item.price) * item.qty), 0);
    };

    const handleCheckout = async () => {
        if (cart.length === 0) return;
        setLoading(true);

        try {
            const billData = {
                cust_id: selectedCustomer || null,
                items: cart.map(item => ({
                    item_id: item.item_id,
                    qty: item.qty,
                    price: item.price
                }))
            };

            await api.post('/bills', billData);
            alert("Bill created successfully!");
            setCart([]);
            setSelectedCustomer('');
            // Refresh items to update stock
            const itemsRes = await api.get('/items');
            setItems(itemsRes.data);
        } catch (error) {
            console.error("Checkout failed:", error);
            alert("Checkout failed");
        } finally {
            setLoading(false);
        }
    };

    const filteredItems = items.filter(item =>
        item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-6">
            {/* Left: Item Selection */}
            <div className="flex-1 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">Billing</h1>
                </div>

                <Card className="flex-1 flex flex-col p-4 overflow-hidden">
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search items..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
                        {filteredItems.map((item) => (
                            <button
                                key={item.item_id}
                                onClick={() => addToCart(item)}
                                disabled={item.stock <= 0}
                                className="text-left p-4 rounded-xl border border-gray-100 hover:border-primary/50 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-900 line-clamp-1">{item.item_name}</h3>
                                    <span className="text-primary font-bold">${Number(item.price).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span>Stock: {item.stock}</span>
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Plus className="w-4 h-4" />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Right: Cart */}
            <div className="w-full lg:w-96 flex flex-col gap-6">
                <Card className="flex-1 flex flex-col p-6">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" /> Current Bill
                    </h2>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Customer (Optional)</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <select
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none bg-white"
                                value={selectedCustomer}
                                onChange={(e) => setSelectedCustomer(e.target.value)}
                            >
                                <option value="">Walk-in Customer</option>
                                {customers.map(c => (
                                    <option key={c.cust_id} value={c.cust_id}>{c.cust_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 mb-6">
                        {cart.length === 0 ? (
                            <div className="text-center text-gray-400 py-8">
                                Cart is empty
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.item_id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900 line-clamp-1">{item.item_name}</h4>
                                        <p className="text-sm text-gray-500">${Number(item.price).toFixed(2)} x {item.qty}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200">
                                            <button
                                                onClick={() => updateQty(item.item_id, -1)}
                                                className="p-1 hover:bg-gray-100 rounded-l-lg"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                                            <button
                                                onClick={() => updateQty(item.item_id, 1)}
                                                className="p-1 hover:bg-gray-100 rounded-r-lg"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.item_id)}
                                            className="text-red-500 hover:text-red-700 p-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="border-t border-gray-100 pt-4 space-y-4">
                        <div className="flex justify-between items-center text-lg font-bold">
                            <span>Total</span>
                            <span>${calculateTotal().toFixed(2)}</span>
                        </div>
                        <Button
                            className="w-full py-3"
                            onClick={handleCheckout}
                            disabled={cart.length === 0 || loading}
                        >
                            {loading ? 'Processing...' : 'Complete Sale'}
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Billing;
