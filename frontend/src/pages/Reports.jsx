import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Card from '../components/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Reports = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await api.get('/analytics');
                setData(response.data);
            } catch (err) {
                console.error("Failed to fetch analytics:", err);
                setError('Failed to load reports data.');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) return <div className="p-8 text-center">Loading reports...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
                <p className="text-gray-600 mt-2">Insights into your business performance</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-50">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 font-medium">Total Sales</p>
                        <h3 className="text-2xl font-bold text-gray-900">₹{data.totalSales.toFixed(2)}</h3>
                    </div>
                </Card>
                <Card className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-green-50">
                        <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 font-medium">Total Profit</p>
                        <h3 className="text-2xl font-bold text-gray-900">₹{data.totalProfit.toFixed(2)}</h3>
                    </div>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sales Over Time */}
                <Card className="h-[400px]">
                    <h2 className="text-xl font-bold mb-6">Sales Over Time</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data.salesChartData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="#6366f1" name="Sales (₹)" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                {/* Sales by Category */}
                <Card className="h-[400px]">
                    <h2 className="text-xl font-bold mb-6">Sales by Category</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data.categoryChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.categoryChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
            </div>
        </div>
    );
};

export default Reports;
