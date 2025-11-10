
import React, { useState, useCallback } from 'react';
import type { Project, ImageData } from '../types';
import { UploadIcon, FolderIcon } from './Icons';

interface ProjectCreationProps {
  onProjectCreate: (project: Project) => void;
}

const ProjectCreation: React.FC<ProjectCreationProps> = ({ onProjectCreate }) => {
  const [projectName, setProjectName] = useState<string>('My Detection Project');
  const [files, setFiles] = useState<File[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleCreateProject = useCallback(() => {
    if (!projectName.trim()) {
      setError('Project name is required.');
      return;
    }
    if (files.length === 0) {
      setError('Please select at least one image.');
      return;
    }

    setIsCreating(true);
    setError('');

    // Simulate backend processing and project creation
    setTimeout(() => {
      const images: ImageData[] = files.map((file, index) => ({
        id: `img_${index}_${Date.now()}`,
        name: file.name,
        url: URL.createObjectURL(file),
        boxes: [],
      }));

      const newProject: Project = {
        name: projectName,
        images,
      };

      onProjectCreate(newProject);
      setIsCreating(false);
    }, 1500); // Simulate network delay
  }, [projectName, files, onProjectCreate]);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center">
            <FolderIcon className="mx-auto h-12 w-12 text-blue-500"/>
            <h1 className="text-3xl font-bold text-white mt-4">Create New Detection Project</h1>
            <p className="mt-2 text-gray-400">Start by giving your project a name and uploading your image dataset.</p>
        </div>
        
        <div className="space-y-6">
            <div>
                <label htmlFor="project-name" className="block text-sm font-medium text-gray-300">Project Name</label>
                <input
                    id="project-name"
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Road Sign Detection"
                />
            </div>

            <div>
                 <label htmlFor="file-upload" className="block text-sm font-medium text-gray-300 mb-2">Image Dataset</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <UploadIcon className="mx-auto h-12 w-12 text-gray-500" />
                        <div className="flex text-sm text-gray-400">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-blue-500 hover:text-blue-400 focus-within:outline-none">
                                <span>Upload a folder</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple webkitdirectory="true" directory="true" onChange={handleFileChange} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
            </div>

            {files.length > 0 && (
                <div className="text-sm text-gray-400">
                    <p>{files.length} file{files.length > 1 ? 's' : ''} selected.</p>
                </div>
            )}
            
            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
                onClick={handleCreateProject}
                disabled={isCreating}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
                {isCreating ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : 'Create Project'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreation;
