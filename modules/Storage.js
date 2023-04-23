import { serialize } from "./serialization";

export default function saveStorage(appProjectList) {
  localStorage.setItem("appState", serialize(appProjectList));
}
