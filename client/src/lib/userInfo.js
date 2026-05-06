import { getLevelTitle } from "./xp";

export function getUserDisplayInfo({ email, level }) {
  return {
    email,
    level,
    title: getLevelTitle(level)
  };
}