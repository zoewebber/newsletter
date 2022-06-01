import { Routes, Route } from "react-router-dom";
import Subscribe from "./pages/subscribe";
import Unsubscribe from "./pages/unsubscribe";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Subscribe />} />
      <Route path="unsubscribe" element={<Unsubscribe />} />
    </Routes>
  );
}

export default App;
