
import React, { useState } from 'react';
import type { Project } from '../types';
import { DashboardIcon, DeduplicateIcon, LabelIcon, TrainIcon, InferenceIcon, ExportIcon, FolderIcon } from './Icons';
import DashboardView from './views/DashboardView';
import DeduplicationView from './views/DeduplicationView';
import LabelingView from './views/LabelingView';
import TrainingView from './views/TrainingView';
import InferenceView from './views/InferenceView';
import ExportView from './views/ExportView';

type View = 'dashboard' | 'deduplication' | 'labeling' | 'training' | 'inference' | 'export';

interface DashboardProps {
  project: Project;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
    }`}
  >
    {icon}
    <span className="ml-4">{label}</span>
  </button>
);

const Dashboard: React.FC<DashboardProps> = ({ project: initialProject }) => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [project, setProject] = useState<Project>(initialProject);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView project={project} />;
      case 'deduplication':
        return <DeduplicationView project={project} />;
      case 'labeling':
        return <LabelingView project={project} onProjectUpdate={setProject} />;
      case 'training':
        return <TrainingView />;
      case 'inference':
        return <InferenceView />;
      case 'export':
        return <ExportView />;
      default:
        return <DashboardView project={project} />;
    }
  };
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon className="w-5 h-5" /> },
    { id: 'deduplication', label: 'Deduplication', icon: <DeduplicateIcon className="w-5 h-5" /> },
    { id: 'labeling', label: 'Labeling', icon: <LabelIcon className="w-5 h-5" /> },
    { id: 'training', label: 'Training', icon: <TrainIcon className="w-5 h-5" /> },
    { id: 'inference', label: 'Inference', icon: <InferenceIcon className="w-5 h-5" /> },
    { id: 'export', label: 'Export', icon: <ExportIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-900">
      <aside className="w-64 flex-shrink-0 bg-gray-800 p-4 border-r border-gray-700 flex flex-col">
        <div className="flex items-center mb-8">
            <FolderIcon className="w-8 h-8 text-blue-500"/>
            <h1 className="text-xl font-bold ml-3 truncate text-white">{project.name}</h1>
        </div>
        <nav className="space-y-2">
            {navItems.map(item => (
                <NavItem 
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    isActive={activeView === item.id}
                    onClick={() => setActiveView(item.id as View)}
                />
            ))}
        </nav>
        <div className="mt-auto text-center text-gray-500 text-xs">
            <p>Onsite Trainer v1.0</p>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        {renderView()}
      </main>
    </div>
  );
};

export default Dashboard;
