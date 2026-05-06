export function getLevelTitle(level) {
  if (level < 3) return "Getting Started";
  if (level < 6) return "Goal Getter";
  if (level < 10) return "Consistency Builder";
  return "Personal Development Pro";
}

/**
 * UI-only: calculates % progress *within the current level*
 *
 * Inputs come from backend:
 * - totalXp
 * - currentLevel
 * - nextLevelXp
 */

export function getLevelProgress({ totalXp, level, nextLevelXp }) {
  const prevLevelXp = totalXp - (nextLevelXp - totalXp);
  return ((totalXp - prevLevelXp) / (nextLevelXp - prevLevelXp)) * 100;
}