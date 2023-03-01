import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
