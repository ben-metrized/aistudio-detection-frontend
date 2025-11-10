
import React, { useState } from 'react';
import type { Project } from './types';
import ProjectCreation from './components/ProjectCreation';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [project, setProject] = useState<Project | null>(null);

  const handleProjectCreate = (newProject: Project) => {
    setProject(newProject);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {project ? (
        <Dashboard project={project} />
      ) : (
        <ProjectCreation onProjectCreate={handleProjectCreate} />
      )}
    </div>
  );
};

export default App;
