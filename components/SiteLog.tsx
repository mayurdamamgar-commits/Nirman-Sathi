import React, { useState } from 'react';
import { generateSiteReport } from '../services/geminiService';
import Spinner from './Spinner';

interface ReportData {
  // Fix: Add index signature to satisfy the type `{ [key: string]: string | number; }` for the generateSiteReport function.
  [key: string]: string;
  project: string;
  date: string;
  notes: string;
  skilledLabor: string;
  unskilledLabor: string;
  materials: string;
  equipment: string;
  activities: string;
}

const SiteLog: React.FC = () => {
  const [formData, setFormData] = useState<ReportData>({
    project: 'Project Alpha',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    skilledLabor: '0',
    unskilledLabor: '0',
    materials: '',
    equipment: '',
    activities: '',
  });
  const [report, setReport] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const sampleNotes = `
- Rebar F1-F5 done
- PCC west side poured
- 50 cement bags arrived
- Team size 12 workers
- Issue: Water pump not working since morning.
  `.trim();

  const handleGenerateReport = async () => {
    if (!formData.notes.trim() && !formData.activities.trim()) {
      setError('Please enter some Field Notes or Key Activities to generate a report.');
      return;
    }
    setIsLoading(true);
    setError('');
    setReport('');
    try {
      const result = await generateSiteReport(formData);
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
        <h1 className="text-3xl font-bold text-gray-800">SiteLog Daily Reporting</h1>
        <p className="text-md text-gray-500 mt-1">Enter field notes and let AI format them professionally.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Create Daily Progress Report</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Select Project *">
                <select name="project" value={formData.project} onChange={handleInputChange} className="w-full p-2 border rounded-md bg-white text-gray-900">
                    <option>Project Alpha</option>
                    <option>Project Beta</option>
                    <option>Project Gamma</option>
                </select>
            </FormField>
             <FormField label="Date *">
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full p-2 border rounded-md bg-white text-gray-900" />
            </FormField>
          </div>
          
           <FormField label="Field Notes / Rough Notes *">
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="e.g., - Rebar F1-F5 done..."
                className="w-full h-24 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition bg-white text-gray-900"
              />
               <button onClick={() => setFormData({...formData, notes: sampleNotes})} className="mt-1 text-xs text-blue-600 hover:underline">
                Use Sample Notes
              </button>
           </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Skilled Labor">
                <input type="number" name="skilledLabor" value={formData.skilledLabor} onChange={handleInputChange} className="w-full p-2 border rounded-md bg-white text-gray-900" />
            </FormField>
            <FormField label="Unskilled Labor">
                <input type="number" name="unskilledLabor" value={formData.unskilledLabor} onChange={handleInputChange} className="w-full p-2 border rounded-md bg-white text-gray-900" />
            </FormField>
          </div>

          <FormField label="Materials Received">
              <input type="text" name="materials" value={formData.materials} onChange={handleInputChange} placeholder="e.g., 50 bags cement, 2 tons steel" className="w-full p-2 border rounded-md bg-white text-gray-900"/>
          </FormField>
           <FormField label="Equipment Used">
              <input type="text" name="equipment" value={formData.equipment} onChange={handleInputChange} placeholder="e.g., Concrete mixer, JCB" className="w-full p-2 border rounded-md bg-white text-gray-900"/>
          </FormField>
          <FormField label="Key Activities">
              <input type="text" name="activities" value={formData.activities} onChange={handleInputChange} placeholder="e.g., Foundation work, Column casting" className="w-full p-2 border rounded-md bg-white text-gray-900"/>
          </FormField>

          <button
            onClick={handleGenerateReport}
            disabled={isLoading}
            className="mt-4 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
          >
            {isLoading ? <Spinner/> : 'Format with AI'}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* Output Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Generated Progress Report</h2>
           <div className="prose prose-sm max-w-none h-[500px] overflow-y-auto bg-gray-50 p-4 mt-4 rounded-md border">
             {isLoading ? <div className="flex justify-center items-center h-full"><Spinner /></div> : report ? <pre className="whitespace-pre-wrap font-sans">{report}</pre> : <p className="text-gray-500 text-center py-4">Your formatted report will appear here.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteLog;