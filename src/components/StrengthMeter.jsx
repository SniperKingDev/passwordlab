
import "./StrengthMeter.css";

// Composant qui affiche le niveau et le score
const StrengthMeter = ({ score, strength }) => {

  // Transforme "Very Strong" en "very-strong"
  const strengthClass = strength.toLowerCase().replace(" ", "-");

  return (
    <div className="strength-meter">

      <div className="strength-header">
        <h3>Password strength</h3>

        {/* Affiche le niveau avec sa classe CSS */}
        <span className={`strength-label ${strengthClass}`}>
          {strength}
        </span>
      </div>

      {/* Barre de progression */}
      <div className="strength-bar">
        <div
          className={`strength-progress ${strengthClass}`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Score de sécurité */}
      <div className="strength-footer">
        <span>SECURITY SCORE</span>
        <span>{score}/100</span>
      </div>

    </div>
  );
};

export default StrengthMeter;
