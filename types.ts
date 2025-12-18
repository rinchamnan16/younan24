import React from 'react';

export interface Preset {
    id: string;
    label: string;
    prompt: string;
}

export interface BackgroundOption {
    id: string;
    label: string;
    prompt: string;
    colorClass: string;
    style?: React.CSSProperties;
}

export type AspectRatio = 'original' | '3x2' | '2x3' | '1x1';

export type ThemeOption = 'light' | 'dark' | 'pink' | 'red' | 'blue' | 'gray-gradient' | 'pink-gradient' | 'red-gradient' | 'christmas';

export interface AppSettings {
    theme: ThemeOption;
    titleKh: string;
    titleKhColor: string;
    titleEn: string;
    titleEnColor: string;
    description: string;
    descriptionColor: string;
    phoneScroll: string;
    phoneScrollColor: string;
    addressScroll: string;
    addressScrollColor: string;
    profileImage?: string;
    profileName?: string;
    profileDob?: string;
}

export const UNIFORM_PRESETS: Preset[] = [
    { id: 'none', label: 'No Uniform / Custom Prompt', prompt: "" },
    { id: 'NO Replace New Shirt', label: 'NOReplaceNewShirt', prompt: "Fix any wrinkles on the shirt. Balance and refine the hair. Ensure the final image is suitable for a student ID or passport photo. Keep shirt Style and Original Logo. Maintains the original shape of the face, adding radiance and even skin tone." },
    { id: 'jacket-office', label: 'Jacket Office Uniform (Professional)', prompt: "Remove any existing logos. Replace the clothes with a modern, tailored business office jacket and matching shirt with a sharp collar. Ensure the shirt is clean and wrinkle-free, and the hair is professionally styled. Maintains the original shape of the face, adding radiance and even skin tone." },
    { id: 'men', label: "Men's Office Uniform (Shirt/Tie)", prompt: "Remove any logo from the shirt. Fix any wrinkles on the shirt. Balance and refine the hair. Add a blue tie and an office uniform jacket for a man. Ensure the shirt is a clean white, suitable for a professional setting. Maintains the original shape of the face, adding radiance and even skin tone." },
    { id: 'women', label: "Women's Office Uniform (Shirt)", prompt: "Remove any logo from the shirt. Fix any wrinkles on the shirt. Balance and refine the hair. Do not add a blue tie. Add an office uniform jacket for a woman. Ensure the shirt is a clean white, suitable for a professional setting. Maintains the original shape of the face, adding radiance and even skin tone." },
    { id: 'white-shirt', label: "White Shirt with Collar (Dress)", prompt: "Update the clothing to a new, crisp white dress shirt with a sharp, defined collar. Remove any logo, fix any wrinkles, and ensure the shirt fits well. Refine the hair and face for a polished professional look. Maintains the original shape of the face, adding radiance and even skin tone." },
    { id: 'student', label: "Student White Shirt Update", prompt: "Change the shirt to a new, crisp white student shirt, or update the existing white shirt to look new and clean. Fix any wrinkles on the shirt. Balance and refine the hair. Maintains the original shape of the face, adding radiance and even skin tone." },
    { id: 'tshirt-collar', label: "T-shirt with Collar (Polo)", prompt: "Replace the clothing with a clean, well-fitting polo shirt in a solid, neutral color (navy blue or black). Ensure the collar is neat and wrinkle-free. Maintains the original shape of the face, adding radiance and even skin tone." },
    { id: 'tshirt-random', label: "T-shirt with Collar (Random)", prompt: "Replace the clothing with a clean, well-fitting polo shirt in a random stylish pattern. Ensure the collar is neat and wrinkle-free. Maintains the original shape of the face, adding radiance and even skin tone." },
    { id: 'pattern-shirt', label: "Pattern Shirt with Collar", prompt: "Replace the clothing with a stylish button-down shirt featuring a subtle, modern pattern and sharp collar. Maintains the original shape of the face, adding radiance and even skin tone." },
    { id: 'normal-shirt', label: "Normal Plain Shirt (Casual)", prompt: "Replace the clothing with a simple, well-maintained, plain short-sleeve shirt in a solid color. Maintains the original shape of the face, adding radiance and even skin tone." }
];

export const STATE_UNIFORM_OPTIONS: Preset[] = [
    { id: 'none', label: 'No Uniform Select', prompt: "" },
    { id: 'police', label: 'Police uniforms', prompt: "-A professional portrait of a Cambodian National Police officer in official uniform. Tan/beige shirt with official police patches. Maintains original face shape and adds radiance." },
    { id: 'teacher', label: 'Teacher uniforms', prompt: "-A professional portrait of a Cambodian Teacher in official uniform. White button-up shirt with official blue epaulettes. Maintains original face shape and adds radiance." },
    { id: 'land', label: 'Land Officer uniforms', prompt: "-A professional portrait of a Cambodian Land Management officer in official uniform. Light beige or sky blue state uniform with ministry logo. Maintains original face shape and adds radiance." },
    { id: 'district_city', label: 'District/City officials', prompt: "-A professional portrait of a Cambodian District or City official. Official civil servant uniform with shoulder epaulettes. Maintains original face shape and adds radiance." },
    { id: 'provincial', label: 'Provincial officials', prompt: "-A professional portrait of a Cambodian Provincial official. Senior civil servant uniform with high quality gold epaulettes. Maintains original face shape and adds radiance." }
];

export const BACKGROUND_OPTIONS: BackgroundOption[] = [
    { id: 'Keep Original BG', label: 'Keep Original BG', prompt: "Keep Original Background. Fix shirt wrinkles. Refine hair and skin. Maintains the original shape of the face.", colorClass: 'bg-gradient-to-br from-green-400 to-amber-600' },
    { id: 'natural', label: 'Natural', prompt: "Remove existing background and replace with a professional blurred natural background (garden or soft office window).", colorClass: 'bg-gradient-to-br from-green-400 to-blue-400' },
    { id: 'white', label: 'White', prompt: "Remove background and replace with clean solid white color.", colorClass: 'bg-white' },
    { id: 'blue', label: 'Blue', prompt: "Remove background and replace with specifically sky-blue shade #00a9ff for passport photos.", colorClass: '', style: { backgroundColor: '#00a9ff' } },
    { id: 'green', label: 'Green', prompt: "Remove background and replace with solid light green color.", colorClass: 'bg-green-500' },
    { id: 'red', label: 'Red', prompt: "Remove background and replace with solid deep red color.", colorClass: 'bg-red-600' },
    { id: 'red-gradient', label: 'Red Gradient', prompt: "Remove background and replace with smooth red gradient (light coral to rose red).", colorClass: 'bg-gradient-to-br from-red-300 to-red-800' },
    { id: 'blue-gradient', label: 'Blue Gradient', prompt: "Remove background and replace with smooth blue gradient (sky blue to muted navy).", colorClass: 'bg-gradient-to-br from-blue-300 to-blue-800' },
    { id: 'gray-gradient', label: 'Gray Gradient', prompt: "Remove background and replace with smooth gray gradient (silver to dark charcoal).", colorClass: 'bg-gradient-to-br from-gray-300 to-gray-700' },
];

export const UNBLUR_PROMPT = "Sharpen and enhance the details of this photo. Remove motion blur, grain, and noise. Increase the resolution and clarity for professional printing quality.";