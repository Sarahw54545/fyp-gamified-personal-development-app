import MainLayout from "../components/layout/mainLayout";
import { WelcomeHeader } from "../components/dashboard/WelcomeHeader";
import { XPWidget } from "../components/dashboard/XPWidget";
import { GoalPreview } from "../components/dashboard/GoalPreview";
import { StreakCard } from "../components/dashboard/StreakCard";
import { AchievementPreview } from "../components/dashboard/AchievementPreview";

function Dashboard() {
  return (
    <MainLayout>

      <WelcomeHeader />

      <XPWidget />

      <div className="grid grid-cols-2 gap-6">
        <GoalPreview />
        <StreakCard />
      </div>

      <AchievementPreview />

    </MainLayout>
  );
}

export default Dashboard