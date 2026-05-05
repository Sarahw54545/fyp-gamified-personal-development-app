// Quadratic XP logic (must match backend baseXp = 50)

const BASE_XP = 50;

export function getLevelFromXp(totalXp) {
  return Math.floor(Math.sqrt(totalXp / BASE_XP)) + 1;
}

export function getXpForLevel(level) {
  return BASE_XP * Math.pow(level, 2);
}

export function getLevelProgress(totalXp) {
  const level = getLevelFromXp(totalXp);
  const prevXp = BASE_XP * Math.pow(level - 1, 2);
  const nextXp = BASE_XP * Math.pow(level, 2);

  return {
    level,
    progress: ((totalXp - prevXp) / (nextXp - prevXp)) * 100,
    nextLevelXp: nextXp,
  };
}

export function getLevelTitle(level) {
  if (level < 3) return "Getting Started";
  if (level < 6) return "Goal Getter";
  if (level < 10) return "Consistency Builder";
  return "Personal Development Pro";
}