
import React, { useState } from 'react';
import { ExportIcon } from '../Icons';

const ExportView: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState('');

  const handleExport = () => {
    setIsExporting(true);
    setExportStatus('Exporting model...');
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      setExportStatus('Model successfully exported to model.onnx');
    }, 2000);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">Export Model</h2>
      <div className="bg-gray-800 p-8 rounded-lg max-w-lg mx-auto text-center">
        <ExportIcon className="mx-auto h-16 w-16 text-blue-500 mb-4" />
        <h3 className="text-xl font-semibold text-white">Export to ONNX</h3>
        <p className="text-gray-400 mt-2 mb-6">
          Export your trained model to the Open Neural Network Exchange (ONNX) format for cross-platform compatibility and accelerated inference.
        </p>
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-600 inline-flex items-center"
        >
           {isExporting && (
             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
           )}
          {isExporting ? 'Exporting...' : 'Export Model'}
        </button>
        {exportStatus && (
            <p className="mt-4 text-sm text-green-400">{exportStatus}</p>
        )}
      </div>
    </div>
  );
};

export default ExportView;
