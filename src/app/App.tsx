import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Messenger from "../pages/Messenger/Messenger";

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
