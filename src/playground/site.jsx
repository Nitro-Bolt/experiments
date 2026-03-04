import { render } from "preact";
import { useEffect, useReducer } from "preact/hooks";
import SiteHeader from "../components/site-header/site-header";
import ExperimentCard from "../components/experiment-card/experiment-card";
import experiments from "./experiments.json";
import themeReducer, {
  setTheme,
  themeInitialState,
  toggleTheme,
} from "../reducers/theme";
import {
  hasPersistedTheme,
  onSystemPreferenceChange,
  persistTheme,
} from "../lib/themes/themePersistence";
import { applyTheme } from "../lib/themes/themeHelpers";
import "../css/main.css";
import "./interface.css";

const Site = () => {
  const [themeState, dispatchTheme] = useReducer(
    themeReducer,
    themeInitialState
  );
  const { theme } = themeState;

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const removeListener = onSystemPreferenceChange((systemTheme) => {
      if (hasPersistedTheme()) return;
      dispatchTheme(setTheme(systemTheme));
    });

    return removeListener;
  }, []);

  const toggleThemeValue = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    dispatchTheme(toggleTheme());
    persistTheme(nextTheme);
  };

  return (
    <main className="page">
      <SiteHeader />
      <div className="panel-grid">
        {experiments.length === 0 ? (
          <div className="empty-state">
            No experiments are available at the moment.
          </div>
        ) : (
          experiments.map((experiment) => (
            <ExperimentCard
              key={experiment.id}
              path={experiment.id}
              name={experiment.name}
              description={experiment.description}
              status={experiment.status}
            />
          ))
        )}
      </div>
      <button className="theme-toggle" onClick={toggleThemeValue} type="button">
        {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      </button>
    </main>
  );
};

render(<Site />, document.getElementById("root"));
