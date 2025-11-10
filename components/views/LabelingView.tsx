
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Project, ImageData, BoundingBox, Point } from '../../types';

interface LabelingViewProps {
  project: Project;
  onProjectUpdate: (project: Project) => void;
}

const LabelingView: React.FC<LabelingViewProps> = ({ project, onProjectUpdate }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [boxes, setBoxes] = useState<BoundingBox[]>(project.images[currentImageIndex]?.boxes || []);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [endPoint, setEndPoint] = useState<Point | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  const currentImage = project.images[currentImageIndex];

  useEffect(() => {
    setBoxes(project.images[currentImageIndex]?.boxes || []);
  }, [currentImageIndex, project.images]);
  
  const getMousePos = (e: React.MouseEvent<SVGSVGElement>): Point | null => {
    if (!imageContainerRef.current) return null;
    const rect = imageContainerRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    const point = getMousePos(e);
    if (!point) return;
    setIsDrawing(true);
    setStartPoint(point);
    setEndPoint(point);
  };
  
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDrawing || !startPoint) return;
    const point = getMousePos(e);
    if (!point) return;
    setEndPoint(point);
  };

  const handleMouseUp = () => {
    if (!isDrawing || !startPoint || !endPoint) return;
    setIsDrawing(false);

    const newBox: BoundingBox = {
      id: `box_${Date.now()}`,
      x: Math.min(startPoint.x, endPoint.x),
      y: Math.min(startPoint.y, endPoint.y),
      width: Math.abs(startPoint.x - endPoint.x),
      height: Math.abs(startPoint.y - endPoint.y),
      label: prompt('Enter label for this box:') || 'unlabeled',
    };

    if (newBox.width > 5 && newBox.height > 5) {
      const updatedBoxes = [...boxes, newBox];
      setBoxes(updatedBoxes);
      
      const updatedImages = [...project.images];
      updatedImages[currentImageIndex] = { ...currentImage, boxes: updatedBoxes };
      onProjectUpdate({ ...project, images: updatedImages });
    }
    
    setStartPoint(null);
    setEndPoint(null);
  };
  
  const changeImage = (direction: 'next' | 'prev') => {
      const newIndex = direction === 'next' 
          ? (currentImageIndex + 1) % project.images.length
          : (currentImageIndex - 1 + project.images.length) % project.images.length;
      setCurrentImageIndex(newIndex);
  };

  return (
    <div className="flex h-full max-h-[calc(100vh-4rem)]">
      <div className="w-48 flex-shrink-0 overflow-y-auto bg-gray-800 p-2 space-y-2">
        {project.images.map((img, index) => (
          <img
            key={img.id}
            src={img.url}
            alt={img.name}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-full h-auto object-cover rounded-md cursor-pointer border-2 ${index === currentImageIndex ? 'border-blue-500' : 'border-transparent'}`}
          />
        ))}
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div ref={imageContainerRef} className="relative w-full h-full max-w-4xl max-h-[80vh]">
          <img src={currentImage?.url} alt={currentImage?.name} className="max-w-full max-h-full object-contain" />
          <svg
            className="absolute top-0 left-0 w-full h-full"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {boxes.map(box => (
              <rect
                key={box.id}
                x={box.x}
                y={box.y}
                width={box.width}
                height={box.height}
                className="fill-blue-500 fill-opacity-20 stroke-blue-400 stroke-2"
              />
            ))}
            {isDrawing && startPoint && endPoint && (
              <rect
                x={Math.min(startPoint.x, endPoint.x)}
                y={Math.min(startPoint.y, endPoint.y)}
                width={Math.abs(startPoint.x - endPoint.x)}
                height={Math.abs(startPoint.y - endPoint.y)}
                className="fill-green-500 fill-opacity-30 stroke-green-400 stroke-2"
              />
            )}
          </svg>
        </div>
        <div className="mt-4 flex space-x-4">
            <button onClick={() => changeImage('prev')} className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600">Previous</button>
            <span>{currentImageIndex + 1} / {project.images.length}</span>
            <button onClick={() => changeImage('next')} className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600">Next</button>
        </div>
      </div>
      <div className="w-64 flex-shrink-0 bg-gray-800 p-4 overflow-y-auto">
        <h3 className="text-lg font-semibold text-white mb-4">Annotations</h3>
        <ul className="space-y-2">
            {boxes.map(box => (
                <li key={box.id} className="bg-gray-700 p-2 rounded-md text-sm">
                    {box.label}
                </li>
            ))}
            {boxes.length === 0 && <li className="text-gray-400 text-sm">No annotations for this image.</li>}
        </ul>
      </div>
    </div>
  );
};

export default LabelingView;
