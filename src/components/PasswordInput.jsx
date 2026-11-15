
import { useState } from "react";
import "./PasswordInput.css";

function PasswordInput({ value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-input">
      <label htmlFor="password">
        ENTER YOUR PASSWORD
      </label>

      <div className="password-field">
        {/* on créer le champ pour saisir le mot de passe et un bouton pour afficher ou masquer le mot de passe */}
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
        />
        {/* créer un bouton pour afficher ou masquer le mot de passe */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "HIDE" : "SHOW"}
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;
