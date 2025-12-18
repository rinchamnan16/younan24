import React, { useState } from 'react';
import { License } from './License';

const APP_LOGO = "https://lh3.google.com/u/0/d/1bPV5-2nb1T59K7MHfjDEflFl3mF32Y2c=w1024-h1024-iv1?auditContext=forDisplay";

interface LoginProps {
    onLogin: () => void;
    onViewAdmin: () => void;
    onCreateAccount: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onViewAdmin, onCreateAccount }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLicense, setShowLicense] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, validation and auth logic would go here
        if (email && password) {
            onLogin();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-indigo-50 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="flex flex-col items-center mb-4">
                        <div className="relative">
                            <img 
                                src={APP_LOGO} 
                                alt="YouNan Logo" 
                                className="w-24 h-24 object-contain rounded-full border-4 border-indigo-50 shadow-sm"
                            />
                        </div>
                    </div>
                    <h1 className="text-3xl font-moul text-indigo-700 mb-2 mt-6">យូណាន</h1>
                    <h2 className="text-xl font-bold text-gray-900 font-sans">YouNan Photography</h2>
                    <p className="text-gray-500 text-sm mt-2">Please login to continue</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email or Username</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Remember & Forgot */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                            <span className="ml-2 text-gray-600">Remember me</span>
                        </label>
                        <button type="button" className="text-indigo-600 hover:text-indigo-800 font-medium">Forgot Password?</button>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors shadow-md"
                    >
                        Login
                    </button>
                </form>

                {/* Social Login */}
                <div className="mt-8">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button type="button" className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                             <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Google</span>
                        </button>
                        <button type="button" className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <svg className="h-5 w-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Facebook</span>
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button type="button" onClick={onCreateAccount} className="text-indigo-600 hover:text-indigo-800 font-semibold">Create Account</button>
                </div>
            </div>

            {/* Admin Link (Bottom Right) */}
            <div className="absolute bottom-4 right-4 z-0">
                <button 
                    onClick={onViewAdmin}
                    className="text-xs text-gray-400 hover:text-indigo-600 transition-colors bg-white/50 px-2 py-1 rounded"
                >
                    User Database Sheet
                </button>
            </div>

            {/* License Modal - kept if user needs to open it from somewhere else, but button removed */}
            {showLicense && <License onClose={() => setShowLicense(false)} />}
        </div>
    );
};