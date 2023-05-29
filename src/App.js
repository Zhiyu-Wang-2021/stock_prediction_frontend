import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppProvider from "./context/appContext";
import ChatbotTest from "./pages/ChatbotTest";

function App() {
  return (
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<ChatbotTest/>}/>
          </Routes>
        </BrowserRouter>
      </AppProvider>
  );
}

export default App;
