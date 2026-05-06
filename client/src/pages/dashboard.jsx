import { useEffect, useState } from "react";
import MainLayout from "../components/layout/mainLayout";
import { WelcomeHeader } from "../components/dashboard/welcomeHeader";
import { GoalPreview } from "../components/dashboard/goalPreview";
import { StreakCard } from "../components/dashboard/streakCard";
import { AchievementPreview } from "../components/dashboard/achievementPreview";
import { apiFetch } from "@/services/apiClient";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      const data = await apiFetch("/api/dashboard");
      setDashboard(data);
      setLoading(false);
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <p>Loading dashboard...</p>
      </MainLayout>
    );
  }

  const { user, todayGoals, dailyAchievements, streak } = dashboard;

  const handleCompleteGoal = async (id) => {
    const res = await apiFetch(`/api/goals/${id}/complete`, { method: "POST" });

    setDashboard(prev => ({
      ...prev,
      todayGoals: prev.todayGoals.map(g =>
        g.id === id ? res.goal : g
      ),
    }));
  };

  const handleDeleteGoal = async (id) => {
    await apiFetch(`/api/goals/${id}`, { method: "DELETE" });

    setDashboard(prev => ({
      ...prev,
      todayGoals: prev.todayGoals.filter(g => g.id !== id),
    }));
  };

  return (
    <MainLayout>
      <WelcomeHeader
        email={user.email}
        level={user.level}
        totalXp={user.totalXp}
        nextLevelXp={dashboard.user.nextLevelXp}
      />

      {/* 3-column grid */}
      <div className="grid grid-cols-3 gap-6 mt-6">

        {/* Goals – full width */}
        <div className="col-span-3">

          <GoalPreview
            goals={todayGoals.slice(0, 3)}
            onComplete={handleCompleteGoal}
            onDelete={handleDeleteGoal}
          />

        </div>

        {/* Achievements – 2 columns */}
        <div className="col-span-2">
          <AchievementPreview achievements={dailyAchievements.slice(0, 3)} />
        </div>

        {/* Streak – 1 column */}
        <div className="col-span-1">
          <StreakCard streak={streak.current} />
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;