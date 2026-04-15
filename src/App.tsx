import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage/StartPage";
import GamePage from "./pages/GamePage/GamePage";
import SettingPage from "./pages/SettingPage/SettingPage";
import ResultPage from "./pages/ResultPage/ResultPage";
import CookieBanner from "./components/CookieBanner/CookieBanner";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/results" element={<ResultPage />} />
        </Routes>
      </Router>
      <CookieBanner />
    </>
  );
}

export default App;
