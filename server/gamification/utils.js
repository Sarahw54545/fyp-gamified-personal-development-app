
// Check if ISO Date is within the same calendar day (YYYY-MM-DD)
function isSameDay(dateA, dateB) {
  return String(dateA) === String(dateB)
}

// If a particular achievement doesnt have a state, assign an empty state object
function ensureAchievementState(state, key) {
  if (!state.achievements[key]) {
    state.achievements[key] = {};
  }
}

export default {
  isSameDay,
  ensureAchievementState
};