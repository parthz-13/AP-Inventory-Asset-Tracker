import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { Package } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Package className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">InventoryPro</span>
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
                    <p className="text-gray-600 mt-2">Please enter your details to sign in</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                            {error}
                        </div>
                    )}

                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign in'}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-primary hover:text-blue-700">
                        Sign up for free
                    </Link>
                </p>
            </Card>
        </div>
    );
};

export default Login;
