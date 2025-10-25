import React, { useState } from 'react';
import { generateMixDesign } from '../services/geminiService';
import Spinner from './Spinner';

const MixMaster: React.FC = () => {
  const [formData, setFormData] = useState({
    grade: 'M25',
    exposure: 'Mild',
    cementSg: '3.15',
    fineAggregateSg: '2.65',
    coarseAggregateSg: '2.74',
    aggregateType: 'Crushed Angular',
    gradingZone: 'Zone II',
    slump: '100',
    maxAggregateSize: '20',
    useSuperplasticizer: 'No',
  });
  const [report, setReport] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setReport('');
    try {
      const result = await generateMixDesign(formData);
      setReport(result);
    } catch (err) {
      setError('Failed to generate report. Please try again.');
      console.error(err);
    }
    setIsLoading(false);
  };

  const FormField: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
    </div>
  );

  return (
    <div className="animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">MixMaster</h1>
        <p className="text-md text-gray-500 mt-1">Professional Concrete Mix Designer based on IS 10262:2009 principles.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Design Parameters */}
            <div className="space-y-4 p-4 border rounded-md">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Design Parameters</h3>
              <FormField label="Concrete Grade *">
                <select name="grade" value={formData.grade} onChange={handleInputChange} className="w-full p-2 border rounded-md bg-white text-gray-900">
                  <option>M20</option><option>M25</option><option>M30</option><option>M35</option><option>M40</option><option>M45</option><option>M50</option>
                </select>
              </FormField>
              <FormField label="Exposure Condition (IS 456) *">
                <select name="exposure" value={formData.exposure} onChange={handleInputChange} className="w-full p-2 border rounded-md bg-white text-gray-900">
                  <option>Mild</option><option>Moderate</option><option>Severe</option><option>Very Severe</option><option>Extreme</option>
                </select>
              </FormField>
            </div>

            {/* Material Properties */}
            <div className="space-y-4 p-4 border rounded-md">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Material Properties</h3>
              <FormField label="Cement SG"><input type="text" name="cementSg" value={formData.cementSg} onChange={handleInputChange} className="w-full p-2 border rounded-md bg-white text-gray-900"/></FormField>
              <FormField label="Fine Aggregate SG"><input type="text" name="fineAggregateSg" value={formData.fineAggregateSg} onChange={handleInputChange} className="w-full p-2 border rounded-md bg-white text-gray-900"/></FormField>
              <FormField label="Coarse Aggregate SG"><input type="text" name="coarseAggregateSg" value={formData.coarseAggregateSg} onChange={handleInputChange} className="w-full p-2 border rounded-md bg-white text-gray-900"/></FormField>
              <FormField label="Aggregate Type">
                 <select name="aggregateType" value={formData.aggregateType} onChange={handleInputChange} className="w-full p-2 border rounded-md bg-white text-gray-900">
                    <option>Crushed Angular</option><option>Sub-Angular</option><option>Gravel</option>
                </select>
              </FormField>
              <FormField label="Grading Zone (Fine Aggregate)">
                 <select name="gradingZone" value={formData.gradingZone} onChange={handleInputChange} className="w-full p-2 border rounded-md bg-white text-gray-900">
                    <option>Zone I</option><option>Zone II</option><option>Zone III</option><option>Zone IV</option>
                </select>
              </FormField>
            </div>
            
            {/* Workability & Admixtures */}
            <div className="space-y-4 p-4 border rounded-md">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Workability & Admixtures</h3>
              <FormField label="Desired Slump (mm)"><input type="text" name="slump" value={formData.slump} onChange={handleInputChange} className="w-full p-2 border rounded-md bg-white text-gray-900"/></FormField>
              <FormField label="Maximum Aggregate Size (mm)">
                <select name="maxAggregateSize" value={formData.maxAggregateSize} onChange={handleInputChange} className="w-full p-2 border rounded-md bg-white text-gray-900">
                  <option>10</option>
                  <option>20</option>
                  <option>40</option>
                </select>
              </FormField>
              <FormField label="Use Superplasticizer?">
                 <select name="useSuperplasticizer" value={formData.useSuperplasticizer} onChange={handleInputChange} className="w-full p-2 border rounded-md bg-white text-gray-900">
                    <option>No</option><option>Yes</option>
                </select>
              </FormField>
            </div>

            <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400">
              {isLoading ? <Spinner /> : 'Calculate Mix Design'}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Mix Design Results</h2>
          <div className="prose prose-sm max-w-none h-[500px] overflow-y-auto bg-gray-50 p-4 rounded-md border">
            {isLoading && <div className="flex justify-center items-center h-full"><Spinner /></div>}
            {error && <p className="text-red-500">{error}</p>}
            {report ? <pre className="whitespace-pre-wrap font-mono text-xs">{report}</pre> : <div className="text-gray-500 text-center py-4">Enter parameters and click 'Calculate' to see results.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MixMaster;
