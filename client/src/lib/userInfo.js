import { getLevelFromXp, getLevelTitle } from "./xp";

export function getUserLevelInfo(totalXp) {
  const level = getLevelFromXp(totalXp);
  return {
    level,
    title: getLevelTitle(level)
  };
}