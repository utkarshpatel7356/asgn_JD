// src/utils/styleUtils.js

// Define our color thresholds (based on data inspection)
const MAX_PR = 0.01; // We assume 0.01 is roughly 100% efficient for this dataset

export const getAssetColor = (prValue) => {
    // 1. Handle Missing Data (Offline/Maintenance)
    if (prValue === undefined || prValue === null || isNaN(prValue)) {
        return '#334155'; // Slate-700 (Dark Grey for Offline)
    }

    // 2. Normalize the value (0 to 1)
    // If value is > MAX_PR, cap it at 1.
    const normalized = Math.min(prValue / MAX_PR, 1.0);

    // 3. Return Color based on Performance Tier
    if (normalized < 0.96) return '#ef4444'; // Red-500 (Critical/Underperforming)
    if (normalized < 0.98) return '#facc15'; // Yellow-400 (Warning)
    return '#22d3ee'; // Cyan-400 (Optimal)
};

export const getDates = (prDataObj) => {
    // Returns sorted array of date strings: ["2024-08-01", "2024-08-02", ...]
    return Object.keys(prDataObj).sort();
};