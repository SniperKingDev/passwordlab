
import "./StrengthMeter.css";

function StrengthMeter({ score, strength }) {
  return (
    <div className="strength-meter">
      <div className="strength-header">
        <h3>Password strength</h3>
        <span className={`strength-label ${strength.toLowerCase()}`}>
          {strength}
        </span>
      </div>

      <div className="strength-bar">
        <div
          className={`strength-progress ${strength.toLowerCase()}`}
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="strength-footer">
        <span>SECURITY SCORE</span>
        <span>{score}/100</span>
      </div>
    </div>
  );
}

export default StrengthMeter;
