import { map_ICR17 } from './data/map_ICR17';
import { pr_ICR17 } from './data/pr_ICR17';

function App() {
  console.log("Map Data Loaded:", map_ICR17);
  console.log("PR Data Loaded:", pr_ICR17);

  return (
    <div className="h-screen w-screen bg-slate-900 text-white flex items-center justify-center">
      <h1 className="text-4xl font-bold text-cyan-400">Solar Ops Setup Complete</h1>
    </div>
  );
}

export default App;