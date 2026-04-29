
// Check if ISO Date is within the same calendar day (YYYY-MM-DD)

export function isSameDay(dateA, dateB) {
  if (!dateA || !dateB) return false;

  const a = dateA instanceof Date
    ? dateA.toISOString().slice(0, 10)
    : String(dateA).slice(0, 10);

  const b = dateB instanceof Date
    ? dateB.toISOString().slice(0, 10)
    : String(dateB).slice(0, 10);

  return a === b;
}


// If a particular achievement doesnt have a state, assign an empty state object
export function ensureAchievementState(state, key) {
  if (!state.achievements[key]) {
    state.achievements[key] = {
      completedTiers: [],
      lastCompletedDate: null
    };
  }
}
