import { Progress } from "@/components/ui/progress";
import { getLevelTitle, getLevelProgress } from "@/lib/xp";

export function WelcomeHeader({ email, level, totalXp, nextLevelXp }) {
  const title = getLevelTitle(level);
  const progress = getLevelProgress({ totalXp, level, nextLevelXp });

  return (
    <div className="mb-6 mt-2">
      <h2 className="text-3xl font-bold">
        Welcome Back, {email} ⭐
      </h2>

      <p className="text-muted-foreground mt-1">
        Level {level} - {title}
      </p>

      <div className="mt-3 max-w-sm">
        <Progress value={progress} className="transition-all duration-700 ease-out" />
      </div>
    </div>
  );
}