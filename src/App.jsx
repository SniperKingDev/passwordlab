
import { useState } from "react";

import PasswordInput from "./components/PasswordInput";
import StrengthMeter from "./components/StrengthMeter";
import CriteriaList from "./components/CriteriaList";

import analyzePassword from "./utils/analyzePassword";

import "./App.css";

function App() {
  const [password, setPassword] = useState("");

  const analysis = analyzePassword(password);

  return (
    <main className="app">
      <div className="container">

        <header className="header">
          <div className="logo">
            <span className="logo-icon">⌘</span>
            <span>PasswordLab</span>
          </div>

          <span className="header-badge">
            SECURITY TOOL
          </span>
        </header>

        <section className="hero">
          <h1>How secure is your password?</h1>
          <p>Test your password strength instantly.</p>
        </section>

        <section className="analyzer">

          <PasswordInput
            value={password}
            onChange={setPassword}
          />

          <div className="divider"></div>

          <StrengthMeter
            score={analysis.score}
            strength={analysis.strength}
          />

          <div className="divider"></div>

          <CriteriaList
            criteria={analysis.criteria}
          />

        </section>

        <footer className="footer">
          <span> PASSWORDLAB v1.0</span>
          <span>LOCAL ANALYSIS ONLY</span>
        </footer>

      </div>
    </main>
  );
}

export default App;
