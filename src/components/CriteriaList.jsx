
import "./CriteriaList.css";

function CriteriaList({ criteria }) {
  return (
    <div className="criteria-list">
      <h3>Security requirements</h3>

      <div className="criteria-grid">
        {criteria.map((item) => (
          <div className="criteria-item" key={item.id}>
            <span className={item.passed ? "passed" : "failed"}>
              {item.passed ? "✓" : "✕"}
            </span>

            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CriteriaList;
