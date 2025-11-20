import React, { useState } from 'react';
import './Login.css';

const Signup = ({ onSwitch }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Signup attempt:', { name, email, password });
        setIsLoading(false);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Create Account</h2>
                    <p>Join us and start your journey</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="name"
                            className="form-input"
                            placeholder=" "
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <label className="form-label" htmlFor="name">Full Name</label>
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label className="form-label" htmlFor="email">Email Address</label>
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label className="form-label" htmlFor="password">Password</label>
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            id="confirmPassword"
                            className="form-input"
                            placeholder=" "
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                    </div>

                    <button type="submit" className="login-button" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <div className="spinner"></div>
                                Creating Account...
                            </>
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                </form>

                <div className="signup-link">
                    Already have an account?
                    <a href="#" onClick={(e) => { e.preventDefault(); onSwitch(); }}>Sign in</a>
                </div>
            </div>
        </div>
    );
};

export default Signup;
