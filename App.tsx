import React, { useState } from 'react';
import { View } from './types';
import Dashboard from './components/Dashboard';
import ResourceHub from './components/ResourceHub';
import MixMaster from './components/MixMaster';
import SiteLog from './components/SiteLog';
import AICoPilot from './components/AICoPilot';
import FullContract from './components/FullContract';
import HomeIcon from './components/icons/HomeIcon';
import CubeIcon from './components/icons/CubeIcon';
import WrenchIcon from './components/icons/WrenchIcon';
import ClipboardIcon from './components/icons/ClipboardIcon';
import MagicWandIcon from './components/icons/MagicWandIcon';
import BuildingIcon from './components/icons/BuildingIcon';
import PaintBrushIcon from './components/icons/PaintBrushIcon';
import BuildingInteriors from './components/BuildingInteriors';
import Welcome from './components/Welcome';
import Auth from './components/Auth';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<View | null>(null);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Auth onLoginSuccess={handleLoginSuccess} />;
  }

  const renderView = () => {
    if (currentView === null) {
        return <Welcome />;
    }
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard setActiveView={(view: View) => setCurrentView(view)} />;
      case View.RESOURCE_HUB:
        return <ResourceHub />;
      case View.MIX_MASTER:
        return <MixMaster />;
      case View.SITE_LOG:
        return <SiteLog />;
      case View.AI_COPILOT:
        return <AICoPilot />;
      case View.BUILDING_INTERIORS:
        return <BuildingInteriors />;
      case View.FULL_CONTRACT:
        return <FullContract />;
      default:
        return <Welcome />;
    }
  };

  const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    view: View;
    isActive: boolean;
    onClick: (view: View) => void;
  }> = ({ icon, label, view, isActive, onClick }) => (
    <li
      className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all duration-200 ${
        isActive
          ? 'bg-blue-100 text-blue-700 font-semibold shadow-inner'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
      onClick={() => onClick(view)}
    >
      {icon}
      <span className="ml-4">{label}</span>
    </li>
  );
  
  const navItems = [
    { icon: <HomeIcon className="w-6 h-6" />, label: 'Dashboard', view: View.DASHBOARD },
    { icon: <CubeIcon className="w-6 h-6" />, label: 'Resource Hub', view: View.RESOURCE_HUB },
    { icon: <WrenchIcon className="w-6 h-6" />, label: 'MixMaster', view: View.MIX_MASTER },
    { icon: <ClipboardIcon className="w-6 h-6" />, label: 'SiteLog', view: View.SITE_LOG },
    { icon: <MagicWandIcon className="w-6 h-6" />, label: 'AI Co-Pilot', view: View.AI_COPILOT },
    { icon: <PaintBrushIcon className="w-6 h-6" />, label: 'Building Interiors', view: View.BUILDING_INTERIORS },
    { icon: <BuildingIcon className="w-6 h-6" />, label: 'Full Contract', view: View.FULL_CONTRACT },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col p-4">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
          </div>
          <h1 className="text-xl font-bold ml-3 text-gray-800">NirmanSathi</h1>
        </div>
        <nav>
          <ul>
            {navItems.map(item => (
                <NavItem 
                    key={item.view}
                    icon={item.icon}
                    label={item.label}
                    view={item.view}
                    isActive={currentView === item.view}
                    onClick={setCurrentView}
                />
            ))}
          </ul>
        </nav>
        <div className="mt-auto p-4 bg-gray-100 rounded-lg text-center">
            <p className="text-sm text-gray-600">Empowering India's Construction Workforce</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        <div className={`p-8 ${!currentView ? 'h-full flex items-center justify-center' : ''}`}>
            {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
