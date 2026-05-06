import { startOfToday } from "./dates";

export function getActiveGoals(goals) {
  return goals.filter(g => g.is_active && !g.completed);
}

export function getArchivedGoals(goals) {
  return goals.filter(g => !g.is_active);
}

export function getOverdueGoals(goals) {
  const today = startOfToday();
  return goals.filter(
    g => g.due_date && new Date(g.due_date) < today && !g.completed
  );
}

export function getGoalsDueThisWeek(goals) {
  const today = startOfToday();
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (7 - today.getDay()));

  return goals.filter(g => {
    if (!g.due_date) return false;
    const due = new Date(g.due_date);
    return due >= today && due <= endOfWeek;
  });
}

export function getTodaysGoals(goals) {
  const todayStr = startOfToday().toDateString();
  return goals.filter(
    g =>
      g.is_active &&
      !g.completed &&
      (!g.due_date ||
        new Date(g.due_date).toDateString() === todayStr)
  );
}