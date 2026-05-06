export default [
  {
    key: "GOAL_COMPLETION",
    type: "progressive",
    category: "progress",
    title: "Goal Getter",
    description: "Complete goals to progress",
    criteria: {
      type: "counter",
      event: "GOAL_COMPLETED"
    },
    tiers: [
      { threshold: 1, xp: 50, label: "First Step" },
      { threshold: 10, xp: 200, label: "Getting Serious" },
      { threshold: 25, xp: 600, label: "Goal Machine" }
    ]
  },
  {
    key: "DAILY_ACTIVITY",
    type: "daily",
    category: "consistency",
    title: "Daily Momentum",
    description: "Complete a Goal Today",
    criteria: {
      type: "event",
      event: "GOAL_COMPLETED"
    },
    xp: 10
  },
  {
    key: "DAILY_LOGIN",
    type: "daily",
    category: "consistency",
    title: "Daily Check-In",
    description: "Log In Today",
    criteria: {
      type: "event",
      event: "LOGIN_SUCCESS"
    },
    xp: 5
  },
  {
    key: "DAILY_PLANNING",
    type: "daily",
    category: "consistency",
    title: "Daily Planning",
    description: "Create a Goal today",
    criteria: {
      type: "event",
      event: "GOAL_CREATED"
    },
    xp: 10
  }
];