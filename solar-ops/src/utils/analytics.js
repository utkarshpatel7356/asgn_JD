// src/utils/analytics.js

export const generateInsights = (currentDate, currentData, previousData) => {
    const insights = [];
    
    // 1. Calculate Plant Health (Average PR)
    const values = Object.values(currentData).filter(v => !isNaN(v) && v !== null);
    const avgPR = values.reduce((a, b) => a + b, 0) / values.length;
    
    // 2. Compare with Yesterday (Trend Analysis)
    let trend = "stable";
    if (previousData) {
        const prevValues = Object.values(previousData).filter(v => !isNaN(v));
        const prevAvg = prevValues.reduce((a, b) => a + b, 0) / prevValues.length;
        const diff = avgPR - prevAvg;
        
        if (diff > 0.0001) trend = "improving";
        if (diff < -0.0001) trend = "degrading";
        
        // Insight 1: Efficiency Shift
        if (Math.abs(diff) > 0.0001) {
            insights.push({
                type: diff > 0 ? 'positive' : 'negative',
                text: `Plant efficiency is ${trend} (${(diff * 10000).toFixed(1)} bps) compared to yesterday.`
            });
        }
    }

    // 3. Detect Critical Failures (Offline Assets)
    const offlineCount = Object.values(currentData).filter(v => isNaN(v) || v === null).length;
    if (offlineCount > 0) {
        insights.push({
            type: 'critical',
            text: `Critical Alert: ${offlineCount} inverters are currently offline (NaN signal).`
        });
    }

    // 4. Detect Underperformance
    // (Assuming normalized threshold < 0.96 from our styleUtils)
    const criticalCount = values.filter(v => (v / 0.01) < 0.96).length;
    if (criticalCount > 5) {
         insights.push({
            type: 'warning',
            text: `High degradation detected: ${criticalCount} assets are operating below 96% efficiency.`
        });
    }

    // Default message if all is good
    if (insights.length === 0) {
        insights.push({ type: 'neutral', text: "System operating within normal parameters." });
    }

    return {
        healthScore: (avgPR / 0.01) * 100, // Normalized to 0-100%
        insights
    };
};