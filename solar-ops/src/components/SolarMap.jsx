import React, { useEffect } from 'react';
import { MapContainer, Polygon, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getAssetColor } from '../utils/styleUtils';
import 'leaflet/dist/leaflet.css';

// --- SUB-COMPONENT: Map Controller ---
// This component doesn't render anything visible.
// Its job is to grab the map instance and "fly to" our bounds immediately.
const MapController = ({ bounds }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      // Add some padding so assets aren't glued to the screen edges
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [bounds, map]);

  return null;
};

// --- MAIN COMPONENT: Solar Map ---
const SolarMap = ({ mapData, bounds, currentDayData }) => {
    if (!mapData || !bounds) return null;
  
    return (
      <MapContainer
        crs={L.CRS.Simple}
        bounds={bounds}
        minZoom={-2}
        zoomSnap={0.5}
        scrollWheelZoom={true}
        className="h-full w-full bg-slate-900"
        style={{ background: "#0f172a" }}
      >
        <MapController bounds={bounds} />
  
        {mapData.map((asset) => {
          // --- NEW LOGIC HERE ---
          // 1. Get value for this specific asset on this specific day
          const prValue = currentDayData ? currentDayData[asset.id] : null;
          
          // 2. Get the color
          const fillColor = getAssetColor(prValue);
          // ----------------------
  
          return (
            <Polygon
              key={asset.id}
              positions={asset.points}
              pathOptions={{
                color: 'white',        // Keep borders white for contrast
                weight: 0.5,           // Thinner borders look cleaner
                fillColor: fillColor,  // Dynamic Color
                fillOpacity: 0.7,      // Higher opacity for better visibility
              }}
              eventHandlers={{
                mouseover: (e) => {
                  e.target.setStyle({ fillOpacity: 1, weight: 2 });
                },
                mouseout: (e) => {
                  e.target.setStyle({ fillOpacity: 0.7, weight: 0.5 });
                },
              }}
            >
              <Tooltip sticky className="bg-slate-800 text-white border-cyan-500 border p-2">
                 <div className="font-bold text-xs">{asset.id}</div>
                 <div className="font-mono text-cyan-400">
                   PR: {prValue ? prValue.toFixed(6) : "OFFLINE"}
                 </div>
              </Tooltip>
            </Polygon>
          );
        })}
      </MapContainer>
    );
  };

export default SolarMap;