import { useEffect, useState } from 'react';
import { map_ICR17 } from './data/map_ICR17';
// REMOVED: import { pr_ICR17 } ... (We use the service now)
import { calculateBounds, processMapData } from './utils/geoUtils';
// REMOVED: import { getDates } ... (The service provides the timeline)
import SolarMap from './components/SolarMap';
import { generateInsights } from './utils/analytics';
import InsightsPanel from './components/InsightsPanel';
import { getUnifiedPerformanceData } from './services/dataService';

function App() {
  const [appState, setAppState] = useState({
    processedMap: null,
    bounds: null,
    dates: [],
    performanceData: null, // Added explicit initial state
    isReady: false
  });

  const [dateIndex, setDateIndex] = useState(0);

  useEffect(() => {
    // 1. Process Geometry
    const bounds = calculateBounds(map_ICR17.areas);
    const processedMap = processMapData(map_ICR17);
    
    // 2. Ingest Unified Data (2024 + 2025)
    // The service handles the merging and sorting logic
    const { timeline, values } = getUnifiedPerformanceData();

    setAppState({
      processedMap,
      bounds,
      dates: timeline,       // The dynamic timeline
      performanceData: values, // The unified dataset
      isReady: true
    });
  }, []);

  if (!appState.isReady) return <div className="h-screen w-screen bg-slate-900 flex items-center justify-center text-cyan-400 animate-pulse">Initializing Solar Ops...</div>;

  // Derive current data
  const currentDate = appState.dates[dateIndex];
  const currentPerformance = appState.performanceData ? appState.performanceData[currentDate] : null;

  // Derive PREVIOUS day data (for AI trend analysis)
  const prevDate = dateIndex > 0 ? appState.dates[dateIndex - 1] : null;
  const prevPerformance = prevDate ? appState.performanceData[prevDate] : null;

  // Run the AI Engine
  const analysis = generateInsights(currentDate, currentPerformance, prevPerformance);

  return (
    <div className="h-screen w-screen relative font-sans bg-slate-900">
      
      {/* 1. The Map Layer */}
      <SolarMap 
        mapData={appState.processedMap} 
        bounds={appState.bounds} 
        currentDayData={currentPerformance} 
      />
      
      {/* 2. The AI Insights Layer */}
      <InsightsPanel data={analysis}/>
      
      {/* 3. The HUD (Heads Up Display) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-3/4 max-w-2xl bg-slate-900/90 border border-slate-700 p-6 rounded-2xl backdrop-blur-xl z-[1000] shadow-2xl shadow-black">
        
        {/* Header Info */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-gray-400 text-xs uppercase tracking-widest font-bold">Timeline Control</h2>
            <h1 className="text-3xl text-white font-mono font-bold mt-1">
              {currentDate}
            </h1>
          </div>
          <div className="text-right">
             <span className="text-cyan-400 font-bold text-sm">Site Status: Active</span>
          </div>
        </div>
        
        {/* The Slider */}
        <input 
          type="range" 
          min="0" 
          max={appState.dates.length - 1} 
          value={dateIndex}
          onChange={(e) => setDateIndex(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400 hover:accent-cyan-300 transition-all"
        />
        
        {/* Legend */}
        <div className="flex gap-4 mt-4 text-xs text-gray-400 font-mono">
           <div className="flex items-center"><span className="w-3 h-3 bg-cyan-400 rounded-full mr-2"></span> Optimal</div>
           <div className="flex items-center"><span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span> Warning</div>
           <div className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span> Critical</div>
           <div className="flex items-center"><span className="w-3 h-3 bg-slate-700 rounded-full mr-2"></span> Offline</div>
        </div>

      </div>
    </div>
  );
}

export default App;