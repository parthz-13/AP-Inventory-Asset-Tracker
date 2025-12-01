import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [formData, setFormData] = useState({
        item_name: '',
        category: '',
        stock: '',
        price: ''
    });

    const fetchItems = async () => {
        try {
            const response = await api.get('/items');
            setItems(response.data);
        } catch (error) {
            console.error("Failed to fetch items:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleOpenModal = (item = null) => {
        if (item) {
            setCurrentItem(item);
            setFormData({
                item_name: item.item_name,
                category: item.category || '',
                stock: item.stock,
                price: item.price
            });
        } else {
            setCurrentItem(null);
            setFormData({ item_name: '', category: '', stock: '', price: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentItem) {
                await api.put(`/items/${currentItem.item_id}`, formData);
            } else {
                await api.post('/items', formData);
            }
            setIsModalOpen(false);
            fetchItems();
        } catch (error) {
            console.error("Failed to save item:", error);
            alert("Failed to save item");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                await api.delete(`/items/${id}`);
                fetchItems();
            } catch (error) {
                console.error("Failed to delete item:", error);
            }
        }
    };

    const filteredItems = items.filter(item =>
        item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
                <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Item
                </Button>
            </div>

            <Card className="p-4">
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search items..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100 text-gray-500 text-sm">
                                <th className="pb-3 font-medium">Item Name</th>
                                <th className="pb-3 font-medium">Category</th>
                                <th className="pb-3 font-medium">Stock</th>
                                <th className="pb-3 font-medium">Price</th>
                                <th className="pb-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="5" className="py-4 text-center">Loading...</td></tr>
                            ) : filteredItems.length === 0 ? (
                                <tr><td colSpan="5" className="py-4 text-center text-gray-500">No items found</td></tr>
                            ) : (
                                filteredItems.map((item) => (
                                    <tr key={item.item_id} className="group hover:bg-gray-50 transition-colors">
                                        <td className="py-3 font-medium text-gray-900">{item.item_name}</td>
                                        <td className="py-3 text-gray-600">{item.category || '-'}</td>
                                        <td className="py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.stock < 10 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                                }`}>
                                                {item.stock}
                                            </span>
                                        </td>
                                        <td className="py-3 text-gray-900">₹{Number(item.price).toFixed(2)}</td>
                                        <td className="py-3 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleOpenModal(item)}
                                                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.item_id)}
                                                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <Card className="w-full max-w-md relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-xl font-bold mb-6">
                            {currentItem ? 'Edit Item' : 'Add New Item'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Item Name"
                                value={formData.item_name}
                                onChange={(e) => setFormData({ ...formData, item_name: e.target.value })}
                                required
                            />
                            <Input
                                label="Category"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Stock"
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Price"
                                    type="number"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    {currentItem ? 'Save Changes' : 'Add Item'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Inventory;
