// src/utils/analytics.js

export const generateInsights = (currentDate, currentData, previousData, twoDaysAgoData) => {
    const insights = [];
    
    // Safety check
    if (!currentData) return { healthScore: 0, insights: [] };

    const assets = Object.keys(currentData);
    const validValues = Object.values(currentData).filter(v => !isNaN(v) && v !== null);
    
    // 1. Calculate Plant Health Score (0 - 100%)
    const avgPR = validValues.length > 0 
        ? (validValues.reduce((a, b) => a + b, 0) / validValues.length) 
        : 0;
    const healthScore = Math.min((avgPR / 0.01) * 100, 100);

    // 2. "The Detective": Find the worst performing specific asset
    // We look for the biggest drop between Yesterday and Today
    let worstAsset = null;
    let maxDrop = 0;

    if (previousData) {
        assets.forEach(id => {
            const today = currentData[id];
            const yesterday = previousData[id];

            if (typeof today === 'number' && typeof yesterday === 'number') {
                const drop = yesterday - today; // Positive means it dropped
                if (drop > maxDrop) {
                    maxDrop = drop;
                    worstAsset = id;
                }
            }
        });
    }

    // 3. Generate Insight: Specific Asset Drop
    // 0.0015 drop roughly equals 15% relative to a 0.01 max
    if (worstAsset && maxDrop > 0.0005) { // Threshold for "notable" drop
        const percentDrop = ((maxDrop / 0.01) * 100).toFixed(1);
        insights.push({
            type: 'negative',
            text: `Asset ${worstAsset} has dropped ${percentDrop}% in efficiency since yesterday.`
        });
    }

    // 4. Generate Insight: 3-Day Trend (The prompt requirement)
    if (twoDaysAgoData && healthScore < 98) {
        // Simple heuristic: Is the whole plant trending down for 3 days?
        const prevAvg = Object.values(previousData || {}).reduce((a,b)=>a+b,0) / assets.length;
        const twoDaysAvg = Object.values(twoDaysAgoData || {}).reduce((a,b)=>a+b,0) / assets.length;

        if (avgPR < prevAvg && prevAvg < twoDaysAvg) {
             insights.push({
                type: 'warning',
                text: `Sustained Degradation: Plant performance has declined for 3 consecutive days.`
            });
        }
    }

    // 5. Critical Failures (NaN)
    const offlineCount = assets.filter(id => isNaN(currentData[id])).length;
    if (offlineCount > 0) {
        insights.push({
            type: 'critical',
            text: `CRITICAL: ${offlineCount} inverters are offline (No Data).`
        });
    }

    // Default "All Good" message
    if (insights.length === 0) {
        insights.push({ type: 'neutral', text: "System operating optimally." });
    }

    return { healthScore, insights };
};