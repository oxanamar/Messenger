import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Messenger from "../pages/Messenger";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Messenger />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
