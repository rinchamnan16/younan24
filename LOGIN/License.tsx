import React, { useState } from 'react';

interface LicenseProps {
    onClose: () => void;
}

interface Plan {
    id: string;
    title: string;
    price: string;
    duration: string;
    description: string;
    qrId?: string; // Google Drive File ID
    isFree?: boolean;
    color: string;
}

const PLANS: Plan[] = [
    {
        id: 'free',
        title: 'Free Trial',
        price: 'Free',
        duration: '10 Images',
        description: 'Try out the features with 10 free generations.',
        isFree: true,
        color: 'bg-gray-100 border-gray-200'
    },
    {
        id: '1month',
        title: 'Monthly Plan',
        price: '$5.00',
        duration: '32 Days',
        description: 'Full access for 1 month.',
        qrId: '1K9-csWsM3n1daMvQ3rPwfit8wEoPRQdW',
        color: 'bg-blue-50 border-blue-200'
    },
    {
        id: '3months',
        title: 'Quarterly Plan',
        price: '$15.00',
        duration: '95 Days',
        description: 'Save more with 3 months access.',
        qrId: '1vtxJUxEdXmzeU-VlxysWb7WEqdfG_2OY',
        color: 'bg-indigo-50 border-indigo-200'
    },
    {
        id: '6months',
        title: 'Semi-Annual Plan',
        price: '$25.00',
        duration: '185 Days',
        description: 'Great value for 6 months.',
        qrId: '1n58Gz6fWimGo7A1gCVgkr3EXCPjQNBxM',
        color: 'bg-purple-50 border-purple-200'
    },
    {
        id: '1year',
        title: 'Annual Plan',
        price: '$50.00',
        duration: '380 Days',
        description: 'Best value! Access for a full year.',
        qrId: '1utip9_ACRN2J0O6pEgt3BhHlKAWvfVU5',
        color: 'bg-yellow-50 border-yellow-200'
    }
];

export const License: React.FC<LicenseProps> = ({ onClose }) => {
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    // Mock count for free plan
    const freeCount = 10; 

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col relative">
                
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">License & Pricing</h2>
                        <p className="text-gray-500 text-sm">Choose a plan that suits your needs</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PLANS.map((plan) => (
                        <div 
                            key={plan.id} 
                            className={`rounded-xl border-2 p-6 flex flex-col justify-between transition-all hover:shadow-md ${plan.color} ${selectedPlan?.id === plan.id ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}`}
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-lg text-gray-800">{plan.title}</h3>
                                    <span className="px-3 py-1 bg-white rounded-full text-sm font-bold shadow-sm">{plan.price}</span>
                                </div>
                                <p className="text-3xl font-bold text-gray-900 mb-2">{plan.duration}</p>
                                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                            </div>

                            {plan.isFree ? (
                                <div className="mt-auto">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                                    </div>
                                    <p className="text-xs text-center text-gray-500 mb-4">Remaining: {freeCount} / 10</p>
                                    <button className="w-full py-2 bg-gray-800 text-white rounded-lg font-medium cursor-default">
                                        Active (Default)
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => setSelectedPlan(plan)}
                                    className="w-full py-2 bg-white border border-gray-300 text-gray-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 rounded-lg font-medium transition-colors mt-auto"
                                >
                                    View Payment QR
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* QR Modal Overlay */}
                {selectedPlan && !selectedPlan.isFree && (
                    <div className="absolute inset-0 z-20 bg-white/95 flex flex-col items-center justify-center p-8 animate-fade-in">
                        <button 
                            onClick={() => setSelectedPlan(null)}
                            className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                        >
                             <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>

                        <h3 className="text-2xl font-bold mb-2 text-gray-900">Scan to Pay</h3>
                        <p className="text-lg text-indigo-600 font-bold mb-6">{selectedPlan.title} - {selectedPlan.price}</p>
                        
                        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 mb-6">
                            {/* Using Google Drive Thumbnail API for image */}
                            <img 
                                src={`https://drive.google.com/thumbnail?id=${selectedPlan.qrId}&sz=w1000`}
                                alt="Payment QR Code"
                                className="w-64 h-auto object-contain rounded-lg"
                            />
                        </div>

                        <p className="text-gray-500 text-sm max-w-md text-center mb-6">
                            Please scan the QR code with your banking app (KHQR). <br/> 
                            After payment, please contact Admin via Telegram to activate your {selectedPlan.duration} plan.
                        </p>
                        
                        <div className="flex gap-4">
                             <a 
                                href={`https://drive.google.com/file/d/${selectedPlan.qrId}/view?usp=sharing`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                            >
                                Open Image Link
                            </a>
                            <button 
                                onClick={() => setSelectedPlan(null)}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};