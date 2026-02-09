import MainLayout from "../components/layout/mainLayout";
import { WelcomeHeader } from "../components/dashboard/welcomeHeader";
import { XPWidget } from "../components/dashboard/xpWidget";
import { GoalPreview } from "../components/dashboard/goalPreview";
import { StreakCard } from "../components/dashboard/streakCard";
import { AchievementPreview } from "../components/dashboard/achievementPreview";

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