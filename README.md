
# SuperPower Solar Asset Observability Dashboard

A high-performance, dark-mode visualization system for monitoring solar asset health. This application correlates spatial layout data with temporal performance metrics to provide operators with actionable insights.

## 🚀 Quick Start

### Prerequisites

* Node.js (v16 or higher)
* npm

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd solar-ops

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

```

Open `http://localhost:5173` to view the dashboard.

---

## 🏗 Architecture & Design Decisions

### 1. Spatial Rendering Strategy (The "Map")

**Challenge:** The provided geometry (`map_ICR17.js`) uses a local Cartesian coordinate system (x, y meters), not standard Latitude/Longitude.
**Solution:**

* Instead of forcing these points onto a standard Mercator projection (which would distort them), I utilized **Leaflet's `L.CRS.Simple**`.
* This maps one coordinate unit to one screen pixel, treating the map as a technical schematic rather than a geographical map.
* **Coordinate Transformation:** A custom utility (`geoUtils.js`) flips the raw `{x, y}` coordinates to `[y, x]` as required by Leaflet's engine and calculates the bounding box dynamically to auto-center the camera.

### 2. Temporal Data Handling

**Challenge:** Data scales over time; hardcoding dates is brittle.
**Solution:**

* The system parses `pr_ICR17.js` at runtime to extract all available dates.
* The "Time Slider" component dynamically sets its range (`min=0`, `max=dates.length-1`).
* **Scalability:** If a new file `pr_2025.js` is merged into the data object, the UI automatically adapts without code changes (Bonus C1).

### 3. "AI" Insights Agent (Client-Side Heuristics)

**Challenge:** Operators need context, not just raw numbers.
**Solution:**

* Implemented a lightweight heuristic engine (`analytics.js`) that runs in real-time as the user scrubs through the timeline.
* **Logic:** It calculates the daily "Health Score" (weighted average of active inverters) and detects trends (e.g., "Efficiency dropped 15bps compared to yesterday").
* **UX:** An "Insights Panel" overlay alerts the user to anomalies immediately (Bonus C2).

---

## 🛠 Key Assumptions

1. **Coordinate System:** Assumed `x` and `y` are linear units (meters/feet) on a flat plane.
2. **Missing Data (`NaN`):** Assumed to represent "Offline" or "Communication Failure." These assets are rendered in **Dark Slate Gray** to distinguish them from low-performing assets (Red).
3. **Performance Ratio (PR):** Based on data inspection, values hover around `0.009` - `0.010`. I assumed `0.01` is the theoretical max (100%) and normalized the color scale 0-1 based on this ceiling.

---

## 🎨 Technology Stack

* **Frontend Framework:** React 18 (Vite)
* **Mapping Engine:** Leaflet + React-Leaflet
* **Styling:** Tailwind CSS (Focus on "Dark Mode" / Cyberpunk aesthetic for the SuperPower brand)
* **State Management:** React `useState` / `useEffect`

---

## 🔮 Future Improvements (Production Readiness)

If this were moving to production, I would add:

1. **Vector Tiles:** For plants with >100,000 assets, I would convert the GeoJSON to Vector Tiles (MVT) to maintain 60fps performance.
2. **Server-Side Aggregation:** The "AI Insights" currently run in the browser. Heavy historical analysis should move to a Python/Go backend.
3. **Asset Search:** A search bar to jump the camera to a specific inverter ID.

---
