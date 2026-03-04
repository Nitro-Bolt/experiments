import { detectTheme } from "../lib/themes/themePersistence";

const SET_THEME = "experiments/theme/SET_THEME";
const TOGGLE_THEME = "experiments/theme/TOGGLE_THEME";

const initialState = {
  theme: detectTheme(),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return { ...state, theme: action.theme };
    case TOGGLE_THEME:
      return { ...state, theme: state.theme === "dark" ? "light" : "dark" };
    default:
      return state;
  }
};

const setTheme = (theme) => ({
  type: SET_THEME,
  theme,
});

const toggleTheme = () => ({
  type: TOGGLE_THEME,
});

export {
  initialState as themeInitialState,
  reducer as default,
  setTheme,
  toggleTheme,
};
