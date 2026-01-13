/**
 * Transforms raw case study data into Leaflet-ready format.
 * Leaflet expects [Lat, Lng] which corresponds to [Y, X] in a Simple CRS.
 */

// 1. Calculate the Map Bounds (The "Camera View")
export const calculateBounds = (areas) => {
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    areas.forEach(area => {
        area.points.forEach(point => {
            if (point.x < minX) minX = point.x;
            if (point.x > maxX) maxX = point.x;
            if (point.y < minY) minY = point.y;
            if (point.y > maxY) maxY = point.y;
        });
    });

    // Add a little padding (buffer) so assets aren't touching the screen edge
    const padding = 5;
    const corner1 = [minY - padding, minX - padding];
    const corner2 = [maxY + padding, maxX + padding];

    return [corner1, corner2];
};

// 2. Transform the Polygons for Leaflet
export const processMapData = (rawData) => {
    return rawData.areas.map(area => {
        // Convert [{x,y}, {x,y}] -> [[y,x], [y,x]]
        const leafletPoints = area.points.map(p => [p.y, p.x]);
        
        return {
            id: area.id,
            points: leafletPoints
        };
    });
};