import React from 'react';

export const AboutUs: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 border border-slate-200 animate-fade-in mt-6">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-moul text-indigo-800 mb-4">អំពីយើង (About Us)</h2>
                <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-800 border-b pb-4">ទំនាក់ទំនង (Contact)</h3>
                    
                    <div className="flex items-start space-x-4 group">
                        <div className="p-3 bg-green-100 rounded-lg text-green-600 group-hover:bg-green-200 transition-colors">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 text-lg">Smart & Cellcard</p>
                            <p className="text-lg text-gray-600 font-mono">093 880 988</p>
                            <p className="text-lg text-gray-600 font-mono">061 880 988</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4 group">
                        <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600 group-hover:bg-yellow-200 transition-colors">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 text-lg">EMAIL</p>
                            <p className="text-lg text-gray-600 font-mono">rin.chamnan16@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4 group">
                        <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600 group-hover:bg-yellow-200 transition-colors">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 text-lg">Telegram</p>
                            <p className="text-lg text-gray-600 font-mono">
                                <a 
                                    href="https://t.me/rinchamnan16" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline transition-colors"
                                >ADMIN
                                </a>
                            </p>
                        </div>
                    </div>
                     <div className="flex items-start space-x-4 group">
                        <div className="p-3 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-200 transition-colors">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 text-lg">Telegram Group</p>
                            <p className="text-lg text-gray-600 font-mono">
                                <a 
                                    href="https://t.me/YNPhotoEditorApp" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline transition-colors"
                                >
                                    YN PHOTO EDITOR
                                </a>
                            </p>
                        </div>
                    </div>
                     <div className="flex items-start space-x-4 group">
                        <div className="p-3 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-200 transition-colors">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 text-lg">អាសយដ្ឋាន (Address)</p>
                            <p className="text-gray-600 leading-relaxed font-siemreap text-lg">
                                ទល់មុខវិទ្យាល័យហ៊ុន សែន បាត់ដឹង ក្នុងភូមិបាត់ដឹង សង្កាត់ក្សេមក្សាន្ត ក្រុងឧដុង្គម៉ែជ័យ ខេត្តកំពង់ស្ពឺ
                            </p>
                        </div>
                    </div>
                </div>

                {/* Services */}
                <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-800 border-b pb-4">សេវាកម្មរបស់យើង (Services)</h3>
                    <ul className="space-y-4">
                        {[
                            "ថតរូប និងផ្តិតរូប (Photography & Printing)",
                            "ថតរូបបិតកាត (ID Photos)",
                            "ថតចំលងឯកសារ (Photocopy - B&W/Color)",
                            "បោះពុម្ពធៀបការ និងធៀបបុណ្យ (Wedding & Event Invitations)",
                            "ធ្វើត្រាឈ្មោះ និងនាមប័ណ្ណ (Rubber Stamps & Name Cards)",
                            "វាយអត្ថបទ និងស្គេន (Typing & Scanning)",
                            "លក់សម្ភារៈសិក្សា និងការិយាល័យ (Stationery & Office Supplies)"
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-center text-gray-700 bg-gray-50 p-4 rounded-lg hover:bg-indigo-50 hover:shadow-sm transition-all font-siemreap">
                                <span className="p-1 bg-indigo-100 rounded-full mr-3 text-indigo-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Visual Footer for About Us */}
            <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                 <p className="text-gray-500 italic">"Providing high-quality photography and printing services for our community."</p>
            </div>
        </div>
    );
};