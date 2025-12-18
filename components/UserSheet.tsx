import React from 'react';

interface UserRow {
    id: number;
    name: string;
    username: string;
    password: string; 
    email: string;
    dateRegistered: string;
}

// Dummy data to populate the sheet
const MOCK_USERS: UserRow[] = [
    { id: 1, name: "Sokha Dara", username: "sokha.d", password: "password123", email: "sokha@example.com", dateRegistered: "2024-01-15 08:30:00" },
    { id: 2, name: "Chan Vithyea", username: "chan.v", password: "securePass!", email: "chan@example.com", dateRegistered: "2024-02-20 14:15:00" },
    { id: 3, name: "Keo Bopha", username: "bopha.k", password: "mysecretcode", email: "bopha@example.com", dateRegistered: "2024-03-10 09:45:00" },
];

interface UserSheetProps {
    onBack: () => void;
}

export const UserSheet: React.FC<UserSheetProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-indigo-700">User Login Sheet</h1>
                        <p className="text-gray-500 text-sm">Database Record View</p>
                    </div>
                    <button 
                        onClick={onBack}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        &larr; Back to Login
                    </button>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-indigo-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-indigo-800 uppercase tracking-wider border-r border-indigo-100">
                                        A1. No
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-indigo-800 uppercase tracking-wider border-r border-indigo-100">
                                        B1. Name
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-indigo-800 uppercase tracking-wider border-r border-indigo-100">
                                        C1. User
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-indigo-800 uppercase tracking-wider border-r border-indigo-100">
                                        D1. Password
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-indigo-800 uppercase tracking-wider border-r border-indigo-100">
                                        E1. Email
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-indigo-800 uppercase tracking-wider">
                                        F1. Date Register Account
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {MOCK_USERS.map((user, index) => (
                                    <tr key={user.id} className="hover:bg-indigo-50/30 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-100">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-100">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-100">
                                            {user.username}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono border-r border-gray-100">
                                            {user.password}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 border-r border-gray-100">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.dateRegistered}
                                        </td>
                                    </tr>
                                ))}
                                {/* Empty rows for spreadsheet look */}
                                {[...Array(8)].map((_, i) => (
                                    <tr key={`empty-${i}`} className="hover:bg-gray-50/50">
                                        <td className="px-6 py-4 border-r border-gray-100 text-gray-300 text-sm">{MOCK_USERS.length + i + 1}</td>
                                        <td className="px-6 py-4 border-r border-gray-100"></td>
                                        <td className="px-6 py-4 border-r border-gray-100"></td>
                                        <td className="px-6 py-4 border-r border-gray-100"></td>
                                        <td className="px-6 py-4 border-r border-gray-100"></td>
                                        <td className="px-6 py-4"></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-xs text-gray-500 flex justify-between">
                        <span>Showing {MOCK_USERS.length} records</span>
                        <span>Sheet: User_Login_Data_v1</span>
                    </div>
                </div>
            </div>
        </div>
    );
};