import React, { useState, useRef } from 'react';
import { AppSettings, ThemeOption } from '../types';

interface SettingProps {
    settings: AppSettings;
    onUpdate: (newSettings: AppSettings) => void;
}

const THEME_OPTIONS: { id: ThemeOption; label: string; class: string }[] = [
    { id: 'light', label: 'White Mode', class: 'bg-white border-gray-200' },
    { id: 'dark', label: 'Black Mode', class: 'bg-gray-900 border-gray-700' },
    { id: 'pink', label: 'Pink Color', class: 'bg-[#ffdbf8] border-pink-200' },
    { id: 'red', label: 'Red Color', class: 'bg-red-100 border-red-200' },
    { id: 'blue', label: 'Blue Color', class: 'bg-blue-100 border-blue-200' },
    { id: 'gray-gradient', label: 'Gray Gradient', class: 'bg-gradient-to-br from-gray-100 to-gray-400 border-gray-300' },
    { id: 'pink-gradient', label: 'Pink Gradient', class: 'bg-gradient-to-br from-pink-100 to-pink-400 border-pink-300' },
    { id: 'red-gradient', label: 'Red Gradient', class: 'bg-gradient-to-br from-red-100 to-red-400 border-red-300' },
    { id: 'christmas', label: 'Christmas', class: 'bg-gradient-to-br from-green-800 to-red-800 border-green-600' },
];

export const Setting: React.FC<SettingProps> = ({ settings, onUpdate }) => {
    // Toggles for sections - ALL CLOSED BY DEFAULT
    const [showProfile, setShowProfile] = useState(false);
    const [showTheme, setShowTheme] = useState(false);
    const [showGeneralInfo, setShowGeneralInfo] = useState(false);
    const [showAccountSecurity, setShowAccountSecurity] = useState(false);

    // Save Loading States
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [isSavingGeneral, setIsSavingGeneral] = useState(false);
    const [isSavingSecurity, setIsSavingSecurity] = useState(false);

    // Profile Data State
    const [profileName, setProfileName] = useState(settings.profileName || 'YouNan Admin');
    const [profileDob, setProfileDob] = useState(settings.profileDob || '1990-01-01');
    const [profileImage, setProfileImage] = useState(settings.profileImage || "https://lh3.google.com/u/0/d/1bPV5-2nb1T59K7MHfjDEflFl3mF32Y2c=w1024-h1024-iv1?auditContext=forDisplay");
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Mock Current User Data
    const [currentEmail, setCurrentEmail] = useState('rin.chamnan16@gmail.com');
    const [currentPhone, setCurrentPhone] = useState('093 880 988');
    const [currentUser, setCurrentUser] = useState('YouNan_Admin');
    const [currentPassword, setCurrentPassword] = useState('younan123');

    // Edit Mode States
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingUser, setIsEditingUser] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    // Password Visibility State
    const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });

    // Form Inputs
    const [newEmail, setNewEmail] = useState('');
    const [emailCode, setEmailCode] = useState('');
    
    const [newPhone, setNewPhone] = useState('');
    const [phoneCode, setPhoneCode] = useState('');

    const [newUsername, setNewUsername] = useState('');
    const [userVerifyMethod, setUserVerifyMethod] = useState<'email' | 'phone'>('email');
    const [userCode, setUserCode] = useState('');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passVerifyMethod, setPassVerifyMethod] = useState<'email' | 'phone'>('email');
    const [passwordCode, setPasswordCode] = useState('');

    const handleChange = (field: keyof AppSettings, value: string) => {
        onUpdate({ ...settings, [field]: value });
    };

    const handleThemeChange = (theme: ThemeOption) => {
        onUpdate({ ...settings, theme });
    };

    const simulateAction = (message: string) => {
        alert(message);
    };

    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfileImage(URL.createObjectURL(file));
        }
    };

    const handleSaveProfile = () => {
        setIsSavingProfile(true);
        setTimeout(() => {
            setIsSavingProfile(false);
            onUpdate({
                ...settings,
                profileImage: profileImage,
                profileName: profileName,
                profileDob: profileDob
            });
            alert(`Profile Information has been saved updated successfully!`);
        }, 1500);
    };

    const handleSaveGeneral = () => {
        setIsSavingGeneral(true);
        setTimeout(() => {
            setIsSavingGeneral(false);
            alert(`General Information has been saved and updated successfully!`);
        }, 1500);
    };

    const handleSaveSecurity = () => {
        setIsSavingSecurity(true);
        setTimeout(() => {
            setIsSavingSecurity(false);
            alert(`Account Security Settings have been saved and updated successfully!`);
        }, 1500);
    };

    const handleUpdateEmail = () => {
        if(newEmail && emailCode) {
            setCurrentEmail(newEmail);
            setIsEditingEmail(false);
            setNewEmail('');
            setEmailCode('');
            alert('Email updated successfully!');
        } else {
            alert('Please enter email and verification code');
        }
    };

    const handleUpdatePhone = () => {
        if(newPhone && phoneCode) {
            setCurrentPhone(newPhone);
            setIsEditingPhone(false);
            setNewPhone('');
            setPhoneCode('');
            alert('Phone number updated successfully!');
        } else {
            alert('Please enter phone and verification code');
        }
    };

    const handleUpdateUsername = () => {
        if(newUsername && userCode) {
            setCurrentUser(newUsername);
            setIsEditingUser(false);
            setNewUsername('');
            setUserCode('');
            alert('Username updated successfully!');
        } else {
            alert('Please enter username and verification code');
        }
    };

    const handleUpdatePassword = () => {
        if (newPassword && confirmPassword && passwordCode) {
            if (newPassword !== confirmPassword) {
                alert("New passwords do not match!");
                return;
            }
            setCurrentPassword(newPassword);
            setIsEditingPassword(false);
            setNewPassword('');
            setConfirmPassword('');
            setPasswordCode('');
            alert('Password changed successfully!');
        } else {
            alert('Please fill in all fields including the verification code.');
        }
    };

    const EyeIcon = ({ visible }: { visible: boolean }) => (
        visible ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
            </svg>
        )
    );

    return (
        <div className={`max-w-4xl mx-auto p-6 rounded-xl shadow-lg border mt-6 animate-fade-in ${settings.theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-200 text-gray-800'}`}>
            <h2 className="text-3xl font-bold mb-8 border-b pb-4 border-gray-200">Settings</h2>

            {/* 1. User Profile */}
            <section className={`mb-6 rounded-xl border p-5 transition-all shadow-sm ${settings.theme === 'dark' ? 'border-gray-700 bg-gray-900/40' : 'border-gray-200 bg-gray-50/50'}`}>
                <div 
                    className="flex justify-between items-center cursor-pointer select-none"
                    onClick={() => setShowProfile(!showProfile)}
                >
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        User Profile
                    </h3>
                    <div className={`p-1 rounded-full ${settings.theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                        <svg className={`w-6 h-6 transform transition-transform duration-200 ${showProfile ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>

                {showProfile && (
                    <div className="mt-6 animate-fade-in">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-shrink-0 mx-auto md:mx-0">
                                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-100 shadow-lg">
                                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    </div>
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        accept="image/*" 
                                        className="hidden" 
                                        onChange={handleProfileImageChange}
                                    />
                                </div>
                                <p className="text-xs text-center mt-2 text-gray-500">Tap to change</p>
                            </div>

                            <div className="flex-grow w-full space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-500">Full Name</label>
                                    <input 
                                        type="text" 
                                        value={profileName}
                                        onChange={(e) => setProfileName(e.target.value)}
                                        className={`w-full p-3 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500 ${settings.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-500">Date of Birth</label>
                                    <input 
                                        type="date" 
                                        value={profileDob}
                                        onChange={(e) => setProfileDob(e.target.value)}
                                        className={`w-full p-3 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500 ${settings.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                                    />
                                </div>
                                
                                <div className="pt-2 flex justify-end">
                                    <button 
                                        onClick={handleSaveProfile}
                                        disabled={isSavingProfile}
                                        className={`px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transform hover:-translate-y-0.5 transition-all flex items-center gap-2 ${isSavingProfile ? 'opacity-75 cursor-not-allowed' : ''}`}
                                    >
                                        {isSavingProfile ? 'Saving...' : 'Save Profile'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* 2. Theme */}
            <section className={`mb-6 rounded-xl border p-5 transition-all shadow-sm ${settings.theme === 'dark' ? 'border-gray-700 bg-gray-900/40' : 'border-gray-200 bg-gray-50/50'}`}>
                <div 
                    className="flex justify-between items-center cursor-pointer select-none"
                    onClick={() => setShowTheme(!showTheme)}
                >
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                        Appearance (Theme)
                    </h3>
                    <div className={`p-1 rounded-full ${settings.theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                        <svg className={`w-6 h-6 transform transition-transform duration-200 ${showTheme ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>

                {showTheme && (
                    <div className="mt-6 animate-fade-in">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {THEME_OPTIONS.map((theme) => (
                                <div 
                                    key={theme.id}
                                    onClick={() => handleThemeChange(theme.id)}
                                    className={`cursor-pointer p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                                        settings.theme === theme.id 
                                            ? 'ring-2 ring-offset-2 ring-indigo-500 border-indigo-500' 
                                            : 'border-transparent hover:border-gray-300 shadow-sm'
                                    }`}
                                >
                                    <div className={`w-full h-16 rounded-lg shadow-inner ${theme.class}`}></div>
                                    <span className={`font-medium text-sm ${settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{theme.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* 3. General Information */}
            <section className={`mb-6 rounded-xl border p-5 transition-all shadow-sm ${settings.theme === 'dark' ? 'border-gray-700 bg-gray-900/40' : 'border-gray-200 bg-gray-50/50'}`}>
                <div 
                    className="flex justify-between items-center cursor-pointer select-none"
                    onClick={() => setShowGeneralInfo(!showGeneralInfo)}
                >
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        General Information
                    </h3>
                    <div className={`p-1 rounded-full ${settings.theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                        <svg className={`w-6 h-6 transform transition-transform duration-200 ${showGeneralInfo ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
                
                {showGeneralInfo && (
                    <div className="mt-6 animate-fade-in">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Title Name (Khmer)</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={settings.titleKh}
                                        onChange={(e) => handleChange('titleKh', e.target.value)}
                                        className={`flex-grow p-3 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500 ${settings.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    />
                                    <input 
                                        type="color" 
                                        value={settings.titleKhColor}
                                        onChange={(e) => handleChange('titleKhColor', e.target.value)}
                                        className="h-[50px] w-[50px] p-1 rounded cursor-pointer border border-gray-300"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Title Name (English)</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={settings.titleEn}
                                        onChange={(e) => handleChange('titleEn', e.target.value)}
                                        className={`flex-grow p-3 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500 ${settings.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    />
                                    <input 
                                        type="color" 
                                        value={settings.titleEnColor}
                                        onChange={(e) => handleChange('titleEnColor', e.target.value)}
                                        className="h-[50px] w-[50px] p-1 rounded cursor-pointer border border-gray-300"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <div className="flex gap-2 items-start">
                                    <textarea 
                                        rows={4}
                                        value={settings.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        className={`flex-grow p-3 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500 ${settings.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    />
                                    <input 
                                        type="color" 
                                        value={settings.descriptionColor}
                                        onChange={(e) => handleChange('descriptionColor', e.target.value)}
                                        className="h-[50px] w-[50px] p-1 rounded cursor-pointer border border-gray-300"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button 
                                onClick={handleSaveGeneral}
                                disabled={isSavingGeneral}
                                className={`px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 transform hover:-translate-y-0.5 transition-all flex items-center gap-2 ${isSavingGeneral ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {isSavingGeneral ? 'Saving...' : 'Save & Update'}
                            </button>
                        </div>
                    </div>
                )}
            </section>

            {/* 4. Account Security */}
            <section className={`mb-6 rounded-xl border p-5 transition-all shadow-sm ${settings.theme === 'dark' ? 'border-gray-700 bg-gray-900/40' : 'border-gray-200 bg-gray-50/50'}`}>
                <div 
                    className="flex justify-between items-center cursor-pointer select-none"
                    onClick={() => setShowAccountSecurity(!showAccountSecurity)}
                >
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        Account Security
                    </h3>
                    <div className={`p-1 rounded-full ${settings.theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                        <svg className={`w-6 h-6 transform transition-transform duration-200 ${showAccountSecurity ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
                
                {showAccountSecurity && (
                    <div className="mt-6 animate-fade-in">
                        <div className={`space-y-8 p-6 rounded-xl border ${settings.theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-white border-gray-200'}`}>
                            
                            {/* EMAIL SECTION */}
                            <div className="border-b border-gray-200 pb-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-medium text-lg text-gray-400">Login Email</h4>
                                        <p className={`text-lg font-mono mt-1 ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{currentEmail}</p>
                                    </div>
                                    <button 
                                        onClick={() => setIsEditingEmail(!isEditingEmail)}
                                        className="text-indigo-600 hover:text-indigo-800 font-medium text-sm border border-indigo-200 rounded px-3 py-1 hover:bg-indigo-50 transition-colors"
                                    >
                                        {isEditingEmail ? 'Cancel' : 'Edit'}
                                    </button>
                                </div>

                                {isEditingEmail && (
                                    <div className="mt-4 p-4 bg-gray-50/10 rounded-lg animate-fade-in border border-dashed border-gray-300">
                                        <h5 className="text-sm font-semibold mb-3">Change Email Address</h5>
                                        <div className="flex flex-col md:flex-row gap-4 mb-3">
                                            <input 
                                                type="email" 
                                                placeholder="New Email" 
                                                value={newEmail}
                                                onChange={(e) => setNewEmail(e.target.value)}
                                                className={`flex-grow p-3 rounded-lg border outline-none ${settings.theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
                                            />
                                            <button onClick={() => simulateAction(`Verification code sent to ${newEmail}`)} className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 whitespace-nowrap">Get Code</button>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <input 
                                                type="text" 
                                                placeholder="Verification Code" 
                                                value={emailCode}
                                                onChange={(e) => setEmailCode(e.target.value)}
                                                className={`flex-grow p-3 rounded-lg border outline-none ${settings.theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
                                            />
                                            <button onClick={handleUpdateEmail} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 whitespace-nowrap">Confirm Change</button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* PHONE SECTION */}
                            <div className="border-b border-gray-200 pb-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-medium text-lg text-gray-400">Login Phone</h4>
                                        <p className={`text-lg font-mono mt-1 ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{currentPhone}</p>
                                    </div>
                                    <button 
                                        onClick={() => setIsEditingPhone(!isEditingPhone)}
                                        className="text-indigo-600 hover:text-indigo-800 font-medium text-sm border border-indigo-200 rounded px-3 py-1 hover:bg-indigo-50 transition-colors"
                                    >
                                        {isEditingPhone ? 'Cancel' : 'Edit'}
                                    </button>
                                </div>

                                {isEditingPhone && (
                                    <div className="mt-4 p-4 bg-gray-50/10 rounded-lg animate-fade-in border border-dashed border-gray-300">
                                        <h5 className="text-sm font-semibold mb-3">Change Phone Number</h5>
                                        <div className="flex flex-col md:flex-row gap-4 mb-3">
                                            <input 
                                                type="text" 
                                                placeholder="New Phone Number" 
                                                value={newPhone}
                                                onChange={(e) => setNewPhone(e.target.value)}
                                                className={`flex-grow p-3 rounded-lg border outline-none ${settings.theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
                                            />
                                            <button onClick={() => simulateAction(`Verification code sent to ${newPhone}`)} className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 whitespace-nowrap">Get Code</button>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <input 
                                                type="text" 
                                                placeholder="Verification Code" 
                                                value={phoneCode}
                                                onChange={(e) => setPhoneCode(e.target.value)}
                                                className={`flex-grow p-3 rounded-lg border outline-none ${settings.theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
                                            />
                                            <button onClick={handleUpdatePhone} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 whitespace-nowrap">Confirm Change</button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* USERNAME SECTION */}
                            <div className="border-b border-gray-200 pb-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-medium text-lg text-gray-400">Username</h4>
                                        <p className={`text-lg font-mono mt-1 ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{currentUser}</p>
                                    </div>
                                    <button 
                                        onClick={() => setIsEditingUser(!isEditingUser)}
                                        className="text-indigo-600 hover:text-indigo-800 font-medium text-sm border border-indigo-200 rounded px-3 py-1 hover:bg-indigo-50 transition-colors"
                                    >
                                        {isEditingUser ? 'Cancel' : 'Edit'}
                                    </button>
                                </div>

                                {isEditingUser && (
                                    <div className="mt-4 p-4 bg-gray-50/10 rounded-lg animate-fade-in border border-dashed border-gray-300">
                                        <h5 className="text-sm font-semibold mb-3">Change Username</h5>
                                        <input 
                                            type="text" 
                                            placeholder="New Username" 
                                            value={newUsername}
                                            onChange={(e) => setNewUsername(e.target.value)}
                                            className={`w-full p-3 rounded-lg border outline-none mb-4 ${settings.theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
                                        />
                                        <div className="flex gap-4 mb-4 text-sm">
                                            <label className="flex items-center cursor-pointer"><input type="radio" checked={userVerifyMethod === 'email'} onChange={() => setUserVerifyMethod('email')} className="mr-2" /> Email</label>
                                            <label className="flex items-center cursor-pointer"><input type="radio" checked={userVerifyMethod === 'phone'} onChange={() => setUserVerifyMethod('phone')} className="mr-2" /> Phone</label>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4 mb-3">
                                            <button onClick={() => simulateAction(`Code sent via ${userVerifyMethod}`)} className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Get Code</button>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <input 
                                                type="text" 
                                                placeholder="Verification Code" 
                                                value={userCode}
                                                onChange={(e) => setUserCode(e.target.value)}
                                                className={`flex-grow p-3 rounded-lg border outline-none ${settings.theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
                                            />
                                            <button onClick={handleUpdateUsername} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">Confirm Change</button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* PASSWORD SECTION */}
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-medium text-lg text-gray-400">Password</h4>
                                        <div className="flex items-center gap-3 mt-1">
                                            <p className={`text-lg font-mono ${settings.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                {showPass.current ? currentPassword : '••••••••••••'}
                                            </p>
                                            <button 
                                                onClick={() => setShowPass({ ...showPass, current: !showPass.current })}
                                                className="text-gray-400 hover:text-indigo-600"
                                            >
                                                <EyeIcon visible={showPass.current} />
                                            </button>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setIsEditingPassword(!isEditingPassword)}
                                        className="text-indigo-600 hover:text-indigo-800 font-medium text-sm border border-indigo-200 rounded px-3 py-1 hover:bg-indigo-50 transition-colors"
                                    >
                                        {isEditingPassword ? 'Cancel' : 'Change Password'}
                                    </button>
                                </div>

                                {isEditingPassword && (
                                    <div className="mt-4 p-4 bg-gray-50/10 rounded-lg animate-fade-in border border-dashed border-gray-300 space-y-4">
                                        <h5 className="text-sm font-semibold mb-1">Set New Password</h5>
                                        
                                        <div className="relative">
                                            <input 
                                                type={showPass.new ? 'text' : 'password'} 
                                                placeholder="New Password" 
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className={`w-full p-3 pr-12 rounded-lg border outline-none ${settings.theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
                                            />
                                            <button onClick={() => setShowPass({ ...showPass, new: !showPass.new })} className="absolute right-3 top-3.5 text-gray-400 hover:text-indigo-600">
                                                <EyeIcon visible={showPass.new} />
                                            </button>
                                        </div>

                                        <div className="relative">
                                            <input 
                                                type={showPass.confirm ? 'text' : 'password'} 
                                                placeholder="Confirm New Password" 
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className={`w-full p-3 pr-12 rounded-lg border outline-none ${settings.theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
                                            />
                                            <button onClick={() => setShowPass({ ...showPass, confirm: !showPass.confirm })} className="absolute right-3 top-3.5 text-gray-400 hover:text-indigo-600">
                                                <EyeIcon visible={showPass.confirm} />
                                            </button>
                                        </div>

                                        <div className="flex gap-4 text-sm">
                                            <label className="flex items-center cursor-pointer"><input type="radio" checked={passVerifyMethod === 'email'} onChange={() => setPassVerifyMethod('email')} className="mr-2" /> Verify via Email</label>
                                            <label className="flex items-center cursor-pointer"><input type="radio" checked={passVerifyMethod === 'phone'} onChange={() => setPassVerifyMethod('phone')} className="mr-2" /> Verify via Phone</label>
                                        </div>

                                        <div className="flex flex-col md:flex-row gap-4">
                                            <button onClick={() => simulateAction(`Code sent via ${passVerifyMethod}`)} className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Get Code</button>
                                            <input 
                                                type="text" 
                                                placeholder="Enter Code" 
                                                value={passwordCode}
                                                onChange={(e) => setPasswordCode(e.target.value)}
                                                className={`flex-grow p-3 rounded-lg border outline-none ${settings.theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
                                            />
                                            <button onClick={handleUpdatePassword} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold">Update Password</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button 
                                onClick={handleSaveSecurity}
                                disabled={isSavingSecurity}
                                className={`px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 transform hover:-translate-y-0.5 transition-all flex items-center gap-2 ${isSavingSecurity ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {isSavingSecurity ? 'Saving...' : 'Save & Update'}
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};
