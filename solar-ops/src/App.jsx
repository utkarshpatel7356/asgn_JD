import { useEffect, useState } from 'react';
import { map_ICR17 } from './data/map_ICR17';
import { calculateBounds, processMapData } from './utils/geoUtils';
import SolarMap from './components/SolarMap';

function App() {
  const [mapState, setMapState] = useState({
    processedData: null,
    bounds: null,
    isReady: false
  });

  useEffect(() => {
    // 1. Process the data
    const bounds = calculateBounds(map_ICR17.areas);
    const processedData = processMapData(map_ICR17);

    // 2. Set state
    setMapState({
      processedData,
      bounds,
      isReady: true
    });
  }, []);

  if (!mapState.isReady) {
    return <div className="h-screen w-screen bg-slate-900 text-cyan-500 flex items-center justify-center">Loading Assets...</div>;
  }

  return (
    <div className="h-screen w-screen relative">
      {/* MAP LAYER */}
      <SolarMap 
        mapData={mapState.processedData} 
        bounds={mapState.bounds} 
      />
      
      {/* UI OVERLAY (Placeholder for Phase 4) */}
      <div className="absolute top-5 left-5 z-[1000] bg-slate-900/80 p-4 rounded border border-cyan-500/30 backdrop-blur-md">
        <h1 className="text-xl font-bold text-white">SuperPower <span className="text-cyan-400">SolarOps</span></h1>
        <p className="text-xs text-gray-400">Site: ICR17</p>
      </div>
    </div>
  );
}

export default App;