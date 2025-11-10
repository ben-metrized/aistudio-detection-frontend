
import React from 'react';
import type { Project } from '../../types';

interface DeduplicationViewProps {
  project: Project;
}

const DeduplicationView: React.FC<DeduplicationViewProps> = ({ project }) => {
  // Mock similar image pairs. In a real app, this would come from a backend API.
  const similarPairs = project.images.length > 1 ? [
    [project.images[0], project.images[1]],
    // Add more mock pairs if there are more images
  ] : [];

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2">Deduplicate Images</h2>
      <p className="text-gray-400 mb-6">Review potential duplicate images in your dataset to improve model performance.</p>
      
      {similarPairs.length > 0 ? (
        <div className="space-y-8">
          {similarPairs.map((pair, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Potential Duplicate Pair {index + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pair.map(image => (
                  <div key={image.id} className="relative group">
                    <img src={image.url} alt={image.name} className="w-full h-auto object-cover rounded-md" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2">
                      <p className="text-white text-sm truncate">{image.name}</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50">
                        <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold text-white">No Duplicates Found</h3>
            <p className="text-gray-400 mt-2">The deduplication scan is complete, or there are not enough images to compare.</p>
        </div>
      )}
    </div>
  );
};

export default DeduplicationView;
