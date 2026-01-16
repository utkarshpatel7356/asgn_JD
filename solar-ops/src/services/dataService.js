import { pr_ICR17 } from '../data/pr_ICR17';
import { pr_ICR17_2025 } from '../data/pr_ICR17_2025';

/**
 * INGESTION LAYER
 * Merges multiple data sources into a single timeline.
 * In a real app, this might fetch from an API endpoint.
 */
export const getUnifiedPerformanceData = () => {
    // 1. Merge the raw objects
    // We combine the 2024 data and the new 2025 data
    const mergedData = {
        ...pr_ICR17.pr_data,
        ...pr_ICR17_2025.pr_data
    };

    // 2. Generate a sorted index of dates
    // This ensures the slider moves chronologically, even if data sources are mixed up
    const sortedDates = Object.keys(mergedData).sort((a, b) => {
        return new Date(a) - new Date(b);
    });

    return {
        timeline: sortedDates, // Array of strings ["2024-08-01", ..., "2025-01-03"]
        values: mergedData     // The massive lookup object
    };
};