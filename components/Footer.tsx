import React from 'react';

export const Footer: React.FC = () => {
    return (
        <div className="w-full">
             <div className="py-4 bg-green-50 border-t border-b border-green-100 overflow-hidden w-full relative">
                <div className="animate-[marquee_45s_linear_infinite] whitespace-nowrap inline-block min-w-full text-xl font-siemreap font-black text-green-800">
                    កម្មវិធីនេះមានប្រយោជន៍ខ្លាំងណាស់ ព្រោះវាអាចជួយអ្នកដោះស្រាយតម្រូវការរបស់អតិថិជនបានយ៉ាងឆាប់រហ័ស ដូចជា៖ &nbsp;
                    <span className="text-blue-600 px-4">|</span> រូបថតឯកសាររហ័ស (ID Photo): ប្តូរផ្ទៃខាងក្រោយទៅជាពណ៌ស ពណ៌ខៀវ (Blue) ឬពណ៌ផ្សេងៗទៀតភ្លាមៗ។ &nbsp;
                    <span className="text-blue-600 px-4">|</span> រូបថតផ្លាស់ប្តូរឯកសណ្ឋាន: ផ្លាស់ប្តូរអាវយឺត ឬអាវធម្មតា ទៅជាអាវធំ អាវសិស្ស ឬអាវការិយាល័យប្រកបដោយវិជ្ជាជីវៈ។ &nbsp;
                    <span className="text-blue-600 px-4">|</span> ការបង្កើនគុណភាពរូបភាព: ប្រើមុខងារ Unblur Images ដើម្បីធ្វើឱ្យរូបថតដែលព្រិលៗ ឬមានគ្រាប់ (Noise) ក្លាយជាច្បាស់ និងភ្លឺថ្លា ល្អឥតខ្ចោះសម្រាប់បោះពុម្ពគុណភាពខ្ពស់ (600 DPI)។
                    &nbsp; • &nbsp;
                </div>
            </div>
            
            <footer className="bg-gray-900 text-white py-12 px-6 md:px-12 w-full">
                <div className="w-full">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-12 border-b border-gray-800 pb-12 mb-10">
                        <div className="flex-grow">
                            <p className="text-3xl md:text-5xl font-moul mb-4 text-indigo-300">
                                យូណាន ថតរូប និងបោះពុម្ភ
                            </p>
                            <p className="text-lg md:text-xl font-siemreap text-gray-400 font-medium">
                                រីករាយនឹងសេវាកម្មថតរូប និងផ្តិតរូបប្រកបដោយគុណភាពខ្ពស់ សម្រាប់ឯកសារ និងអាជីវកម្មរបស់អ្នក។
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-12 lg:flex-nowrap">
                            <div className="min-w-[150px]">
                                <p className="text-xs text-indigo-400 font-black uppercase tracking-[0.3em] mb-3">Service Hours</p>
                                <p className="text-lg font-bold">Mon - Sun</p>
                                <p className="text-base text-gray-300">7:30 AM - 6:00 PM</p>
                            </div>
                            <div className="min-w-[200px]">
                                <p className="text-xs text-indigo-400 font-black uppercase tracking-[0.3em] mb-3">Support Channel</p>
                                <p className="text-lg font-bold">rin.chamnan16@gmail.com</p>
                                <p className="text-base text-gray-300">+855 93 880 988</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-sans gap-6">
                        <p className="font-medium">&copy; 2025 YouNan Photography and Printing. All Rights Reserved.</p>
                        <div className="flex flex-wrap gap-8 justify-center">
                            <a href="#" className="hover:text-indigo-300 transition-colors font-bold uppercase tracking-widest text-[10px]">Privacy Policy</a>
                            <a href="#" className="hover:text-indigo-300 transition-colors font-bold uppercase tracking-widest text-[10px]">Terms of Service</a>
                            <a href="#" className="hover:text-indigo-300 transition-colors font-bold uppercase tracking-widest text-[10px]">Contact Admin</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};