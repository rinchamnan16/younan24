import React, { useState } from 'react';
import { BACKGROUND_OPTIONS, UNIFORM_PRESETS, STATE_UNIFORM_OPTIONS } from '../types';

interface RefinementControlsProps {
    selectedBackgroundId: string;
    onBackgroundChange: (id: string) => void;
    selectedUniformId: string;
    onUniformChange: (id: string) => void;
    selectedStateUniformId: string;
    onStateUniformChange: (id: string) => void;
    promptText: string;
    onPromptChange: (text: string) => void;
}

export const RefinementControls: React.FC<RefinementControlsProps> = ({
    selectedBackgroundId,
    onBackgroundChange,
    selectedUniformId,
    onUniformChange,
    selectedStateUniformId,
    onStateUniformChange,
    promptText,
    onPromptChange
}) => {
    // All sections closed by default as requested
    const [showBackgrounds, setShowBackgrounds] = useState(false);
    const [showUniforms, setShowUniforms] = useState(false);
    const [showStateUniforms, setShowStateUniforms] = useState(false);

    const selectedBgLabel = BACKGROUND_OPTIONS.find(bg => bg.id === selectedBackgroundId)?.label || "Select Background";
    const selectedUniformLabel = UNIFORM_PRESETS.find(u => u.id === selectedUniformId)?.label || "Select Uniform";
    const selectedStateUniformLabel = STATE_UNIFORM_OPTIONS.find(u => u.id === selectedStateUniformId)?.label || "Select Uniform Type";

    const toggleSection = (section: 'background' | 'uniform' | 'state') => {
        if (section === 'background') {
            setShowBackgrounds(!showBackgrounds);
            setShowUniforms(false);
            setShowStateUniforms(false);
        } else if (section === 'uniform') {
            setShowUniforms(!showUniforms);
            setShowBackgrounds(false);
            setShowStateUniforms(false);
        } else if (section === 'state') {
            setShowStateUniforms(!showStateUniforms);
            setShowBackgrounds(false);
            setShowUniforms(false);
        }
    };

    return (
        <div className="mt-8 p-6 bg-white border border-slate-200 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-700 font-sans">Refinement Options</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* 3. Choose Background Color */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-bold text-gray-700 mb-3">3. Choose Background Color</label>
                    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                        <button 
                            onClick={() => toggleSection('background')}
                            className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                        >
                            <span className="text-sm font-bold text-indigo-600 truncate mr-2">{selectedBgLabel}</span>
                            <svg className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${showBackgrounds ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        
                        {showBackgrounds && (
                            <div className="p-3 grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto border-t border-gray-100 no-scrollbar animate-fade-in bg-white">
                                {BACKGROUND_OPTIONS.map((bg) => (
                                    <div 
                                        key={bg.id} 
                                        onClick={() => onBackgroundChange(bg.id)}
                                        className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all border-2 group ${
                                            selectedBackgroundId === bg.id 
                                                ? 'bg-indigo-50 border-indigo-600 shadow-sm' 
                                                : 'bg-white border-gray-100 hover:border-indigo-300 hover:bg-indigo-50/30'
                                        }`}
                                    >
                                        <div className={`w-10 h-10 rounded-lg border border-gray-200 shadow-sm flex-shrink-0 ${bg.colorClass}`} style={bg.style}></div>
                                        <div className="flex flex-col">
                                            <span className={`text-sm font-bold ${selectedBackgroundId === bg.id ? 'text-indigo-800' : 'text-gray-700'}`}>{bg.label}</span>
                                            <span className="text-[10px] text-gray-400">Click to select</span>
                                        </div>
                                        {selectedBackgroundId === bg.id && (
                                            <div className="ml-auto bg-indigo-600 rounded-full p-1"><svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                
                {/* 4. Choose Uniform Preset */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-bold text-gray-700 mb-3">4. Choose Uniform Preset</label>
                    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                        <button 
                            onClick={() => toggleSection('uniform')}
                            className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                        >
                            <span className="text-sm font-bold text-indigo-600 truncate mr-2">{selectedUniformLabel}</span>
                            <svg className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${showUniforms ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>

                         {showUniforms && (
                            <div className="p-3 space-y-2 max-h-[400px] overflow-y-auto border-t border-gray-100 no-scrollbar animate-fade-in bg-white">
                                {UNIFORM_PRESETS.map((preset) => (
                                    <div 
                                        key={preset.id} 
                                        onClick={() => onUniformChange(preset.id)}
                                        className={`p-3 rounded-xl cursor-pointer transition-all border-2 flex items-center justify-between group ${
                                            selectedUniformId === preset.id 
                                                ? 'bg-indigo-50 border-indigo-600 shadow-sm' 
                                                : 'bg-white border-gray-100 hover:border-indigo-300 hover:bg-indigo-50/30'
                                        }`}
                                    >
                                        <div className="flex flex-col">
                                            <span className={`text-sm font-bold ${selectedUniformId === preset.id ? 'text-indigo-800' : 'text-gray-700'}`}>{preset.label}</span>
                                            <span className="text-[10px] text-gray-400">Apply this style</span>
                                        </div>
                                        {selectedUniformId === preset.id && (
                                            <div className="bg-indigo-600 rounded-full p-1"><svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                         )}
                    </div>
                </div>

                {/* 5. State work uniform */}
                 <div className="md:col-span-1">
                    <label className="block text-sm font-bold text-gray-700 mb-3">5. State work uniform (ឯកសណ្ធានការងាររដ្ឋ)</label>
                    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                        <button 
                            onClick={() => toggleSection('state')}
                            className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                        >
                            <span className="text-sm font-bold text-indigo-600 truncate mr-2">{selectedStateUniformLabel}</span>
                            <svg className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${showStateUniforms ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        
                        {showStateUniforms && (
                            <div className="p-3 space-y-2 max-h-[400px] overflow-y-auto border-t border-gray-100 no-scrollbar animate-fade-in bg-white">
                                {STATE_UNIFORM_OPTIONS.map((option) => (
                                    <div 
                                        key={option.id} 
                                        onClick={() => onStateUniformChange(option.id)}
                                        className={`p-4 rounded-xl cursor-pointer transition-all border-2 flex items-center justify-between group ${
                                            selectedStateUniformId === option.id 
                                                ? 'bg-indigo-50 border-indigo-600 shadow-sm' 
                                                : 'bg-white border-gray-100 hover:border-indigo-300 hover:bg-indigo-50/30'
                                        }`}
                                    >
                                        <div className="flex flex-col">
                                            <span className={`text-sm font-bold ${selectedStateUniformId === option.id ? 'text-indigo-800' : 'text-gray-700'}`}>{option.label}</span>
                                            <span className="text-[10px] text-gray-400">Official Cambodian Attire</span>
                                        </div>
                                        {selectedStateUniformId === option.id && (
                                            <div className="bg-indigo-600 rounded-full p-1"><svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* 6. Final Prompt Input */}
                <div className="md:col-span-3">
                    <label htmlFor="final-prompt-input" className="block text-sm font-bold text-gray-700 mb-2">6. Final Editing Prompt (Editable)</label>
                    <textarea 
                        id="final-prompt-input" 
                        rows={2} 
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-600 text-sm leading-relaxed font-siemreap transition-all" 
                        value={promptText}
                        onChange={(e) => onPromptChange(e.target.value)}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};