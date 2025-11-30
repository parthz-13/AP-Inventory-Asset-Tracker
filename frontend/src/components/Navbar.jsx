import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { Package } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Package className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            InventoryPro
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
                        <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</a>
                        <a href="#about" className="text-gray-600 hover:text-primary transition-colors">About</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/login">
                            <Button variant="ghost">Log in</Button>
                        </Link>
                        <Link to="/signup">
                            <Button>Get Started</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
