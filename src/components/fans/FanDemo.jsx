import React, { useState } from 'react';
import { SkyroFan, InaraFan, EvaaraFan, LaraFan } from './index';

const FanDemo = () => {
  const [selectedFan, setSelectedFan] = useState('skyro');

  const fanOptions = [
    { id: 'skyro', name: 'SKYRO', component: SkyroFan },
    { id: 'inara', name: 'INARA', component: InaraFan },
    { id: 'evaara', name: 'eVAARA', component: EvaaraFan },
    { id: 'lara', name: 'LARA', component: LaraFan }
  ];

  const currentFan = fanOptions.find(fan => fan.id === selectedFan);
  const FanComponent = currentFan?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]">
      {/* Fan Selector */}
      <div className="sticky top-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-[#ba6a5a]/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-white font-semibold mr-4">Select Fan:</h2>
            {fanOptions.map((fan) => (
              <button
                key={fan.id}
                onClick={() => setSelectedFan(fan.id)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedFan === fan.id
                    ? 'bg-[#ba6a5a] text-white'
                    : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#ba6a5a]/50'
                }`}
              >
                {fan.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Fan Component */}
      <div className="pt-4">
        {FanComponent && <FanComponent />}
      </div>
    </div>
  );
};

export default FanDemo;
