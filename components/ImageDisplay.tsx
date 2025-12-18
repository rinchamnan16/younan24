import React from 'react';
import { AspectRatio } from '../types';
import { RecolorImages, ImageAdjustments } from './RecolorImages';

interface ImageDisplayProps {
    originalImageSrc: string | null;
    generatedImageSrc: string | null;
    aspectRatio: AspectRatio;
    originalAspectRatioValue: string;
    adjustments: ImageAdjustments;
    setAdjustments: React.Dispatch<React.SetStateAction<ImageAdjustments>>;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({
    originalImageSrc,
    generatedImageSrc,
    aspectRatio,
    originalAspectRatioValue,
    adjustments,
    setAdjustments
}) => {
    let aspectRatioClass = '';
    let customStyle: React.CSSProperties = {};
    let title = "Generated Photo (Preview: ";

    switch (aspectRatio) {
        case '3x2': aspectRatioClass = 'aspect-[3/2]'; title += "6x4 Landscape)"; break;
        case '2x3': aspectRatioClass = 'aspect-[2/3]'; title += "4x6 Portrait)"; break;
        case '1x1': aspectRatioClass = 'aspect-square'; title += "1x1 Square)"; break;
        case 'original': customStyle = { aspectRatio: originalAspectRatioValue }; title += `Original Ratio ${originalAspectRatioValue.replace(' / ', ':')})`; break;
    }
    
    const effectiveBrightness = adjustments.brightness + adjustments.exposure - (adjustments.dehaze * 0.1);
    const effectiveContrast = adjustments.contrast + (adjustments.clarity * 0.2) + (adjustments.dehaze * 0.2);
    const filterStyle = { filter: `brightness(${effectiveBrightness}%) contrast(${effectiveContrast}%)` };

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 xl:grid-cols-8 gap-6">
                <div className="xl:col-span-3 bg-white border border-slate-200 rounded-xl shadow-lg p-4 h-fit">
                    <h2 className="text-xl font-semibold mb-4 text-indigo-700 font-sans">Original Photo</h2>
                    <div className="flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden relative w-full h-auto min-h-[150px]">
                         <img src={originalImageSrc || "https://picsum.photos/600/400?grayscale"} alt="Original" className="w-full h-auto object-contain rounded-lg max-h-[500px]" style={originalImageSrc ? filterStyle : undefined} />
                        {!originalImageSrc && <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">No Image Uploaded</div>}
                    </div>
                    <RecolorImages adjustments={adjustments} setAdjustments={setAdjustments} />
                </div>

                <div className="xl:col-span-5 bg-white border border-slate-200 rounded-xl shadow-lg p-4 h-fit relative">
                    <h2 className="text-xl font-semibold mb-4 text-indigo-700 font-sans pr-32 truncate">{title}</h2>
                    <div className="flex justify-center w-full">
                        <div className={`flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden w-full relative transition-all duration-300 shadow-sm ${aspectRatioClass}`} style={customStyle}>
                            {generatedImageSrc ? (
                                <img src={generatedImageSrc} alt="Result" className="w-full h-full object-contain rounded-lg" style={filterStyle} />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                    <svg className="w-10 h-10 mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    <span className="font-medium text-center px-4">Output will appear here</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};