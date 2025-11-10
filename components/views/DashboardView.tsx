
import React from 'react';
import type { Project } from '../../types';
import { LabelIcon, TrainIcon } from '../Icons';

interface DashboardViewProps {
  project: Project;
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-gray-800 p-6 rounded-lg flex items-center">
        <div className="p-3 rounded-full bg-gray-700 text-blue-400 mr-4">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const DashboardView: React.FC<DashboardViewProps> = ({ project }) => {
    const totalImages = project.images.length;
    const labeledImages = project.images.filter(img => img.boxes.length > 0).length;
    const totalLabels = project.images.reduce((acc, img) => acc + img.boxes.length, 0);
    const uniqueClasses = new Set(project.images.flatMap(img => img.boxes.map(box => box.label))).size;

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-6">Project Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Images" value={totalImages} icon={<DashboardIcon className="w-6 h-6"/>} />
                <StatCard title="Labeled Images" value={`${labeledImages} / ${totalImages}`} icon={<LabelIcon className="w-6 h-6"/>} />
                <StatCard title="Total Annotations" value={totalLabels} icon={<DeduplicateIcon className="w-6 h-6"/>} />
                <StatCard title="Unique Classes" value={uniqueClasses} icon={<TrainIcon className="w-6 h-6"/>} />
            </div>

            <div className="mt-10 bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4">Dataset Preview</h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
                    {project.images.slice(0, 20).map(image => (
                        <div key={image.id} className="relative aspect-square group">
                            <img src={image.url} alt={image.name} className="w-full h-full object-cover rounded-md" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-white text-xs text-center p-1">{image.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
                 {project.images.length === 0 && <p className="text-gray-400">No images in this project yet.</p>}
            </div>
        </div>
    );
};

// Add placeholder icons if not imported from Icons.tsx
const DashboardIcon: React.FC<{className?:string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>;
const DeduplicateIcon: React.FC<{className?:string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg>;

export default DashboardView;
