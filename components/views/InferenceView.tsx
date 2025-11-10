
import React, { useState, useRef } from 'react';
import type { BoundingBox } from '../../types';
import { UploadIcon } from '../Icons';

const InferenceView: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [boxes, setBoxes] = useState<BoundingBox[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        // Mock inference results
        setTimeout(runMockInference, 500); 
      };
      reader.readAsDataURL(file);
    }
  };

  const runMockInference = () => {
    if (imageRef.current) {
        const { width, height } = imageRef.current;
        const mockBoxes: BoundingBox[] = [
            { id: 'inf1', x: width * 0.1, y: height * 0.2, width: width * 0.3, height: height * 0.4, label: 'car (0.92)' },
            { id: 'inf2', x: width * 0.5, y: height * 0.4, width: width * 0.2, height: height * 0.2, label: 'person (0.88)' },
        ];
        setBoxes(mockBoxes);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">Run Inference</h2>
      <div className="bg-gray-800 p-6 rounded-lg">
        {!image ? (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-gray-600 border-dashed rounded-lg">
             <UploadIcon className="h-12 w-12 text-gray-500" />
            <label htmlFor="inference-upload" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700">
              Upload Image for Inference
            </label>
            <input id="inference-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
             <p className="mt-2 text-sm text-gray-400">Upload an image to see the model's predictions.</p>
          </div>
        ) : (
          <div className="relative inline-block">
            <img ref={imageRef} src={image} alt="Inference" className="max-w-full max-h-[70vh] rounded-md" />
            {boxes.map(box => (
              <div key={box.id}>
                <div
                  className="absolute border-2 border-green-400"
                  style={{ left: box.x, top: box.y, width: box.width, height: box.height }}
                />
                <div 
                    className="absolute bg-green-400 text-black text-xs font-bold p-1 rounded-sm"
                    style={{ left: box.x, top: box.y - 20 }}
                >
                    {box.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InferenceView;
