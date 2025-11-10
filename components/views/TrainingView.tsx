import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { TrainingMetric } from '../../types';

const TrainingView: React.FC = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [metrics, setMetrics] = useState<TrainingMetric[]>([]);
  const [epochs, setEpochs] = useState(50);
  
  useEffect(() => {
    // FIX: Changed NodeJS.Timeout to ReturnType<typeof setInterval> for browser compatibility.
    let interval: ReturnType<typeof setInterval>;
    if (isTraining && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 1, 100));
        setMetrics(prev => {
            const newEpoch = prev.length + 1;
            return [...prev, {
                epoch: newEpoch,
                loss: Math.random() * 0.5 + 0.1,
                mAP: Math.min(0.95, (prev.length > 0 ? prev[prev.length - 1].mAP : 0) + Math.random() * 0.05)
            }];
        });
      }, 1000); // Simulate one epoch per second
    } else if (progress >= epochs) {
        setIsTraining(false);
    }
    return () => clearInterval(interval);
  }, [isTraining, progress]);

  const handleStartTraining = useCallback(() => {
    setIsTraining(true);
    setProgress(0);
    setMetrics([]);
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">Model Training</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-gray-800 p-6 rounded-lg h-fit">
          <h3 className="text-xl font-bold text-white mb-4">Configuration</h3>
          <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300">Model Architecture</label>
                <select className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    <option>YOLOv8-Nano</option>
                    <option>YOLOv8-Small</option>
                    <option>EfficientDet-D0</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">Epochs: {epochs}</label>
                <input type="range" min="10" max="200" value={epochs} onChange={(e) => setEpochs(Number(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
            </div>
            <button
              onClick={handleStartTraining}
              disabled={isTraining}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-600"
            >
              {isTraining ? 'Training in Progress...' : 'Start Training'}
            </button>
          </div>
        </div>
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-4">Training Progress</h3>
          {isTraining || metrics.length > 0 ? (
            <>
              <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="text-center text-gray-300 mb-6">{`Epoch ${metrics.length} / ${epochs}`}</p>
              <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                      <LineChart data={metrics}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                          <XAxis dataKey="epoch" stroke="#a0aec0" />
                          <YAxis yAxisId="left" stroke="#a0aec0" />
                          <YAxis yAxisId="right" orientation="right" stroke="#a0aec0" />
                          <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: '1px solid #4a5568' }} />
                          <Legend />
                          <Line yAxisId="left" type="monotone" dataKey="loss" stroke="#f56565" name="Loss" />
                          <Line yAxisId="right" type="monotone" dataKey="mAP" stroke="#48bb78" name="mAP" />
                      </LineChart>
                  </ResponsiveContainer>
              </div>
            </>
          ) : (
             <div className="text-center py-10">
                <p className="text-gray-400">Training has not started yet. Configure and start training to see progress.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingView;