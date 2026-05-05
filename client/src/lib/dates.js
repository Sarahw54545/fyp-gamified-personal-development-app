export function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function daysBetween(a, b) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  return Math.floor((b - a) / MS_PER_DAY);
}

export function getRelativeDueText(dueDate) {
  const today = startOfToday();
  const diff = daysBetween(today, new Date(dueDate));

  if (diff < 0) return "⚠️ Overdue";
  if (diff === 0) return "📅 Due today";
  if (diff < 30) return `📅 Due in ${diff} days`;
  if (diff < 365) return `📅 Due in ${Math.round(diff / 30)} months`;
  return `📅 Due in ${Math.round(diff / 365)} years`;
}