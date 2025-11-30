import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    Receipt,
    Users,
    LogOut,
    Settings
} from 'lucide-react';
import { cn } from '../utils/cn';

const Sidebar = () => {
    const location = useLocation();

    const links = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Inventory', path: '/inventory', icon: Package },
        { name: 'Billing', path: '/billing', icon: Receipt },
        { name: 'Customers', path: '/customers', icon: Users },
    ];

    return (
        <div className="h-screen w-64 bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0">
            <div className="p-6">
                <Link to="/dashboard" className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Package className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">InventoryPro</span>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;

                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={cn(
                                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                                isActive
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{link.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-100 space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-xl transition-colors">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Log out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
