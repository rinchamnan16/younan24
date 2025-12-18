
import { GoogleGenAI } from "@google/genai";

/**
 * Enhanced error handler to catch Quota/Rate limit issues
 */
const handleGeminiError = (error: any) => {
    console.error("Gemini API Error:", error);
    
    const errorString = JSON.stringify(error);
    if (errorString.includes("429") || errorString.includes("RESOURCE_EXHAUSTED") || error?.status === "RESOURCE_EXHAUSTED") {
        throw new Error("API Limit Reached: You have exceeded the current quota. Please wait a few moments before trying again or check your API billing details at ai.google.dev.");
    }
    
    throw new Error(error.message || "An unexpected error occurred with the AI service.");
};

/**
 * Sends an image and a prompt to Gemini to generate an edited version.
 */
export const generateEditedImage = async (
    imageBase64: string,
    mimeType: string,
    prompt: string
): Promise<string> => {
    try {
        // Fix: Initialize GoogleGenAI inside function to ensure latest API key is used
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { text: prompt },
                    {
                        inlineData: {
                            mimeType: mimeType,
                            data: imageBase64
                        }
                    }
                ]
            }
            // Fix: Removed responseModalities as it's not supported/necessary for this model series in this context
        });

        const parts = response.candidates?.[0]?.content?.parts;
        if (!parts) throw new Error("No content returned from Gemini.");

        const imagePart = parts.find(part => part.inlineData);

        if (imagePart && imagePart.inlineData && imagePart.inlineData.data) {
            return imagePart.inlineData.data;
        }

        throw new Error("No image data found in the response.");
    } catch (error) {
        return handleGeminiError(error);
    }
};

/**
 * Sends a Subject image, a Scene image, and a Style prompt to Gemini to merge them.
 */
export const generateMergeImage = async (
    subjectBase64: string,
    subjectMimeType: string,
    sceneBase64: string,
    sceneMimeType: string,
    stylePrompt: string,
    removeBackground: boolean = true
): Promise<string> => {
    try {
        // Fix: Initialize GoogleGenAI inside function to ensure latest API key is used
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const bgInstruction = removeBackground 
            ? "extracting the main subject from the first image (remove its original background) and placing it" 
            : "placing the first image (without removing its background)";

        const prompt = `Create a new image by ${bgInstruction} into the scene/background of the second image. 
        Apply the following style/description to the final image: "${stylePrompt}".
        Ensure the lighting and perspective match for a cohesive result.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { text: prompt },
                    {
                        inlineData: {
                            mimeType: subjectMimeType,
                            data: subjectBase64
                        }
                    },
                    {
                        inlineData: {
                            mimeType: sceneMimeType,
                            data: sceneBase64
                        }
                    }
                ]
            }
            // Fix: Removed responseModalities
        });

        const parts = response.candidates?.[0]?.content?.parts;
        if (!parts) throw new Error("No content returned from Gemini.");

        const imagePart = parts.find(part => part.inlineData);

        if (imagePart && imagePart.inlineData && imagePart.inlineData.data) {
            return imagePart.inlineData.data;
        }

        throw new Error("No image data found in the response.");
    } catch (error) {
        return handleGeminiError(error);
    }
};

/**
 * Generates a video using Veo model from an image and a style prompt.
 */
export const generateVideo = async (
    imageBase64: string,
    mimeType: string,
    prompt: string
): Promise<string> => {
    try {
        // Fix: Create a new GoogleGenAI instance right before making an API call
        const freshAi = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const effectivePrompt = prompt || "A cinematic video of this subject";

        let operation = await freshAi.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: effectivePrompt,
            image: {
                imageBytes: imageBase64,
                mimeType: mimeType,
            },
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: '16:9'
            }
        });

        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000));
            operation = await freshAi.operations.getVideosOperation({operation: operation});
        }

        if (operation.error) {
            return handleGeminiError(operation.error);
        }

        const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (!videoUri) throw new Error("No video URI returned.");

        const videoResponse = await fetch(`${videoUri}&key=${process.env.API_KEY}`);
        if (!videoResponse.ok) throw new Error("Failed to download generated video.");
        
        const blob = await videoResponse.blob();
        return URL.createObjectURL(blob);

    } catch (error) {
        return handleGeminiError(error);
    }
};
