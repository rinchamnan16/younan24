import React, { useRef, useState } from 'react';
import { AspectRatio } from '../types';

interface CoreControlsProps {
    onFileUpload: (file: File) => void;
    selectedRatio: AspectRatio;
    onRatioChange: (ratio: AspectRatio) => void;
    onGenerate: () => void;
    onUnblur: () => void;
    onSave: () => void;
    isGenerating: boolean;
    hasGeneratedImage: boolean;
    fileName: string | null;
}

export const CoreControls: React.FC<CoreControlsProps> = ({
    onFileUpload,
    selectedRatio,
    onRatioChange,
    onGenerate,
    onUnblur,
    onSave,
    isGenerating,
    hasGeneratedImage,
    fileName
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            onFileUpload(event.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                onFileUpload(file);
            }
        }
    };

    return (
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-lg h-fit sticky top-8">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-700 font-sans">Core Images Controls</h2>

            {/* 1. File Upload */}
            <div className="mb-6 border-b pb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    1. Upload Photo Add
                    <span className="inline-flex items-center ml-2 text-green-600 text-xs bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                        JPG/PNG
                    </span>
                </label>
                <div 
                    className={`flex flex-col justify-center items-center h-40 border-2 border-dashed rounded-lg p-4 cursor-pointer transition duration-150 ease-in-out group ${
                        isDragging 
                            ? 'border-indigo-500 bg-indigo-50' 
                            : 'border-gray-300 hover:bg-indigo-50 hover:border-indigo-400'
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        accept="image/jpeg, image/png" 
                        className="hidden" 
                        onChange={handleFileChange}
                    />
                    <svg className={`w-10 h-10 mb-2 transition-colors ${isDragging ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                    </svg>
                    <p className={`text-sm text-center font-medium transition-colors ${isDragging ? 'text-indigo-700' : 'text-gray-500 group-hover:text-indigo-600'}`}>
                        {fileName || 'Drop Images, Click or Tap to Image'}
                    </p>
                    
                </div>
            </div>
            
            {/* 2. Output Size Selection */}
            <div className="mb-6 border-b pb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">2. Output Size (Visual Preview Only)</label>
                <p className="text-xs text-gray-500 mb-3 p-2 bg-gray-50 rounded-md">
                    ⭐ The final saved image is generated at high resolution (prepared for 600 DPI printing) for maximum print quality.
                </p>
                <div className="flex flex-wrap gap-2">
                    {[
                        { id: 'original', label: 'Original' },
                        { id: '3x2', label: '6x4 (3:2)' },
                        { id: '2x3', label: '4x6 (2:3)' },
                        { id: '1x1', label: 'Square' }
                    ].map((option) => (
                        <label 
                            key={option.id} 
                            className={`flex items-center space-x-2 p-2 px-3 border rounded-full cursor-pointer transition-colors ${selectedRatio === option.id ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500' : 'border-gray-300 hover:bg-gray-50'}`}
                        >
                            <input 
                                type="radio" 
                                name="output-size" 
                                value={option.id} 
                                checked={selectedRatio === option.id} 
                                onChange={(e) => onRatioChange(e.target.value as AspectRatio)} 
                                className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                            />
                            <span className="text-xs md:text-sm font-medium text-gray-700">{option.label}</span>
                        </label>
                    ))}
                </div>
            </div>
            
            {/* Generate Button */}
            <button 
                onClick={onGenerate} 
                disabled={isGenerating || !fileName}
                className={`w-full flex items-center justify-center font-semibold py-3 px-4 rounded-lg shadow-md transition duration-200 mb-3 ${isGenerating || !fileName ? 'bg-indigo-300 cursor-not-allowed text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
            >
                {isGenerating ? (
                    'Processing...'
                ) : (
                    'Generate Edited Image'
                )}
            </button>

             {/* Unblur Button */}
             <button 
                onClick={onUnblur} 
                disabled={isGenerating || !fileName}
                className={`w-full flex items-center justify-center font-semibold py-3 px-4 rounded-lg shadow-md transition duration-200 mb-6 ${isGenerating || !fileName ? 'bg-yellow-300 cursor-not-allowed text-white' : 'bg-yellow-500 text-white hover:bg-yellow-600'}`}
            >
                 {isGenerating ? 'Processing...' : 'Unblur Images (Enhance Clarity)'}
            </button>
            
            {/* Save Button */}
            {hasGeneratedImage && (
                <button 
                    onClick={onSave} 
                    className="w-full flex items-center justify-center bg-green-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
                        <path d="M10 3a1 1 0 011 1v5.293l1.146-1.147a.5.5 0 01.708.708l-2 2a.5.5 0 01-.708 0l-2-2a.5.5 0 11.708-.708L9 9.293V4a1 1 0 011-1z" />
                        <path fillRule="evenodd" d="M16 10a1 1 0 01-1 1H5a1 1 0 01-1-1v4a1 1 0 001 1h10a1 1 0 001-1v-4zM6 16a1 1 0 100 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Save Full Uncropped Photo
                </button>
            )}
        </div>
    );
};