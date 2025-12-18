
import React, { useState, useEffect, useRef } from 'react';

/**
 * ADVERTISING CONFIGURATION
 * 
 * Supports both Images and Videos from Google Drive or direct links.
 * For Google Drive:
 * 1. Ensure file is shared as "Anyone with the link".
 * 2. Copy the ID from the link.
 */

interface AdMedia {
    id: string;
    type: 'image' | 'video';
    link?: string; // Optional: Click destination
}

const AD_CONFIG: Record<string, AdMedia[]> = {
    // RIGHT SIDEBAR
    "Ad 1": [
        { id: "1wWQ9JXRM9CdfJ72r7O8UfKAG0NwPR_BF", type: 'image' },
        { id: "1adV-RR26b0R1Vv4o-xxTP7bgKzxMW5Lf", type: 'image' },
        { id: "1Pi3-8oxUdPtP3cSYXSt0uN3d-jtPaKHv", type: 'image' }
    ],
    "Ad 2": [
        { id: "1nn_8rx9B3DrTJO0JvPBQUA0hMwViwaL-", type: 'image' },
        { id: "15tQIEd6qiDKamGdBEhr4kVTamBfEUjJP", type: 'image' }
    ],
    "Ad 3": [
        { id: "1wWQ9JXRM9CdfJ72r7O8UfKAG0NwPR_BF", type: 'image' }
    ],
    "Ad 4": [
        { id: "1ybzs_dzLB9-AaHPi8WAWoi6SHF3njAEc", type: 'image' }
    ],
    
    // LEFT SIDEBAR
    "Ad 5": [
        { id: "1ybzs_dzLB9-AaHPi8WAWoi6SHF3njAEc", type: 'image' }
    ],
    "Ad 6": [
        { id: "1wWQ9JXRM9CdfJ72r7O8UfKAG0NwPR_BF", type: 'image' },
        { id: "1adV-RR26b0R1Vv4o-xxTP7bgKzxMW5Lf", type: 'image' }
    ],
    "Ad 7": [
        { id: "1Pi3-8oxUdPtP3cSYXSt0uN3d-jtPaKHv", type: 'image' }
    ],
    "Ad 8": [
        { id: "1nn_8rx9B3DrTJO0JvPBQUA0hMwViwaL-", type: 'image' }
    ]
};

const SIDE_MAPPING: Record<string, string[]> = {
    "right": ["Ad 1", "Ad 2", "Ad 3", "Ad 4"],
    "left":  ["Ad 5", "Ad 6", "Ad 7", "Ad 8"]
};

interface AdSliderProps {
    folderName: string;
    slotIndex: number;
}

const AdSlider: React.FC<AdSliderProps> = ({ folderName, slotIndex }) => {
    const mediaItems = AD_CONFIG[folderName] || [];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hasError, setHasError] = useState<Record<number, boolean>>({});
    const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

    const currentItem = mediaItems[currentIndex];
    const isVideo = currentItem?.type === 'video';

    useEffect(() => {
        if (mediaItems.length <= 1) return;

        // Default duration for images is 6 seconds
        let duration = 6000;

        const timer = setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
        }, duration);

        return () => clearTimeout(timer);
    }, [currentIndex, mediaItems.length]);

    // Handle video end to jump to next slide immediately
    const handleVideoEnd = () => {
        setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
    };

    const handleMediaError = (index: number) => {
        setHasError(prev => ({ ...prev, [index]: true }));
    };

    const isEmpty = mediaItems.length === 0 || mediaItems.every((_, idx) => hasError[idx]);

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm min-h-[250px] flex-grow flex flex-col relative overflow-hidden group hover:shadow-2xl transition-all duration-700 hover:border-indigo-400">
            {/* Header Badge */}
            <div className="absolute top-3 left-3 z-30 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></div>
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                        {folderName}
                    </span>
                </div>
            </div>

            {/* Status Tag */}
            <div className="absolute top-3 right-3 z-30">
                <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg backdrop-blur-sm border shadow-sm ${
                    isEmpty 
                    ? 'bg-amber-500 text-white border-amber-400' 
                    : 'bg-green-500 text-white border-green-400'
                }`}>
                    {isEmpty ? 'VACANT' : isVideo ? 'VIDEO AD' : 'AD SPONSOR'}
                </span>
            </div>
            
            {/* Media Container */}
            <div className="flex-grow w-full relative bg-slate-100 flex items-center justify-center">
                {!isEmpty ? (
                    mediaItems.map((item, index) => (
                        <div 
                            key={`${item.id}-${index}`}
                            className={`absolute inset-0 transition-all duration-1000 ease-in-out flex items-center justify-center ${
                                index === currentIndex ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-95 pointer-events-none'
                            }`}
                        >
                            {item.type === 'video' ? (
                                <video
                                    // Fix: Wrapped ref assignment in braces to return void, resolving TS error where shorthand arrow returned HTMLVideoElement
                                    ref={el => { videoRefs.current[index] = el; }}
                                    src={`https://drive.google.com/uc?id=${item.id}&export=download`}
                                    className="w-full h-full object-cover rounded-xl"
                                    autoPlay={index === currentIndex}
                                    muted
                                    playsInline
                                    onEnded={handleVideoEnd}
                                    onError={() => handleMediaError(index)}
                                />
                            ) : (
                                <img 
                                    src={`https://drive.google.com/thumbnail?id=${item.id}&sz=w800`}
                                    alt={`${folderName} image`}
                                    className="w-full h-full object-contain rounded-xl drop-shadow-2xl p-3 transition-transform duration-700 group-hover:scale-105" 
                                    onError={() => handleMediaError(index)}
                                />
                            )}
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center gap-4 group-hover:scale-110 transition-transform duration-500">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-2 border-slate-200 shadow-xl">
                            <svg className="w-10 h-10 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                        </div>
                        <div>
                            <p className="text-[12px] font-black text-slate-500 uppercase tracking-[0.25em]">Book Space</p>
                            <p className="text-[10px] text-slate-400 mt-2 font-bold">CONTACT ADMIN</p>
                        </div>
                    </div>
                )}

                {/* Animated Progress Bar (Only for images, videos handle their own timing) */}
                {!isEmpty && !isVideo && (
                    <div className="absolute bottom-0 left-0 h-1.5 bg-indigo-500/10 w-full overflow-hidden">
                        <div 
                            key={currentIndex}
                            className="h-full bg-indigo-500/60 animate-[progress_6s_linear_infinite]" 
                        />
                    </div>
                )}
            </div>

            {/* Navigation Indicators */}
            {!isEmpty && mediaItems.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
                    {mediaItems.map((_, index) => (
                        <div 
                            key={index}
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                                index === currentIndex ? 'bg-indigo-600 w-8 shadow-[0_0_8px_rgba(79,70,229,0.5)]' : 'bg-slate-300 w-2'
                            }`}
                        />
                    ))}
                </div>
            )}
            
            <style>{`
                @keyframes progress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
            `}</style>
        </div>
    );
};

export const AdSidebar: React.FC<{ side: 'left' | 'right'; onAboutClick?: () => void }> = ({ side, onAboutClick }) => {
    const folders = SIDE_MAPPING[side];

    return (
        <aside className={`hidden xl:flex flex-col gap-10 w-80 2xl:w-96 flex-shrink-0 py-12 px-6 ${
            side === 'left' ? 'border-r' : 'border-l'
        } border-slate-200 bg-slate-50/30 overflow-y-auto no-scrollbar h-auto min-h-full`}>
            
            <div className="flex flex-col gap-2 px-3 border-l-4 border-indigo-600 ml-1">
                <h4 className="text-[14px] font-black text-slate-900 uppercase tracking-[0.4em]">{side} PARTNER</h4>
                <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest">Authorized Billboard</p>
            </div>

            {folders.map((folder, i) => (
                <AdSlider key={folder} folderName={folder} slotIndex={i} />
            ))}
            
            <div className="mt-auto pt-10 pb-6">
                <div 
                    onClick={onAboutClick}
                    className="relative p-8 rounded-[2rem] bg-indigo-600 shadow-2xl overflow-hidden text-center group transition-all duration-500 hover:scale-[1.02] cursor-pointer active:scale-95"
                >
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                    <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-black/10 rounded-full"></div>
                    
                    <p className="text-[14px] text-white font-black uppercase tracking-[0.3em] relative z-10 mb-2">
                        YouNan Ads
                    </p>
                    <div className="h-0.5 w-12 bg-white/30 mx-auto mb-3 relative z-10"></div>
                    <p className="text-[10px] text-indigo-100 font-bold relative z-10 uppercase tracking-widest">Media Network v2.5</p>
                    
                    {/* Hover indicator */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors"></div>
                </div>
            </div>
        </aside>
    );
};
