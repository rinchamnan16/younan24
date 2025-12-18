import React, { useState, useRef } from 'react';
import { generateMergeImage } from '../services/geminiService';

export const MargeImagesDisplay: React.FC = () => {
    // State for inputs
    const [subjectFile, setSubjectFile] = useState<File | null>(null);
    const [subjectPreview, setSubjectPreview] = useState<string | null>(null);
    
    const [sceneFile, setSceneFile] = useState<File | null>(null);
    const [scenePreview, setScenePreview] = useState<string | null>(null);
    
    const [styleText, setStyleText] = useState<string>('');
    
    // New State for Background Removal Option
    const [removeBackground, setRemoveBackground] = useState<boolean>(true);

    // State for output
    const [generatedResult, setGeneratedResult] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [generatedTimestamp, setGeneratedTimestamp] = useState<string>('');
    const [downloadFormat, setDownloadFormat] = useState<'jpg' | 'png'>('jpg');

    // State for Collapsible Section
    const [isOpen, setIsOpen] = useState(false);

    // Refs for file inputs
    const subjectInputRef = useRef<HTMLInputElement>(null);
    const sceneInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'subject' | 'scene') => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = (ev) => {
                if (type === 'subject') {
                    setSubjectFile(file);
                    setSubjectPreview(ev.target?.result as string);
                } else {
                    setSceneFile(file);
                    setScenePreview(ev.target?.result as string);
                }
            };
            
            reader.readAsDataURL(file);
        }
    };

    const handleMerge = async () => {
        if (!subjectFile || !sceneFile) {
            setErrorMsg("Please upload both a Subject image and a Scene image.");
            return;
        }
        
        setIsProcessing(true);
        setErrorMsg(null);
        setGeneratedResult(null);

        try {
            // Convert files to Base64 (strip header)
            const subjectBase64 = subjectPreview?.split(',')[1] || "";
            const sceneBase64 = scenePreview?.split(',')[1] || "";

            const resultBase64 = await generateMergeImage(
                subjectBase64, 
                subjectFile.type, 
                sceneBase64, 
                sceneFile.type, 
                styleText || "Realistic, high quality, seamless blend",
                removeBackground
            );

            setGeneratedResult(`data:image/png;base64,${resultBase64}`);
            
            // Generate timestamp for filename
            const now = new Date();
            const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
            const timePart = now.toTimeString().slice(0, 8).replace(/:/g, '');
            setGeneratedTimestamp(`${datePart}-${timePart}`);

        } catch (err: any) {
            setErrorMsg("Failed to merge images. Please try again.");
            console.error(err);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (!generatedResult) return;

        if (downloadFormat === 'png') {
            // Direct download for PNG (default from API)
            const link = document.createElement('a');
            link.href = generatedResult;
            link.download = `YouNan-${generatedTimestamp}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            // Convert to JPG using Canvas
            const img = new Image();
            img.src = generatedResult;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    // Fill white background to prevent transparency turning black in JPG
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);
                    
                    const jpgData = canvas.toDataURL('image/jpeg', 0.9);
                    const link = document.createElement('a');
                    link.href = jpgData;
                    link.download = `YouNan-${generatedTimestamp}.jpg`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            };
        }
    };

    return (
        <div className="mt-8 p-6 bg-white border border-slate-200 rounded-xl shadow-lg transition-all duration-300">
             <div 
                className="flex items-center justify-between mb-2 cursor-pointer select-none"
                onClick={() => setIsOpen(!isOpen)}
             >
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-semibold text-indigo-700 font-sans">Merge Images Studio</h2>
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">Beta</span>
                </div>
                <div className={`p-2 rounded-full hover:bg-gray-100 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
            </div>

            {isOpen && (
                <div className="animate-fade-in mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* LEFT COLUMN: Inputs (Subject, Scene, Style) */}
                        <div className="lg:col-span-2 space-y-6">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* 1. Subject Box */}
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                    <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                                        <span className="bg-indigo-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">1</span>
                                        Subject (Upload Photo)
                                    </label>
                                    
                                    <div 
                                        className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-white hover:border-indigo-400 transition-colors relative overflow-hidden group bg-gray-100"
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
                                            onChange={(e) => handleFileChange(e, 'subject')}
                                        />
                                    </div>
                                </div>

                                {/* 2. Scene Box */}
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                     <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                                        <span className="bg-indigo-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">2</span>
                                        Scene (Upload Photo)
                                    </label>
                                    
                                    <div 
                                        className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-white hover:border-indigo-400 transition-colors relative overflow-hidden group bg-gray-100"
                                        onClick={() => sceneInputRef.current?.click()}
                                    >
                                        {scenePreview ? (
                                            <>
                                                <img src={scenePreview} alt="Scene" className="w-full h-full object-contain" />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-white font-medium text-sm">Change Image</span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                <p className="text-sm text-gray-500">Click to upload Scene</p>
                                            </>
                                        )}
                                        <input 
                                            ref={sceneInputRef}
                                            type="file" 
                                            accept="image/*" 
                                            className="hidden" 
                                            onChange={(e) => handleFileChange(e, 'scene')}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 3. Style Box */}
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                                    <span className="bg-indigo-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">3</span>
                                    Style & Description
                                </label>
                                <textarea
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                    rows={3}
                                    placeholder="Describe the style (e.g., 'Realistic lighting', 'Cyberpunk neon style', 'Oil painting')..."
                                    value={styleText}
                                    onChange={(e) => setStyleText(e.target.value)}
                                />
                                 <div className="flex gap-2 mt-2">
                                    {['Realistic', 'Cinematic', 'Studio Lighting', 'Cyberpunk', 'Watercolor'].map(style => (
                                        <button 
                                            key={style}
                                            onClick={() => setStyleText(prev => prev ? `${prev}, ${style}` : style)}
                                            className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-full hover:bg-indigo-50 hover:border-indigo-200 text-gray-600 transition-colors"
                                        >
                                            + {style}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Background Removal Options */}
                             <div className="flex flex-col gap-2">
                                <label className="block text-sm font-bold text-gray-700">Options</label>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setRemoveBackground(true)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                                            removeBackground
                                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        {removeBackground && (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                        )}
                                        Remove the background
                                    </button>
                                    <button
                                        onClick={() => setRemoveBackground(false)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                                            !removeBackground
                                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        {!removeBackground && (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                        )}
                                        Don't remove the background
                                    </button>
                                </div>
                            </div>

                            {errorMsg && (
                                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                                    {errorMsg}
                                </div>
                            )}

                        </div>

                        {/* RIGHT COLUMN: Output (Preview Photo Generate) */}
                        <div className="lg:col-span-1 flex flex-col h-full">
                             <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                                 <span className="text-indigo-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                 </span>
                                Preview Photo Generate
                            </label>
                            
                            <div className="flex-grow bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center border border-gray-800 relative min-h-[300px]">
                                {generatedResult ? (
                                    <img src={generatedResult} alt="Merged Result" className="w-full h-full object-contain" />
                                ) : (
                                    <div className="text-center p-6">
                                        {isProcessing ? (
                                            <div className="flex flex-col items-center">
                                                <svg className="animate-spin h-8 w-8 text-indigo-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <p className="text-gray-400 text-sm">Merging Subject into Scene...</p>
                                            </div>
                                        ) : (
                                            <>
                                                <svg className="w-12 h-12 text-gray-700 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                <p className="text-gray-500 text-sm">Result will appear here</p>
                                            </>
                                        )}
                                    </div>
                                )}
                                
                                {/* Download Overlay with Format Options */}
                                 {generatedResult && (
                                     <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-white/90 p-2 rounded-xl shadow-lg backdrop-blur-sm">
                                         <div className="flex gap-2">
                                             <button
                                                onClick={() => setDownloadFormat('jpg')}
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                                                    downloadFormat === 'jpg' 
                                                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                }`}
                                             >
                                                {downloadFormat === 'jpg' && (
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                                )}
                                                JPG
                                             </button>
                                             <button
                                                onClick={() => setDownloadFormat('png')}
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                                                    downloadFormat === 'png' 
                                                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                }`}
                                             >
                                                {downloadFormat === 'png' && (
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                                )}
                                                Transparent
                                             </button>
                                         </div>
                                        <button 
                                            onClick={handleDownload}
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition-colors shadow-sm"
                                            title="Download"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                        </button>
                                    </div>
                                )}
                            </div>

                            <button 
                                onClick={handleMerge}
                                disabled={isProcessing || !subjectFile || !sceneFile}
                                className={`mt-4 w-full py-3 px-4 rounded-xl font-bold text-white shadow-md transition-all transform hover:-translate-y-0.5 ${
                                    isProcessing || !subjectFile || !sceneFile
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                                }`}
                            >
                                {isProcessing ? 'Generating...' : 'Generate Merge'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};