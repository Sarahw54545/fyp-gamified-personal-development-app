import { Progress } from "@/components/ui/progress";
import { getLevelTitle, getLevelProgress } from "@/lib/xp";

export function ProfileHero({ user, gamification }) {
  const { level, totalXp, nextLevelXp } = gamification;

  const title = getLevelTitle(level);
  const progress = getLevelProgress({
    totalXp,
    level,
    nextLevelXp
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
      <h2 className="text-3xl font-bold text-center">
        {user.email}
      </h2>

      <p className="text-muted-foreground mt-5 text-center">
        Level {level} - {title}
      </p>

      <div className="p-1 space-y-3">
        <div className="flex items-center justify-between p-2">
          <h3 className="font-semibold text-lg">Level {level}</h3>
          <span className="text-sm text-muted-foreground">
            {Math.floor(progress)}%
          </span>
        </div>
        <Progress
          value={progress}
          className="transition-all duration-700 ease-out"
        />

        <p className="text-sm text-muted-foreground text-center pt-2">
          {totalXp} / {nextLevelXp} XP
        </p>
      </div>
    </div>
  );
}