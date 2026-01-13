import React, { useEffect } from 'react';
import { MapContainer, Polygon, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
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
const SolarMap = ({ mapData, bounds }) => {
  if (!mapData || !bounds) return null;

  return (
    <MapContainer
      crs={L.CRS.Simple} // <--- CRITICAL: Disables Earth geography (Lat/Lon)
      bounds={bounds}    // Tells Leaflet where our "world" is
      minZoom={-2}       // Allow zooming out further than normal maps
      zoomSnap={0.5}     // smoother zooming
      scrollWheelZoom={true}
      className="h-full w-full bg-slate-900" // Tailwind classes for full height/width
      style={{ background: "#0f172a" }} // Force dark background color
    >
      <MapController bounds={bounds} />

      {mapData.map((asset) => (
        <Polygon
          key={asset.id}
          positions={asset.points}
          pathOptions={{
            color: '#22d3ee',      // Border color (Cyan-400)
            weight: 1,             // Border thickness
            fillColor: '#0ea5e9',  // Fill color (Sky-500)
            fillOpacity: 0.4,      // Translucency
          }}
          eventHandlers={{
            mouseover: (e) => {
              e.target.setStyle({ fillOpacity: 0.9, weight: 2 });
            },
            mouseout: (e) => {
              e.target.setStyle({ fillOpacity: 0.4, weight: 1 });
            },
          }}
        >
          <Tooltip sticky className="bg-slate-800 text-white border-none text-xs font-mono">
             ID: {asset.id}
          </Tooltip>
        </Polygon>
      ))}
    </MapContainer>
  );
};

export default SolarMap;