import "./experiment-card.css";

const ExperimentCard = ({ path, name, description, status }) => {
  const href = path ? `/${path}/` : "#";
  const statusClass = status.toLowerCase().replace(/\s+/g, "-");

  return (
    <a className="experiment-panel-link" href={href}>
      <div className="experiment-panel">
        <h2>{name}</h2>
        <p>{description}</p>
        <span className={`status status-${statusClass}`}>{status}</span>
      </div>
    </a>
  );
};

export default ExperimentCard;
