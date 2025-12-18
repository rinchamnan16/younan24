import React from 'react';
import { AppSettings } from '../types';

const LOGO_LEFT = "https://lh3.google.com/u/0/d/1bPV5-2nb1T59K7MHfjDEflFl3mF32Y2c=w1024-h1024-iv1?auditContext=forDisplay";
const DEFAULT_PROFILE = "https://lh3.google.com/u/0/d/1bPV5-2nb1T59K7MHfjDEflFl3mF32Y2c=w1024-h1024-iv1?auditContext=forDisplay";

interface HeaderProps {
    onNavigate?: (view: string) => void;
    currentView?: string;
    settings?: AppSettings;
    licenseExpiry?: string;
    onOpenLicense?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentView, settings, licenseExpiry, onOpenLicense }) => {
    
    // Default values if settings are not loaded yet
    const titleKh = settings?.titleKh || "យូណាន ថតរូប និងបោះពុម្ភ";
    const titleEn = settings?.titleEn || "YouNan Photography and Printing";
    const description = settings?.description || "ថតចំលងឯកសារគ្រប់ប្រភេទ (ស-ខ្មៅ និងពណ៏ធម្មជាតិ) ថតរូប ថតរូបបិតកាតផ្តិតរូប។\nទទួលបោះពុម្ពធៀបការ ធៀបបុណ្យ ឡើងផ្ទះ ខួបកំណើត ធ្វើត្រាឈ្មោះ នាមប័ណ្ណវិក័យប័ត្រ។\nទទួលវាយអត្ថបទ ស្គេន ព្រីន អ៊ុតរឹង និងមានលក់សម្ភារៈសិក្សា ការិយាល័យគ្រប់ប្រភេទ។";
    const phoneScroll = settings?.phoneScroll || "Smart: 093 880988 , 081 880988     Cellcard: 061 880988";
    const addressScroll = settings?.addressScroll || "អាសយដ្ឋានទល់មុខវិទ្យាល័យហ៊ុន សែន បាត់ដឹង ក្នុងភូមិបាត់ដឹង សង្កាត់ក្សេមក្សាន្ត ក្រុងឧដុង្គម៉ែជ័យ ខេត្តកំពង់ស្ពឺ";
    const isDark = settings?.theme === 'dark';

    // Profile Image & Name
    const profileImage = settings?.profileImage || DEFAULT_PROFILE;
    const profileName = settings?.profileName || "YouNan Admin";

    // Styles for text (using settings color or fallback to theme defaults via hex)
    const titleKhStyle = { color: settings?.titleKhColor || (isDark ? '#a5b4fc' : '#4338ca') };
    const titleEnStyle = { color: settings?.titleEnColor || (isDark ? '#ffffff' : '#111827') };
    const descriptionStyle = { color: settings?.descriptionColor || (isDark ? '#fca5a5' : '#b91c1c') };
    const phoneScrollStyle = { color: settings?.phoneScrollColor || (isDark ? '#fca5a5' : '#b91c1c') };
    const addressScrollStyle = { color: settings?.addressScrollColor || (isDark ? '#93c5fd' : '#b91c1c') };


    // Helper to style active button
    const getButtonClass = (viewName: string) => {
        const isActive = currentView === viewName;
        const baseClass = "font-bold py-3 px-4 rounded-lg shadow-sm transition-all duration-200 font-sans tracking-wide transform hover:-translate-y-0.5 border-2 text-center w-full";
        
        if (isActive) {
            return `${baseClass} bg-gradient-to-r from-indigo-600 to-indigo-700 border-indigo-600 text-white shadow-md ring-2 ring-indigo-200 ring-offset-2`;
        }
        
        if (isDark) {
             return `${baseClass} bg-gray-800 border-gray-600 hover:border-indigo-400 hover:bg-gray-700 text-white`;
        }

        return `${baseClass} bg-white border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50 text-indigo-800`;
    };

    const handleNav = (view: string) => {
        if (onNavigate) onNavigate(view);
    };

    // Helper to render description with line breaks
    const renderDescription = () => {
        return description.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                {index < description.split('\n').length - 1 && " "}
            </React.Fragment>
        ));
    };

    return (
        <div className={`w-full border-b transition-colors z-50 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-slate-100'}`}>
            <header className="px-6 py-6 md:px-12 flex flex-col md:flex-row items-center justify-between w-full gap-8">
                {/* Left Logo (Static App Logo) */}
                <div className="flex-shrink-0">
                    <img
                        src={LOGO_LEFT}
                        alt="App Logo"
                        className="w-24 h-24 md:w-36 md:h-36 object-contain rounded-full border-4 border-indigo-100 shadow-xl mb-4 md:mb-0"
                    />
                </div>

                {/* Center Text - Spanning Available Space */}
                <div className="flex flex-col text-center px-4 flex-grow">
                    <p className="text-3xl md:text-6xl font-moul mb-2 md:mb-3 leading-tight" style={titleKhStyle}>
                        {titleKh}
                    </p>

                    <h1 className="text-xl md:text-4xl font-black mb-3 md:mb-5 font-sans tracking-tight" style={titleEnStyle}>
                        {titleEn}
                    </h1>

                    <p className="text-sm md:text-xl font-siemreap font-bold leading-relaxed" style={descriptionStyle}>
                        {renderDescription()}
                    </p>
                </div>

                {/* Right Logo (User Profile & Name) */}
                <div 
                    className="flex flex-col items-center mt-4 md:mt-0 cursor-pointer group flex-shrink-0"
                    onClick={() => handleNav('setting')}
                >
                    <img
                        src={profileImage}
                        alt="User Profile"
                        className="w-24 h-24 md:w-36 md:h-36 object-cover rounded-full border-4 border-indigo-100 shadow-xl group-hover:ring-4 group-hover:ring-indigo-300 transition-all duration-300"
                    />
                    <span className={`mt-3 font-black text-lg px-4 py-1.5 rounded-xl transition-all font-sans ${isDark ? 'text-gray-200 group-hover:bg-gray-800' : 'text-gray-800 group-hover:bg-indigo-50 group-hover:text-indigo-700 shadow-sm'}`}>
                        {profileName}
                    </span>
                </div>
            </header>

            {/* Sub-Header Area */}
            <div className="w-full px-6 md:px-12 pb-6">
                {/* License Countdown & Button */}
                <div className="flex justify-center md:justify-end items-center gap-4 mb-6 animate-fade-in">
                    {licenseExpiry && (
                        <span className={`text-sm md:text-base font-black px-5 py-2 rounded-full shadow-sm border inline-flex items-center gap-2 transition-all transform hover:scale-105 ${
                            licenseExpiry.includes('Free') 
                                ? 'bg-indigo-100 text-indigo-700 border-indigo-200' 
                                : licenseExpiry.includes('0') || licenseExpiry.toLowerCase().includes('expire')
                                    ? 'bg-red-100 text-red-700 border-red-200'
                                    : 'bg-green-100 text-green-700 border-green-200'
                        }`}>
                            <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                            {licenseExpiry}
                        </span>
                    )}
                    <button
                        onClick={onOpenLicense}
                        className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 text-xs md:text-sm font-black px-6 py-2 rounded-full shadow-lg border-2 border-yellow-200 transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap uppercase tracking-widest"
                    >
                        Buy License
                    </button>
                </div>

                {/* Marquee Row */}
                <div className="flex flex-col gap-3 mb-8">
                    <div className={`py-3 rounded-2xl shadow-inner border overflow-hidden relative w-full ${isDark ? 'bg-red-900/10 border-red-800' : 'bg-red-50 border-red-100'}`}>
                        <div className="animate-[marquee_25s_linear_infinite] whitespace-nowrap inline-block w-full text-xl md:text-3xl font-black font-siemreap tracking-wider" style={phoneScrollStyle}>
                            {phoneScroll} &nbsp; • &nbsp; {phoneScroll} &nbsp; • &nbsp; {phoneScroll}
                        </div>
                    </div>
                    <div className={`py-3 rounded-2xl shadow-inner border overflow-hidden relative w-full ${isDark ? 'bg-blue-900/10 border-blue-800' : 'bg-blue-50 border-blue-100'}`}>
                        <div className="animate-[marquee_30s_linear_infinite_reverse] whitespace-nowrap inline-block w-full text-lg md:text-2xl font-black font-siemreap tracking-wider" style={addressScrollStyle}>
                            {addressScroll} &nbsp; • &nbsp; {addressScroll} &nbsp; • &nbsp; {addressScroll}
                        </div>
                    </div>
                </div>

                {/* Navigation Menu - Full width grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 w-full">
                    <button onClick={() => handleNav('home')} className={getButtonClass('home')}>HOME</button>
                    <button onClick={() => handleNav('news')} className={getButtonClass('news')}>POSTVIEW</button>
                    <button onClick={() => handleNav('app')} className={getButtonClass('app')}>PHOTO EDITOR</button>
                    <button onClick={() => handleNav('setting')} className={getButtonClass('setting')}>SETTING</button>
                    <button onClick={() => handleNav('about')} className={getButtonClass('about')}>ABOUT US</button>
                    <button 
                        onClick={() => handleNav('login')} 
                        className={isDark 
                            ? "font-bold py-3 px-4 rounded-lg shadow-sm transition-all duration-200 font-sans tracking-wide transform hover:-translate-y-0.5 border-2 bg-red-900/20 border-red-800 text-red-300 hover:bg-red-900/40 w-full" 
                            : "font-bold py-3 px-4 rounded-lg shadow-sm transition-all duration-200 font-sans tracking-wide transform hover:-translate-y-0.5 border-2 bg-white border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200 w-full"}
                    >
                        LOGOUT
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
};