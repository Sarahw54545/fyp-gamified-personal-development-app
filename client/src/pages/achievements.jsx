import { useEffect, useState } from "react";
import MainLayout from "../components/layout/mainLayout";
import { apiFetch } from "@/services/apiClient";
import { AchievementGrid } from "../components/achievements/achievementGrid";

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadAchievements() {
      try {
        const data = await apiFetch("/api/achievements");
        setAchievements(data.achievements);
      } catch (err) {
        console.error(err);
        setError("Failed to load achievements");
      } finally {
        setLoading(false);
      }
    }

    loadAchievements();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <p>Loading achievements...</p>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <p className="text-red-500">{error}</p>
      </MainLayout>
    );
  }

  const progressiveAchievements = achievements.filter(
    (a) => a.type === "progressive"
  );

  const dailyAchievements = achievements.filter(
    (a) => a.type === "daily"
  );

  return (
    <MainLayout>
      <div className="space-y-10">

        {/* Page header */}
        <div>
          <h1 className="text-3xl font-bold">Achievements 🏆</h1>
          <p className="text-muted-foreground mt-1">
            Track Your Long‑Term Progress and Milestones
          </p>
        </div>

        {/* Progressive achievements */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            Progressive Achievements
          </h2>

          <AchievementGrid achievements={progressiveAchievements} />
        </section>

        {/* Daily achievements */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            Daily Achievements
          </h2>

          <AchievementGrid achievements={dailyAchievements} />
        </section>

      </div>
    </MainLayout>
  );
}

export default Achievements;