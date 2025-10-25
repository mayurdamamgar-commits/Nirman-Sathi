
import React from 'react';
import { View } from '../types';
import CubeIcon from './icons/CubeIcon';
import WrenchIcon from './icons/WrenchIcon';
import ClipboardIcon from './icons/ClipboardIcon';
import MagicWandIcon from './icons/MagicWandIcon';
import BuildingIcon from './icons/BuildingIcon';
import PaintBrushIcon from './icons/PaintBrushIcon';

interface DashboardProps {
  setActiveView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveView }) => {

  const FeatureCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    view: View;
  }> = ({ icon, title, description, view }) => (
    <div
      onClick={() => setActiveView(view)}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-center">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
          {icon}
        </div>
        <h3 className="text-lg font-semibold ml-4 text-gray-800">{title}</h3>
      </div>
      <p className="mt-4 text-gray-600 text-sm">
        {description}
      </p>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to NirmanSathi</h1>
        <p className="text-lg text-gray-500 mt-2">Your intelligent construction platform for a seamless workflow from concept to completion.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={<CubeIcon className="w-7 h-7" />}
          title="Resource Hub"
          description="Digitize procurement. Source materials, rent equipment, and hire skilled labor from verified local vendors."
          view={View.RESOURCE_HUB}
        />
        <FeatureCard
          icon={<WrenchIcon className="w-7 h-7" />}
          title="MixMaster"
          description="Design professional concrete mixes based on IS 10262:2009. Generate technical reports for compliance and durability."
          view={View.MIX_MASTER}
        />
        <FeatureCard
          icon={<ClipboardIcon className="w-7 h-7" />}
          title="SiteLog Reporting"
          description="Simplify daily progress reporting. Let our AI convert your rough notes into well-structured, shareable reports."
          view={View.SITE_LOG}
        />
        <FeatureCard
          icon={<MagicWandIcon className="w-7 h-7" />}
          title="AI Co-Pilot Suite"
          description="Leverage AI to generate floor plans, estimate costs, and get material recommendations from inspiration images."
          view={View.AI_COPILOT}
        />
        <FeatureCard
          icon={<PaintBrushIcon className="w-7 h-7" />}
          title="Building Interiors"
          description="Discover top-rated interior designers to bring your architectural vision to life with stunning aesthetics."
          view={View.BUILDING_INTERIORS}
        />
         <FeatureCard
          icon={<BuildingIcon className="w-7 h-7" />}
          title="Full Building Contracts"
          description="Connect with top-rated, verified contractors for your complete turnkey project requirements."
          view={View.FULL_CONTRACT}
        />
      </div>
    </div>
  );
};

export default Dashboard;
