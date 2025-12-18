import React, { useState, useRef } from 'react';
import { generateVideo } from '../services/geminiService';

export const MargeVideoDisplay: React.FC = () => {
    // State for inputs
    const [subjectFile, setSubjectFile] = useState<File | null>(null);
    const [subjectPreview, setSubjectPreview] = useState<string | null>(null);
    const [styleText, setStyleText] = useState<string>('');

    // State for output
    const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [generatedTimestamp, setGeneratedTimestamp] = useState<string>('');
    
    // State for Collapsible Section
    const [isOpen, setIsOpen] = useState(false);

    // Refs
    const subjectInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = (ev) => {
                setSubjectFile(file);
                setSubjectPreview(ev.target?.result as string);
            };
            
            reader.readAsDataURL(file);
        }
    };

    const handleGenerateVideo = async () => {
        if (!subjectFile) {
            setErrorMsg("Please upload a Subject image.");
            return;
        }

        // Check for Veo API Key requirement
        try {
            const win = window as any;
            if (win.aistudio) {
                const hasKey = await win.aistudio.hasSelectedApiKey();
                if (!hasKey) {
                    await win.aistudio.openSelectKey();
                    // Double check if key was selected after dialog
                    const hasKeyAfter = await win.aistudio.hasSelectedApiKey();
                    if (!hasKeyAfter) {
                        setErrorMsg("API Key selection is required for Video Generation.");
                        return;
                    }
                }
            }
        } catch (e) {
            console.warn("AI Studio key check failed, proceeding with default env key if available.", e);
        }
        
        setIsProcessing(true);
        setErrorMsg(null);
        setGeneratedVideoUrl(null);

        try {
            // Convert file to Base64 (strip header)
            const subjectBase64 = subjectPreview?.split(',')[1] || "";

            const videoUrl = await generateVideo(
                subjectBase64, 
                subjectFile.type, 
                styleText || "A cinematic video of this subject"
            );

            setGeneratedVideoUrl(videoUrl);
            
            // Generate timestamp for filename
            const now = new Date();
            const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
            const timePart = now.toTimeString().slice(0, 8).replace(/:/g, '');
            setGeneratedTimestamp(`${datePart}-${timePart}`);

        } catch (err: any) {
            setErrorMsg(err.message || "Failed to generate video. Please try again.");
            console.error(err);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="mt-8 p-6 bg-white border border-slate-200 rounded-xl shadow-lg transition-all duration-300">
             <div 
                className="flex items-center justify-between mb-2 cursor-pointer select-none"
                onClick={() => setIsOpen(!isOpen)}
             >
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-semibold text-pink-700 font-sans">Merge Video Studio</h2>
                    <span className="bg-pink-100 text-pink-800 text-xs font-semibold px-2.5 py-0.5 rounded">Veo AI</span>
                </div>
                <div className={`p-2 rounded-full hover:bg-gray-100 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
            </div>

            {isOpen && (
                <div className="animate-fade-in mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        {/* LEFT COLUMN: Inputs (Subject, Style) */}
                        <div className="space-y-6">
                            
                            {/* 1. Subject Box */}
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                                    <span className="bg-pink-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">1</span>
                                    Subject (Upload Photo)
                                </label>
                                
                                <div 
                                    className="border-2 border-dashed border-gray-300 rounded-lg h-56 flex flex-col items-center justify-center cursor-pointer hover:bg-white hover:border-pink-400 transition-colors relative overflow-hidden group bg-gray-100"
                                    onClick={() => subjectInputRef.current?.click()}
                                >
                                    {subjectPreview ? (
                                        <>
                                            <img src={subjectPreview} alt="Subject" className="w-full h-full object-contain" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-white font-medium text-sm">Change Image</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                            <p className="text-sm text-gray-500">Click to upload Subject</p>
                                        </>
                                    )}
                                    <input 
                                        ref={subjectInputRef}
                                        type="file" 
                                        accept="image/*" 
                                        className="hidden" 
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>

                            {/* 2. Style Box */}
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                                    <span className="bg-pink-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">2</span>
                                    Style & Prompt
                                </label>
                                <textarea
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none text-sm"
                                    rows={3}
                                    placeholder="Describe the video movement or style (e.g., 'Zoom in slowly', 'Cinematic lighting', 'Character waves hand')..."
                                    value={styleText}
                                    onChange={(e) => setStyleText(e.target.value)}
                                />
                            </div>

                            {errorMsg && (
                                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                                    {errorMsg}
                                </div>
                            )}

                        </div>

                        {/* RIGHT COLUMN: Output (Preview Video Generate) */}
                        <div className="flex flex-col h-full">
                             <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                                 <span className="text-pink-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                 </span>
                                Preview Video Generate
                            </label>
                            
                            <div className="flex-grow bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center border border-gray-800 relative min-h-[350px]">
                                {generatedVideoUrl ? (
                                    <video 
                                        src={generatedVideoUrl} 
                                        controls 
                                        autoPlay 
                                        loop 
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <div className="text-center p-6">
                                        {isProcessing ? (
                                            <div className="flex flex-col items-center">
                                                <svg className="animate-spin h-8 w-8 text-pink-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <p className="text-gray-400 text-sm">Generating Video with Veo...</p>
                                                <p className="text-gray-500 text-xs mt-2">This may take a minute or two.</p>
                                            </div>
                                        ) : (
                                            <>
                                                <svg className="w-12 h-12 text-gray-700 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                                <p className="text-gray-500 text-sm">Video Result will appear here</p>
                                            </>
                                        )}
                                    </div>
                                )}
                                
                                {/* Download Button Overlay */}
                                 {generatedVideoUrl && (
                                    <a 
                                        href={generatedVideoUrl} 
                                        download={`YouNan-Video-${generatedTimestamp}.mp4`}
                                        className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg transition-colors"
                                        title="Download"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                    </a>
                                )}
                            </div>

                            <button 
                                onClick={handleGenerateVideo}
                                disabled={isProcessing || !subjectFile}
                                className={`mt-4 w-full py-3 px-4 rounded-xl font-bold text-white shadow-md transition-all transform hover:-translate-y-0.5 ${
                                    isProcessing || !subjectFile
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700'
                                }`}
                            >
                                {isProcessing ? 'Generating Video...' : 'Generate Video (Veo)'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};