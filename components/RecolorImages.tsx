import React from 'react';

export interface ImageAdjustments {
    brightness: number;
    contrast: number;
    exposure: number;
    highlights: number;
    shadows: number;
    whites: number;
    blacks: number;
    texture: number;
    clarity: number;
    dehaze: number;
}

interface RecolorImagesProps {
    adjustments: ImageAdjustments;
    setAdjustments: React.Dispatch<React.SetStateAction<ImageAdjustments>>;
}

export const RecolorImages: React.FC<RecolorImagesProps> = ({
    adjustments,
    setAdjustments
}) => {
    const handleAuto = () => {
        setAdjustments({
            ...adjustments,
            brightness: 105,
            contrast: 110,
            exposure: 5,
            clarity: 10,
            dehaze: 5
        });
    };

    const handleReset = () => {
        setAdjustments({
            brightness: 100,
            contrast: 100,
            exposure: 0,
            highlights: 0,
            shadows: 0,
            whites: 0,
            blacks: 0,
            texture: 0,
            clarity: 0,
            dehaze: 0
        });
    };

    const handleChange = (key: keyof ImageAdjustments, value: number) => {
        setAdjustments(prev => ({ ...prev, [key]: value }));
    };

    const renderSlider = (label: string, key: keyof ImageAdjustments, min: number, max: number, unit: string = '') => (
        <div className="mb-2">
            <div className="flex justify-between mb-1">
                <label htmlFor={key} className="text-[10px] uppercase tracking-wider font-semibold text-gray-500">{label}</label>
                <span className="text-[10px] text-gray-400">{adjustments[key]}{unit}</span>
            </div>
            <input
                id={key}
                type="range"
                min={min}
                max={max}
                value={adjustments[key]}
                onChange={(e) => handleChange(key, Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500"
            />
        </div>
    );

    return (
        <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-700">Adjustments</h3>
                <div className="flex space-x-1">
                     <button
                        onClick={handleAuto}
                        className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded hover:bg-indigo-100 transition-colors flex items-center"
                        title="Auto Adjust"
                    >
                        Auto
                    </button>
                    <button
                        onClick={handleReset}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded hover:bg-gray-200 transition-colors"
                        title="Reset"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                
                {/* Light Section */}
                <div>
                    <h4 className="text-xs font-bold text-gray-800 mb-2">Light</h4>
                    {renderSlider("Exposure", "exposure", -100, 100)}
                    {renderSlider("Contrast", "contrast", 0, 200, '%')}
                    {renderSlider("Highlights", "highlights", -100, 100)}
                    {renderSlider("Shadows", "shadows", -100, 100)}
                    {renderSlider("Whites", "whites", -100, 100)}
                    {renderSlider("Blacks", "blacks", -100, 100)}
                    {/* Legacy Brightness kept for compatibility/extra control */}
                    {renderSlider("Brightness", "brightness", 0, 200, '%')}
                </div>

                <div className="w-full border-t border-gray-100 my-1"></div>

                {/* Effects Section */}
                <div>
                    <h4 className="text-xs font-bold text-gray-800 mb-2">Effects</h4>
                    {renderSlider("Texture", "texture", -100, 100)}
                    {renderSlider("Clarity", "clarity", -100, 100)}
                    {renderSlider("Dehaze", "dehaze", -100, 100)}
                </div>
            </div>
        </div>
    );
};