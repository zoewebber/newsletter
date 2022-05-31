import { Routes, Route } from "react-router-dom";
import Subscribe from "./pages/subscribe";
import Unsubscribe from "./pages/unsubscribe";

function App() {
  return (
    <div className="flex justify-center align-middle h-screen bg-emerald-50">
      <Routes>
        <Route path="/" element={<Subscribe />} />
        <Route path="unsubscribe" element={<Unsubscribe />} />
      </Routes>
    </div>
  );
}

export default App;
