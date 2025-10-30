import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./style.css";
import Home from "./pages/Home";
import TalkViewer from "./pages/TalkViewer";

function TerminalWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  // Determine terminal title based on route
  const getTerminalTitle = () => {
    if (location.pathname.startsWith("/talks/")) {
      const slug = location.pathname.split("/talks/")[1];
      return `0xleal@talks:${slug}`;
    }
    return "0xleal@terminal";
  };

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <div className="terminal-button red"></div>
          <div className="terminal-button yellow"></div>
          <div className="terminal-button green"></div>
        </div>
        <div className="terminal-title">{getTerminalTitle()}</div>
      </div>

      <div className="terminal-content">{children}</div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <TerminalWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/talks/:slug" element={<TalkViewer />} />
        </Routes>
      </TerminalWrapper>
    </BrowserRouter>
  );
}

export default App;
