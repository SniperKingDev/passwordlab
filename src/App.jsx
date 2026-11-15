
import { useState } from "react";

import PasswordInput from "./components/PasswordInput.jsx";
import StrengthMeter from "./components/StrengthMeter.jsx";
import CriteriaList from "./components/CriteriaList.jsx";

import analyzePassword from "./utils/analyzePassword.js";

import "./App.css";
//importer les composants nécessaires et le fichier CSS pour le style de l'application
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
          <h1>How secure is your password ?</h1>
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
          <span>Bangali Mara © 2026 All Rights Reserved</span>
        </footer>

      </div>
    </main>
  );
}

export default App;
//projet terminé, application fonctionnelle avec analyse de mot de passe et affichage du niveau de sécurité. 15/11/2026
//Bangali © 2026 Mara All rights Reserved😀😂