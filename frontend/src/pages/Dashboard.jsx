import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Card from '../components/Card';
import { Package, Users, Receipt, TrendingUp, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalItems: 0,
        lowStock: 0,
        totalCustomers: 0,
        totalSales: 0,
        recentTransactions: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/auth/profile');
                const data = response.data;

                const totalItems = data.items.length;
                const lowStock = data.items.filter(item => item.stock < 10).length;
                const totalCustomers = data.customers.length;
                const totalSales = data.transactions.reduce((acc, curr) => acc + Number(curr.total_price), 0);

                setStats({
                    totalItems,
                    lowStock,
                    totalCustomers,
                    totalSales,
                    recentTransactions: data.transactions.slice(-5).reverse() // Show last 5
                });
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div className="p-8 text-center">Loading dashboard...</div>;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome back, {user?.name || 'Shopkeeper'}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Items"
                    value={stats.totalItems}
                    icon={<Package className="w-6 h-6 text-blue-600" />}
                    bg="bg-blue-50"
                />
                <StatCard
                    title="Low Stock Alerts"
                    value={stats.lowStock}
                    icon={<AlertTriangle className="w-6 h-6 text-amber-600" />}
                    bg="bg-amber-50"
                />
                <StatCard
                    title="Total Customers"
                    value={stats.totalCustomers}
                    icon={<Users className="w-6 h-6 text-emerald-600" />}
                    bg="bg-emerald-50"
                />
                <StatCard
                    title="Total Sales"
                    value={`₹${stats.totalSales.toFixed(2)}`}
                    icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
                    bg="bg-purple-50"
                />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <h2 className="text-xl font-bold mb-4">Recent Sales</h2>
                    {stats.recentTransactions.length > 0 ? (
                        <div className="space-y-4">
                            {stats.recentTransactions.map((t) => (
                                <div key={t.transaction_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-100 rounded-full">
                                            <Receipt className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Transaction #{t.transaction_id}</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-gray-900">₹{Number(t.total_price).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">No recent transactions</p>
                    )}
                </Card>

                <Card>
                    <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <QuickAction title="Add New Item" link="/inventory" color="bg-blue-50 text-blue-700 hover:bg-blue-100" />
                        <QuickAction title="Create Bill" link="/billing" color="bg-green-50 text-green-700 hover:bg-green-100" />
                        <QuickAction title="Add Customer" link="/customers" color="bg-purple-50 text-purple-700 hover:bg-purple-100" />
                        <QuickAction title="View Reports" link="/reports" color="bg-orange-50 text-orange-700 hover:bg-orange-100" />
                    </div>
                </Card>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, bg }) => (
    <Card className="flex items-center gap-4 hover:shadow-md transition-shadow">
        <div className={`p-3 rounded-xl ${bg}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-600 font-medium">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
    </Card>
);

const QuickAction = ({ title, link, color }) => (
    <a href={link} className={`p-4 rounded-xl font-medium text-center transition-colors ${color}`}>
        {title}
    </a>
);

export default Dashboard;
