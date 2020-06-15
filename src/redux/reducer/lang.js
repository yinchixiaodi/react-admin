import { CHANGE_LANGUAGE } from "../constants/lang";

const initLanguage = window.navigator.language === "en" ? "en" : "zh";

export default function language(prevState = initLanguage, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return action.data;
    default:
      return prevState;
  }
}
