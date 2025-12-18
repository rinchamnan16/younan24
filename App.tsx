import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CoreControls } from './components/CoreControls';
import { ImageDisplay } from './components/ImageDisplay';
import { RefinementControls } from './components/RefinementControls';
import { AspectRatio, BACKGROUND_OPTIONS, UNIFORM_PRESETS, STATE_UNIFORM_OPTIONS, UNBLUR_PROMPT, AppSettings } from './types';
import { generateEditedImage } from './services/geminiService';
import { ImageAdjustments } from './components/RecolorImages';
import { Login } from './LOGIN/Login';
import { UserSheet } from './components/UserSheet';
import { CreateAccount } from './LOGIN/CreateAccount';
import { AboutUs } from './HOME/AboutUs';
import { Home } from './HOME/Home';
import { Setting } from './HOME/Setting';
import { News } from './HOME/News';
import { License } from './LOGIN/License';
import { MargeImagesDisplay } from './components/MargeImagesDisplay';
import { MargeVideoDisplay } from './components/MargeVideoDisplay';
import { AdSidebar } from './components/Advertising';

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<'login' | 'app' | 'home' | 'admin' | 'create-account' | 'about' | 'news' | 'setting'>('login');
    const [appSettings, setAppSettings] = useState<AppSettings>({
        theme: 'light',
        titleKh: 'យូណាន ថតរូប និងបោះពុម្ភ',
        titleKhColor: '#4338ca',
        titleEn: 'YouNan Photography and Printing',
        titleEnColor: '#111827',
        description: 'ថតចំលងឯកសារគ្រប់ប្រភេទ (ស-ខ្មៅ និងពណ៏ធម្មជាតិ) ថតរូប ថតរូបបិតកាតផ្តិតរូប។\nទទួលបោះពុម្ពធៀបការ ធៀបបុណ្យ ឡើងផ្ទះ ខួបកំណើត ធ្វើត្រាឈ្មោះ នាមប័ណ្ណវិក័យប័ត្រ។\nទទួលវាយអត្ថបទ ស្គេន ព្រីន អ៊ុតរឹង និងមានលក់សម្ភារៈសិក្សា ការិយាល័យគ្រប់ប្រភេទ។',
        descriptionColor: '#b91c1c',
        phoneScroll: 'Smart: 093 880988 , 081 880988     Cellcard: 061 880988',
        phoneScrollColor: '#b91c1c',
        addressScroll: 'អាសយដ្ឋានទល់មុខវិទ្យាល័យហ៊ុន សែន បាត់ដឹង ក្នុងភូមិបាត់ដឹង សង្កាត់ក្សេមក្សាន្ត ក្រុងឧដុង្គម៉ែជ័យ ខេត្តកំពង់ស្ពឺ',
        addressScrollColor: '#b91c1c',
        profileImage: "https://lh3.google.com/u/0/d/1bPV5-2nb1T59K7MHfjDEflFl3mF32Y2c=w1024-h1024-iv1?auditContext=forDisplay",
        profileName: 'YouNan Admin',
        profileDob: '1990-01-01'
    });

    const [licenseExpiry, setLicenseExpiry] = useState<string>("License: 32 Days Remaining");
    const [showLicense, setShowLicense] = useState(false);

    useEffect(() => {
        document.body.style.backgroundImage = 'none';
        switch (appSettings.theme) {
            case 'dark': document.body.style.backgroundColor = '#111827'; document.body.style.color = '#ffffff'; break;
            case 'pink': document.body.style.backgroundColor = '#ffdbf8'; document.body.style.color = '#000000'; break;
            case 'red': document.body.style.backgroundColor = '#fee2e2'; document.body.style.color = '#000000'; break;
            case 'blue': document.body.style.backgroundColor = '#dbeafe'; document.body.style.color = '#000000'; break;
            case 'gray-gradient': document.body.style.backgroundImage = 'linear-gradient(to bottom right, #f3f4f6, #9ca3af)'; document.body.style.color = '#000000'; break;
            case 'pink-gradient': document.body.style.backgroundImage = 'linear-gradient(to bottom right, #fce7f3, #f472b6)'; document.body.style.color = '#000000'; break;
            case 'red-gradient': document.body.style.backgroundImage = 'linear-gradient(to bottom right, #fee2e2, #ef4444)'; document.body.style.color = '#000000'; break;
            case 'christmas': document.body.style.backgroundImage = 'linear-gradient(135deg, #14532d, #b91c1c)'; document.body.style.color = '#ffffff'; break;
            default: document.body.style.backgroundColor = '#ffffff'; document.body.style.color = '#000000'; break;
        }
    }, [appSettings.theme]);

    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [uploadedImageSrc, setUploadedImageSrc] = useState<string | null>(null);
    const [uploadedImageBase64, setUploadedImageBase64] = useState<string | null>(null);
    const [generatedImageSrc, setGeneratedImageSrc] = useState<string | null>(null);
    const [originalAspectRatioValue, setOriginalAspectRatioValue] = useState<string>('3/2');
    const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('2x3');
    const [selectedBackgroundId, setSelectedBackgroundId] = useState<string>('white');
    const [selectedUniformId, setSelectedUniformId] = useState<string>('none');
    const [selectedStateUniformId, setSelectedStateUniformId] = useState<string>('none');
    const [promptText, setPromptText] = useState<string>('');
    const [adjustments, setAdjustments] = useState<ImageAdjustments>({
        brightness: 100, contrast: 100, exposure: 0, highlights: 0, shadows: 0, whites: 0, blacks: 0, texture: 0, clarity: 0, dehaze: 0
    });
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const updatePrompt = useCallback((bgId: string, uniformId: string, stateId: string) => {
        const bgOption = BACKGROUND_OPTIONS.find(o => o.id === bgId);
        let uniformPrompt = "";
        if (stateId !== 'none') {
            const opt = STATE_UNIFORM_OPTIONS.find(o => o.id === stateId);
            if (opt) uniformPrompt = opt.prompt;
        } else {
            const opt = UNIFORM_PRESETS.find(o => o.id === uniformId);
            if (opt) uniformPrompt = opt.prompt;
        }
        let newPrompt = "";
        if (bgOption?.prompt) newPrompt += bgOption.prompt + " ";
        if (uniformPrompt) newPrompt += uniformPrompt;
        setPromptText(newPrompt.trim());
    }, []);

    useEffect(() => {
        updatePrompt(selectedBackgroundId, selectedUniformId, selectedStateUniformId);
    }, [updatePrompt, selectedBackgroundId, selectedUniformId, selectedStateUniformId]);

    const handleFileUpload = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            setErrorMessage("Please upload a valid image (JPG or PNG).");
            return;
        }
        setErrorMessage(null);
        setSuccessMessage(null);
        setUploadedFile(file);
        setAdjustments({ brightness: 100, contrast: 100, exposure: 0, highlights: 0, shadows: 0, whites: 0, blacks: 0, texture: 0, clarity: 0, dehaze: 0 });
        const objectUrl = URL.createObjectURL(file);
        setUploadedImageSrc(objectUrl);
        setGeneratedImageSrc(null);
        const img = new Image();
        img.onload = () => { setOriginalAspectRatioValue(`${img.width} / ${img.height}`); };
        img.src = objectUrl;
        const reader = new FileReader();
        reader.onloadend = () => { setUploadedImageBase64((reader.result as string).split(',')[1]); };
        reader.readAsDataURL(file);
    };

    const handleBackgroundChange = (id: string) => { setSelectedBackgroundId(id); };
    const handleUniformChange = (id: string) => { setSelectedUniformId(id); setSelectedStateUniformId('none'); };
    const handleStateUniformChange = (id: string) => { setSelectedStateUniformId(id); setSelectedUniformId('none'); };

    const callGenerateAPI = async (prompt: string, successMsg: string) => {
        if (!uploadedImageBase64 || !uploadedFile) {
            setErrorMessage("Please upload an image first.");
            return;
        }
        setIsGenerating(true);
        setErrorMessage(null);
        setSuccessMessage(null);
        try {
            const generatedBase64 = await generateEditedImage(uploadedImageBase64, uploadedFile.type, prompt);
            setGeneratedImageSrc(`data:image/png;base64,${generatedBase64}`);
            setSuccessMessage(successMsg);
            setAdjustments({ brightness: 100, contrast: 100, exposure: 0, highlights: 0, shadows: 0, whites: 0, blacks: 0, texture: 0, clarity: 0, dehaze: 0 });
        } catch (error: any) {
            setErrorMessage(error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleGenerate = () => {
        if (!promptText) { setErrorMessage("Please verify the prompt is not empty."); return; }
        callGenerateAPI(promptText, "Image generated successfully!");
    };

    const handleUnblur = () => { callGenerateAPI(UNBLUR_PROMPT, "Image successfully unblurred and enhanced!"); };

    const handleSave = () => {
        if (!generatedImageSrc) return;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width; canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const effectiveBrightness = adjustments.brightness + adjustments.exposure - (adjustments.dehaze * 0.1);
                const effectiveContrast = adjustments.contrast + (adjustments.clarity * 0.2) + (adjustments.dehaze * 0.2);
                ctx.filter = `brightness(${effectiveBrightness}%) contrast(${effectiveContrast}%)`;
                ctx.drawImage(img, 0, 0);
                const dataUrl = canvas.toDataURL('image/jpeg', 1.0);
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `YouNan-${new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15)}-Full.jpg`;
                link.click();
            }
        };
        img.src = generatedImageSrc;
    };

    if (currentView === 'login') return <Login onLogin={() => setCurrentView('home')} onViewAdmin={() => setCurrentView('admin')} onCreateAccount={() => setCurrentView('create-account')} />;
    if (currentView === 'admin') return <UserSheet onBack={() => setCurrentView('login')} />;
    if (currentView === 'create-account') return <CreateAccount onBackToLogin={() => setCurrentView('login')} onRegisterSuccess={() => setCurrentView('login')} />;

    return (
        <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <Header onNavigate={(view) => setCurrentView(view as any)} currentView={currentView} settings={appSettings} licenseExpiry={licenseExpiry} onOpenLicense={() => setShowLicense(true)} />
            
            <main className="flex w-full flex-grow relative">
                <AdSidebar side="left" onAboutClick={() => setCurrentView('about')} />
                
                <div className="flex-grow p-4 md:p-10 flex flex-col min-w-0">
                    {currentView === 'app' && (errorMessage || successMessage) && (
                        <div className={`mb-6 p-4 rounded-xl font-medium text-sm transition-all duration-300 ${errorMessage ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-green-100 text-green-800 border border-green-200'}`}>
                            {errorMessage || successMessage}
                        </div>
                    )}
                    {currentView === 'home' && <Home />}
                    {currentView === 'app' && (
                        <>
                            <div className="flex flex-col xl:grid xl:grid-cols-5 xl:gap-10 mt-2">
                                <div className="xl:col-span-1 mb-8 xl:mb-0">
                                    <CoreControls onFileUpload={handleFileUpload} selectedRatio={selectedRatio} onRatioChange={setSelectedRatio} onGenerate={handleGenerate} onUnblur={handleUnblur} onSave={handleSave} isGenerating={isGenerating} hasGeneratedImage={!!generatedImageSrc} fileName={uploadedFile?.name || null} />
                                </div>
                                <div className="xl:col-span-4">
                                    <ImageDisplay originalImageSrc={uploadedImageSrc} originalAspectRatioValue={originalAspectRatioValue} generatedImageSrc={generatedImageSrc} aspectRatio={selectedRatio} adjustments={adjustments} setAdjustments={setAdjustments} />
                                </div>
                            </div>
                            <RefinementControls selectedBackgroundId={selectedBackgroundId} onBackgroundChange={handleBackgroundChange} selectedUniformId={selectedUniformId} onUniformChange={handleUniformChange} selectedStateUniformId={selectedStateUniformId} onStateUniformChange={handleStateUniformChange} promptText={promptText} onPromptChange={setPromptText} />
                            <MargeImagesDisplay />
                            <MargeVideoDisplay />
                        </>
                    )}
                    {currentView === 'about' && <AboutUs />}
                    {currentView === 'news' && <News />}
                    {currentView === 'setting' && <Setting settings={appSettings} onUpdate={setAppSettings} />}
                    {showLicense && <License onClose={() => setShowLicense(false)} />}
                </div>
                
                <AdSidebar side="right" onAboutClick={() => setCurrentView('about')} />
            </main>
            
            <Footer />
        </div>
    );
};

export default App;