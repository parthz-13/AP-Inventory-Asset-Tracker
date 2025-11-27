import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-background font-sans text-gray-900">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 rounded-full blur-3xl opacity-50" />
                    <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-400/10 rounded-full blur-3xl opacity-30" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            🚀 Smart Inventory Management for Modern Businesses
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-b from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Manage Your Assets <br /> With Confidence
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Streamline your inventory, track assets in real-time, and generate insightful reports.
                            The all-in-one solution for shopkeepers and small businesses.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/signup">
                                <Button className="h-12 px-8 text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40">
                                    Get Started Free
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="outline" className="h-12 px-8 text-lg">
                                    View Demo
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-20 relative mx-auto max-w-5xl"
                    >
                        <div className="rounded-2xl bg-white/50 backdrop-blur-xl border border-white/20 shadow-2xl p-4">
                            <img
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                                alt="Dashboard Preview"
                                className="rounded-xl w-full h-auto shadow-sm"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to scale</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Powerful features designed to help you take control of your business operations.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Zap className="w-6 h-6 text-amber-500" />}
                            title="Real-time Tracking"
                            description="Monitor stock levels instantly. Get low-stock alerts and never run out of best-sellers."
                        />
                        <FeatureCard
                            icon={<ShieldCheck className="w-6 h-6 text-emerald-500" />}
                            title="Secure & Reliable"
                            description="Enterprise-grade security for your data. Automated backups and encrypted transactions."
                        />
                        <FeatureCard
                            icon={<BarChart3 className="w-6 h-6 text-primary" />}
                            title="Insightful Analytics"
                            description="Visualize sales trends, profit margins, and inventory turnover with beautiful charts."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your business?</h2>
                    <p className="text-gray-600 mb-10 text-lg">
                        Join thousands of shopkeepers who trust InventoryPro for their daily operations.
                    </p>
                    <Link to="/signup">
                        <Button className="h-12 px-8 text-lg">Start Your Free Trial <ArrowRight className="ml-2 w-5 h-5" /></Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500">© 2024 InventoryPro. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-500 hover:text-primary">Privacy</a>
                        <a href="#" className="text-gray-500 hover:text-primary">Terms</a>
                        <a href="#" className="text-gray-500 hover:text-primary">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all duration-300"
    >
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
);

export default LandingPage;
