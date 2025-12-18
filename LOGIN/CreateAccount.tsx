import React, { useState, useEffect } from 'react';

const APP_LOGO = "https://lh3.google.com/u/0/d/1bPV5-2nb1T59K7MHfjDEflFl3mF32Y2c=w1024-h1024-iv1?auditContext=forDisplay";

interface CreateAccountProps {
    onBackToLogin: () => void;
    onRegisterSuccess: () => void;
}

type RegisterMode = 'standard' | 'google' | 'facebook';

export const CreateAccount: React.FC<CreateAccountProps> = ({ onBackToLogin, onRegisterSuccess }) => {
    const [mode, setMode] = useState<RegisterMode>('standard');
    
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        user: '',
        password: '',
        email: '',
        emailCode: '',
        phone: '',
        phoneCode: '',
    });

    // Mock "Auto-fill" when switching modes
    useEffect(() => {
        if (mode === 'google') {
            setFormData(prev => ({ ...prev, name: 'Google User (Auto)', user: 'google_user_01', email: 'user@gmail.com' }));
        } else if (mode === 'facebook') {
            setFormData(prev => ({ ...prev, name: 'Facebook User (Auto)', user: 'fb_user_99' }));
        } else {
            setFormData({ name: '', user: '', password: '', email: '', emailCode: '', phone: '', phoneCode: '' });
        }
    }, [mode]);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate registration
        alert(`Account created successfully via ${mode} mode! \n(Data would be sent to Google Sheet)`);
        onRegisterSuccess();
    };

    const renderInput = (label: string, field: keyof typeof formData, type: string = 'text', placeholder: string = '', readOnly: boolean = false) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                required={!readOnly}
                readOnly={readOnly}
                className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all ${readOnly ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'}`}
                placeholder={placeholder}
                value={formData[field]}
                onChange={(e) => handleChange(field as string, e.target.value)}
            />
        </div>
    );

    const renderInputWithCode = (label: string, field: keyof typeof formData, codeField: keyof typeof formData, placeholder: string) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="flex gap-2 mb-2">
                <input
                    type="text"
                    required
                    className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder={placeholder}
                    value={formData[field]}
                    onChange={(e) => handleChange(field as string, e.target.value)}
                />
                <button type="button" className="px-4 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-lg text-sm whitespace-nowrap hover:bg-indigo-100">
                    Get Code
                </button>
            </div>
            <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder={`Enter code sent to ${label.toLowerCase()}`}
                value={formData[codeField]}
                onChange={(e) => handleChange(codeField as string, e.target.value)}
            />
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-indigo-50 my-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <img src={APP_LOGO} alt="Logo" className="w-16 h-16 object-contain rounded-full border-2 border-indigo-50" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
                    <p className="text-gray-500 text-sm">Register to YouNan Photography</p>
                </div>

                {/* Mode Selectors */}
                <div className="flex justify-center gap-4 mb-8">
                     <button 
                        onClick={() => setMode('standard')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${mode === 'standard' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        Standard
                    </button>
                    <button 
                        onClick={() => setMode('google')}
                        className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${mode === 'google' ? 'bg-red-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                         <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
                        Google
                    </button>
                    <button 
                        onClick={() => setMode('facebook')}
                        className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${mode === 'facebook' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        Facebook
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="animate-fade-in">
                    
                    {/* Standard Registration Fields */}
                    {mode === 'standard' && (
                        <>
                            {renderInput("Name", "name", "text", "Full Name")}
                            {renderInput("User", "user", "text", "Username")}
                            {renderInput("Password", "password", "password", "Strong Password")}
                            {renderInputWithCode("Email", "email", "emailCode", "example@email.com")}
                            {renderInputWithCode("Phone Number", "phone", "phoneCode", "012 345 678")}
                        </>
                    )}

                    {/* Google Registration Fields */}
                    {mode === 'google' && (
                        <div className="space-y-4">
                             <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-red-700 text-sm mb-4">
                                Continue with Google: Completing profile details.
                            </div>
                            {renderInput("Name", "name", "text", "Auto Name from Google", true)}
                            {renderInput("User", "user", "text", "Auto User or Create new")}
                            {renderInput("Password", "password", "password", "Create Password")}
                            {renderInputWithCode("Email", "email", "emailCode", "Confirm Code")}
                            {renderInputWithCode("Phone Number", "phone", "phoneCode", "Confirm Code")}
                        </div>
                    )}

                    {/* Facebook Registration Fields */}
                    {mode === 'facebook' && (
                        <div className="space-y-4">
                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-blue-700 text-sm mb-4">
                                Continue with Facebook: Completing profile details.
                            </div>
                            {renderInput("Name", "name", "text", "Auto Name from Facebook", true)}
                            {renderInput("User", "user", "text", "Auto User or Create new")}
                            {renderInput("Password", "password", "password", "Create Password")}
                             {/* Specific "Confirm Code one" request for Facebook section */}
                             <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmation</label>
                                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-blue-500" placeholder="Confirm Code one" />
                            </div>
                            {renderInput("Email", "email", "email", "example@email.com")}
                            {renderInput("Phone Number", "phone", "text", "Phone Number")}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        className={`w-full font-bold py-3 rounded-lg transition-colors shadow-md mt-6 ${
                            mode === 'google' ? 'bg-red-600 hover:bg-red-700 text-white' :
                            mode === 'facebook' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                            'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }`}
                    >
                        Complete Registration
                    </button>

                     <p className="text-xs text-center text-gray-400 mt-4">
                        Data will be synced to <a href="https://docs.google.com/spreadsheets/d/1mwqpUDSNSH-mMKa6F5DiaJZTtcpKQHAObKUwlV5wWqc/edit?usp=sharing" target="_blank" rel="noreferrer" className="text-indigo-500 underline">Google Sheets Database</a>
                    </p>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                    <button onClick={onBackToLogin} className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold">
                        Already have an account? Login
                    </button>
                </div>
            </div>
        </div>
    );
};