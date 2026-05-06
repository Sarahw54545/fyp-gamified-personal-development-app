import { useEffect, useState } from "react";
import MainLayout from "../components/layout/mainLayout";
import { WelcomeHeader } from "../components/dashboard/welcomeHeader";
import { GoalPreview } from "../components/dashboard/goalPreview";
import { StreakCard } from "../components/dashboard/streakCard";
import { AchievementPreview } from "../components/dashboard/achievementPreview";
import { apiFetch } from "@/services/apiClient";
import { toast } from "sonner";

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
    try {
      const res = await apiFetch(`/api/goals/${id}/complete`, {
        method: "POST",
      });

      setDashboard(prev => ({
        ...prev,
        todayGoals: prev.todayGoals.map(g =>
          g.id === id ? res.goal : g
        ),
      }));

      toast.custom(() => (
        <div className="p-4">
          <strong>Goal Completed ✅</strong>
        </div>
      ));

      res.gamification.unlockedAchievements.forEach((achievement) => {
        toast.custom(() => (
          <div className="p-4">
            <strong>
              {achievement.type === "daily"
                ? "Daily Achievement 🌟"
                : "Achievement Unlocked 🏆"}
            </strong>
            <p>
              {achievement.label
                ? `${achievement.label} (+${achievement.xp} XP)`
                : `+${achievement.xp} XP`}
            </p>
          </div>
        ));
      });

    } catch (err) {
      console.error("Failed to complete goal:", err);
      toast.custom(() => (
        <div className="p-4">
          <strong>Error</strong>
          <p>Failed to complete goal.</p>
        </div>
      ));
    }

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

      <div className="mt-6 space-y-4">
        <GoalPreview
          goals={todayGoals.slice(0, 3)}
          onComplete={handleCompleteGoal}
          onDelete={handleDeleteGoal}
        />
      </div>


      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        <div className="lg:col-span-2 space-y-4">
          <AchievementPreview achievements={dailyAchievements.slice(0, 3)} />
        </div>

        <div className="lg:col-span-1 space-y-4">
          <StreakCard streak={streak.current} />
        </div>
      </div>
    </MainLayout >
  );
}

export default Dashboard;