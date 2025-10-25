import React, { useState } from 'react';
import { generateFloorPlanDescription, generateBOQ, recommendMaterials } from '../services/geminiService';
import Spinner from './Spinner';

type Tab = 'design' | 'boq' | 'materials';

const AICoPilot: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('design');

    // State for Generative Design
    const [constraints, setConstraints] = useState({
        plotLength: '50',
        plotWidth: '40',
        bedrooms: '2',
        bathrooms: '2',
        budget: '50',
        designStyle: 'Modern'
    });
    const [floorPlan, setFloorPlan] = useState('');
    const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

    // State for BOQ
    const [boq, setBoq] = useState<any[]>([]);
    const [isGeneratingBoq, setIsGeneratingBoq] = useState(false);

    // State for Material Recommender
    const [inspirationImage, setInspirationImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [stylePref, setStylePref] = useState('exterior');
    const [materials, setMaterials] = useState('');
    const [isRecommending, setIsRecommending] = useState(false);


    const handleConstraintChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setConstraints({ ...constraints, [e.target.name]: e.target.value });
    };

    const handleGeneratePlan = async () => {
        setIsGeneratingPlan(true);
        setFloorPlan('');
        const result = await generateFloorPlanDescription(constraints);
        setFloorPlan(result);
        setIsGeneratingPlan(false);
    };

    const handleGenerateBoq = async () => {
        if (!floorPlan) {
            alert("Please generate a floor plan description first.");
            return;
        }
        setIsGeneratingBoq(true);
        setBoq([]);
        const result = await generateBOQ(floorPlan);
        try {
            // Gemini with responseSchema should return valid JSON, but we clean and parse just in case
            let jsonStr = result.trim();
            if (jsonStr.startsWith('```json')) {
              jsonStr = jsonStr.substring(7, jsonStr.length - 3).trim();
            } else if (jsonStr.startsWith('```')) {
              jsonStr = jsonStr.substring(3, jsonStr.length - 3).trim();
            }
            setBoq(JSON.parse(jsonStr));
        } catch (error) {
            console.error("Failed to parse BOQ JSON:", error);
            alert("Could not generate a valid BOQ. The AI's response might be malformed.");
        }
        setIsGeneratingBoq(false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setInspirationImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleRecommendMaterials = async () => {
        if (!inspirationImage) {
            alert("Please upload an inspiration image.");
            return;
        }
        setIsRecommending(true);
        setMaterials('');
        const result = await recommendMaterials(inspirationImage, stylePref);
        setMaterials(result);
        setIsRecommending(false);
    };

    const TabButton: React.FC<{ tabName: Tab; label: string }> = ({ tabName, label }) => (
        <button
          onClick={() => setActiveTab(tabName)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            activeTab === tabName
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          {label}
        </button>
      );

    return (
        <div className="animate-fade-in">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">AI Co-Pilot Suite</h1>
                <p className="text-md text-gray-500 mt-1">Simplify complex tasks and turbocharge design creativity.</p>
            </header>

            <div className="flex space-x-2 p-1 bg-white rounded-lg shadow-sm w-min mb-6">
                <TabButton tabName="design" label="Generative Design" />
                <TabButton tabName="boq" label="Cost & BOQ" />
                <TabButton tabName="materials" label="Material Recommender" />
            </div>

            {activeTab === 'design' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-4">Design Constraints</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Plot Dimensions (ft)</label>
                                <div className="flex space-x-2 mt-1">
                                    <input type="number" name="plotLength" value={constraints.plotLength} onChange={handleConstraintChange} placeholder="Length" className="w-full p-2 border rounded-md bg-white text-gray-900"/>
                                    <input type="number" name="plotWidth" value={constraints.plotWidth} onChange={handleConstraintChange} placeholder="Width" className="w-full p-2 border rounded-md bg-white text-gray-900"/>
                                </div>
                            </div>
                             <div>
                                <label className="text-sm font-medium">Room Requirements</label>
                                <div className="flex space-x-2 mt-1">
                                    <input type="number" name="bedrooms" value={constraints.bedrooms} onChange={handleConstraintChange} placeholder="Bedrooms" className="w-full p-2 border rounded-md bg-white text-gray-900"/>
                                    <input type="number" name="bathrooms" value={constraints.bathrooms} onChange={handleConstraintChange} placeholder="Bathrooms" className="w-full p-2 border rounded-md bg-white text-gray-900"/>
                                </div>
                            </div>
                             <div>
                                <label className="text-sm font-medium">Budget (₹ Lakhs) - Optional</label>
                                <input type="number" name="budget" value={constraints.budget} onChange={handleConstraintChange} placeholder="e.g., 50" className="w-full p-2 border rounded-md mt-1 bg-white text-gray-900"/>
                            </div>
                            <button onClick={handleGeneratePlan} disabled={isGeneratingPlan} className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">
                                {isGeneratingPlan ? <Spinner /> : "Generate Floor Plan"}
                            </button>
                        </div>
                    </div>
                    <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-4">AI-Generated Floor Plan</h3>
                        {isGeneratingPlan ? <Spinner /> : floorPlan ? <div className="prose prose-sm max-w-none"><pre className="whitespace-pre-wrap font-sans">{floorPlan}</pre></div> : <p>Your plan description will appear here.</p>}
                    </div>
                </div>
            )}
            
            {activeTab === 'boq' && (
                 <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-semibold text-lg mb-4">Bill of Quantities (BOQ) Estimator</h3>
                    <p className="text-sm text-gray-600 mb-4">Generate a BOQ based on the floor plan description from the 'Generative Design' tab.</p>
                    <button onClick={handleGenerateBoq} disabled={isGeneratingBoq || !floorPlan} className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">
                        {isGeneratingBoq ? <Spinner /> : "Estimate BOQ"}
                    </button>
                    {isGeneratingBoq && <div className="mt-4"><Spinner /></div>}
                    {boq.length > 0 && (
                        <div className="mt-6 overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {boq.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.item}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.unit}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                 </div>
            )}

            {activeTab === 'materials' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-4">Material Recommender</h3>
                        <div className="space-y-4">
                             <div>
                                <label className="text-sm font-medium">Upload Inspiration Image</label>
                                <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 rounded-md w-full h-auto"/>}
                             </div>
                            <button onClick={handleRecommendMaterials} disabled={isRecommending || !inspirationImage} className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">
                                {isRecommending ? <Spinner /> : "Get Recommendations"}
                            </button>
                        </div>
                    </div>
                    <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg mb-4">AI-Powered Material Suggestions</h3>
                        {isRecommending ? <Spinner /> : materials ? <div className="prose prose-sm max-w-none"><pre className="whitespace-pre-wrap font-sans">{materials}</pre></div> : <p>Your material recommendations will appear here.</p>}
                    </div>
                </div>
            )}

        </div>
    );
};

export default AICoPilot;