import React from 'react';

export const Home: React.FC = () => {
    return (
        <div className="mt-10 p-10 bg-white rounded-xl shadow border border-dashed border-gray-300 text-center animate-fade-in">
            <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 uppercase tracking-wide">HOME & UPDATES</h2>
            <p className="text-xl text-gray-500 font-medium font-siemreap">Coming soon. Stay tuned for the latest announcements!</p>
        </div>
    );
};