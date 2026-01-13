# Software Engineering Internship Case Study: Solar Asset Observability

## **1. Background**
At **SuperPower**, we are building the "Operating System for Energy." A critical layer of this stack is **Observability**. We manage thousands of physical energy assets (Solar Inverters, EV Chargers, Batteries) and need to ensure they are operating at peak efficiency. 

One of the most complex challenges in energy monitoring is correlating **physical spatial data** (where an asset is and what it looks like) with **time-series performance data** (how it's doing right now).

---

## **2. The Challenge: "The Performance Map"**
Your task is to build a web-based visualization system that allows an operator to monitor the health of a solar plant. Operators need to see the "big picture" of the plant and drill down into specific assets to identify underperformance.

### **The Objective**
Create a system that:
1.  Render the physical layout of the solar plant.
2.  Visualizes the performance (Performance Ratio - PR) of each asset across a specific timeline.
3.  Allows navigation through time to see how performance changes.

---

## **3. Data Provided**
You are provided with two primary data sources (found in the `Case Data` directory):

### **A. `map_ICR17.js` (The Geography)**
This file defines the physical geometry of the assets.
- **Structure**: A JavaScript constant `map_ICR17` containing an array of `areas`.
- **Fields**: Each area has an `id` and a list of `points` (x, y coordinates) that define a polygon.

### **B. `pr_ICR17.js` (The Performance)**
This file defines the performance of those assets over time.
- **Structure**: A JavaScript constant `pr_ICR17` containing a `pr_data` object.
- **Format**: `pr_data[date][asset_id] = value`.
- **Note**: Values are decimal representations of the Performance Ratio (e.g., `0.009` might represent a metric where `1.0` is peak performance, or it may need normalization).

---

## **4. Requirements & Deliverables**
We intentionally do not specify the technology or the exact UI. We want to see how *you* solve the problem.

### **Functional Requirements**
*   **Spatial Rendering**: The polygons from `map_ICR17` must be rendered to scale on a web interface.
*   **Temporal Control**: The user must be able to select a date (from the range available in the data) to view performance for that specific day.
*   **Dynamic Styling**: Assets should change color based on their PR value for the selected date. You must decide on an effective color scale.
*   **Asset Details**: Hovering over or clicking an asset should reveal its ID and its exact performance value for that date.

### **Non-Functional Requirements**
*   **Clarity**: The visualization must be intuitive for an operator who is not a software engineer.
*   **Performance**: The map should be responsive and update smoothly as the user changes the date.
*   **Aesthetics**: The design should feel futuristic, bold, and premium—consistent with the SuperPower brand.

---

## **5. Bonus & Advanced Challenges**
These challenges are for candidates aiming for bonus consideration and looking to demonstrate advanced software engineering and architectural thinking.

### **C1. Data Scalability & Ingestion**
In the real world, data is not static. New dates and values flow into the system every 24 hours. 
- **The Task**: Ensure your system can handle an external injection of new data. If we were to provide you with `pr_ICR17_2025.js` (additional dates for the year 2025), how does your system adapt? 
- **The Goal**: Demonstrate an architecture that isn't hard-coded to a specific date range but dynamically updates its controls (e.g., the slider range) based on the current dataset.

### **C2. AI-Driven Insights Agent**
Operators don't just want to see data; they want to know *why* something is happening.
- **The Task**: Implement a UI element for an "AI Insights Agent." Note: You do **not** need to build a massive back-end for depth analysis. 
- **The Goal**: We want to see how you would integrate an AI assistant/panel into the map. For example: "The system identifies that ID X has dropped 15% in performance over the last 3 days—show an insight panel explaining this." This tests your understanding of how to weave AI agents into a standard dashboard UI.

---

## **6. Evaluation Criteria**
We will be looking at:
1.  **Architecture**: How you organized the logic to handle data parsing and rendering.
2.  **Visualization Logic**: Your choice of color mapping, scaling, and coordinate transformations.
3.  **UX/UI Design**: How "premium" and usable the interface feels.
4.  **Problem Solving**: How you handle edge cases (e.g., missing data points, very small/large coordinates).

---

## **7. Submission**
Your final deliverable should be a single Git repository containing:
- **Backend code** (if applicable)
- **Frontend code**
- **README.md** explaining:
    - How to run the project
    - Your assumptions
    - How the system works
    - Your design choices

**Note**: All work must be committed to Git with a meaningful commit history. We want to see how you build and evolve the project.
